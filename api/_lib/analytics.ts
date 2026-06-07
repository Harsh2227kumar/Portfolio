export const cleanId = (value: unknown) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!/^[a-zA-Z0-9_-]{12,80}$/.test(trimmed)) return null;
  return trimmed;
};

export const cleanPath = (value: unknown) => {
  if (typeof value !== 'string') return '/';
  const trimmed = value.trim();
  if (!trimmed.startsWith('/')) return '/';
  return trimmed.slice(0, 240);
};

export const cleanOptionalText = (value: unknown, max = 240) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
};

export const deviceFromUserAgent = (userAgent: string | null) => {
  const ua = (userAgent || '').toLowerCase();
  if (/bot|crawler|spider|crawling/.test(ua)) return 'bot';
  if (/ipad|tablet/.test(ua)) return 'tablet';
  if (/mobi|android|iphone|ipod/.test(ua)) return 'mobile';
  return 'desktop';
};

export const getCountryCode = (request: Request) => {
  const code = request.headers.get('x-vercel-ip-country');
  return code && /^[A-Z]{2}$/.test(code) ? code : null;
};
