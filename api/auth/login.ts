import { authCookieHeader, createSessionCookie, verifyPassword } from '../_lib/auth.js';
import { badRequest, json, methodNotAllowed, parseJson } from '../_lib/http.js';

interface LoginBody {
  password?: string;
}

export async function POST(request: Request) {
  const body = await parseJson<LoginBody>(request);
  const password = body?.password || '';
  const passwordHash = process.env.DASH_ADMIN_PASSWORD_HASH || '';

  if (!passwordHash || !process.env.DASH_COOKIE_SECRET) {
    return json({ error: 'Dashboard auth is not configured.' }, { status: 500 });
  }

  if (!password) return badRequest('Password is required.');
  if (!verifyPassword(password, passwordHash)) {
    return json({ error: 'Invalid password.' }, { status: 401 });
  }

  return json(
    { ok: true },
    { headers: { 'set-cookie': authCookieHeader(createSessionCookie()) } }
  );
}

export const GET = methodNotAllowed;
