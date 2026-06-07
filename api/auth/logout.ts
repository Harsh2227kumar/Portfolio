import { clearAuthCookieHeader } from '../_lib/auth.js';
import { json, methodNotAllowed } from '../_lib/http.js';

export async function POST() {
  return json({ ok: true }, { headers: { 'set-cookie': clearAuthCookieHeader() } });
}

export const GET = methodNotAllowed;
