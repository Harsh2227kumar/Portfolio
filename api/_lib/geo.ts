const IN_REGIONS: Record<string, string> = {
  AN: 'Andaman and Nicobar Islands', AP: 'Andhra Pradesh', AR: 'Arunachal Pradesh', AS: 'Assam',
  BR: 'Bihar', CH: 'Chandigarh', CT: 'Chhattisgarh', CG: 'Chhattisgarh', DH: 'Dadra and Nagar Haveli and Daman and Diu',
  DN: 'Dadra and Nagar Haveli', DD: 'Daman and Diu', DL: 'Delhi', GA: 'Goa', GJ: 'Gujarat', HR: 'Haryana',
  HP: 'Himachal Pradesh', JK: 'Jammu and Kashmir', JH: 'Jharkhand', KA: 'Karnataka', KL: 'Kerala',
  LA: 'Ladakh', LD: 'Lakshadweep', MP: 'Madhya Pradesh', MH: 'Maharashtra', MN: 'Manipur', ML: 'Meghalaya',
  MZ: 'Mizoram', NL: 'Nagaland', OR: 'Odisha', OD: 'Odisha', PY: 'Puducherry', PB: 'Punjab', RJ: 'Rajasthan',
  SK: 'Sikkim', TN: 'Tamil Nadu', TG: 'Telangana', TS: 'Telangana', TR: 'Tripura', UP: 'Uttar Pradesh',
  UT: 'Uttarakhand', UK: 'Uttarakhand', WB: 'West Bengal',
};

const US_REGIONS: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
  ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

const decode = (value: string | null, max = 120) => {
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value).trim();
    return decoded ? decoded.slice(0, max) : null;
  } catch {
    return value.slice(0, max);
  }
};

const numeric = (value: string | null) => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const getClientIp = (request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip')?.trim() || null;
  return ip ? ip.slice(0, 64) : null;
};

export const countryName = (code: string | null) => {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
};

export const regionName = (countryCode: string | null, regionCode: string | null) => {
  if (!regionCode) return null;
  if (countryCode === 'IN') return IN_REGIONS[regionCode] || regionCode;
  if (countryCode === 'US') return US_REGIONS[regionCode] || regionCode;
  return regionCode;
};

export interface GeoInfo {
  ip: string | null;
  countryCode: string | null;
  regionCode: string | null;
  region: string | null;
  city: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
}

// Vercel attaches these headers to every request; they are absent in plain local dev.
export const getGeo = (request: Request): GeoInfo => {
  const country = request.headers.get('x-vercel-ip-country');
  const countryCode = country && /^[A-Z]{2}$/.test(country) ? country : null;
  const regionCode = decode(request.headers.get('x-vercel-ip-country-region'), 12);

  return {
    ip: getClientIp(request),
    countryCode,
    regionCode,
    region: regionName(countryCode, regionCode),
    city: decode(request.headers.get('x-vercel-ip-city')),
    postalCode: decode(request.headers.get('x-vercel-ip-postal-code'), 20),
    latitude: numeric(request.headers.get('x-vercel-ip-latitude')),
    longitude: numeric(request.headers.get('x-vercel-ip-longitude')),
    timezone: decode(request.headers.get('x-vercel-ip-timezone'), 60),
  };
};
