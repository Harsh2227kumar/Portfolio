export const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init.headers || {}),
    },
  });

export const methodNotAllowed = () => json({ error: 'Method not allowed' }, { status: 405 });

export const parseJson = async <T>(request: Request): Promise<T | null> => {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
};

export const getCookie = (request: Request, name: string) => {
  const cookie = request.headers.get('cookie') || '';
  const parts = cookie.split(';').map((part) => part.trim());
  const found = parts.find((part) => part.startsWith(`${name}=`));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : null;
};

export const setCookieHeader = (
  name: string,
  value: string,
  options: { maxAge?: number; expires?: Date } = {}
) => {
  const chunks = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ];

  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    chunks.push('Secure');
  }

  if (typeof options.maxAge === 'number') chunks.push(`Max-Age=${options.maxAge}`);
  if (options.expires) chunks.push(`Expires=${options.expires.toUTCString()}`);

  return chunks.join('; ');
};

export const badRequest = (message: string) => json({ error: message }, { status: 400 });

export const unauthorized = () => json({ error: 'Unauthorized' }, { status: 401 });
