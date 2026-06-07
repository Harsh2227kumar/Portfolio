import { isAuthorized } from '../_lib/auth.js';
import { json, methodNotAllowed } from '../_lib/http.js';

export async function GET(request: Request) {
  return json({ authenticated: isAuthorized(request) });
}

export const POST = methodNotAllowed;
