import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { getCookie, setCookieHeader, unauthorized } from './http.js';

const COOKIE_NAME = 'hk_dash_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

const getSecret = () => process.env.DASH_COOKIE_SECRET || '';

const sign = (value: string) =>
  createHmac('sha256', getSecret()).update(value).digest('base64url');

export const createSessionCookie = () => {
  const issuedAt = Date.now().toString();
  const payload = `admin.${issuedAt}`;
  return `${payload}.${sign(payload)}`;
};

export const authCookieHeader = (value: string) =>
  setCookieHeader(COOKIE_NAME, value, { maxAge: SESSION_TTL_SECONDS });

export const clearAuthCookieHeader = () =>
  setCookieHeader(COOKIE_NAME, '', { maxAge: 0, expires: new Date(0) });

export const isAuthorized = (request: Request) => {
  const secret = getSecret();
  if (!secret) return false;

  const raw = getCookie(request, COOKIE_NAME);
  if (!raw) return false;

  const parts = raw.split('.');
  if (parts.length !== 3) return false;

  const [role, issuedAt, signature] = parts;
  if (role !== 'admin') return false;

  const issued = Number(issuedAt);
  if (!Number.isFinite(issued)) return false;
  if (Date.now() - issued > SESSION_TTL_SECONDS * 1000) return false;

  const payload = `${role}.${issuedAt}`;
  const expected = sign(payload);

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
};

export const requireAuth = (request: Request) => {
  if (!isAuthorized(request)) return unauthorized();
  return null;
};

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('base64url');
  const hash = scryptSync(password, salt, 64).toString('base64url');
  return `scrypt$${salt}$${hash}`;
};

export const verifyPassword = (password: string, stored: string) => {
  const [scheme, salt, expected] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !expected) return false;

  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, 'base64url');

  try {
    return timingSafeEqual(actual, expectedBuffer);
  } catch {
    return false;
  }
};
