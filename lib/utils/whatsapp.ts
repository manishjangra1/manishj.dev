export const DEFAULT_WHATSAPP_MESSAGE = 'Hi Manish, can we have a meeting regarding a project or collaboration?';

const WA_HOSTS = ['wa.me', 'www.wa.me', 'api.whatsapp.com', 'www.api.whatsapp.com'];

function getDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function extractWhatsAppNumber(rawValue?: string | null): string | null {
  if (!rawValue) return null;

  const value = rawValue.trim();
  if (!value) return null;

  // Allow storing full links in DB (wa.me / api.whatsapp.com) or raw numbers.
  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      if (!WA_HOSTS.includes(url.hostname.toLowerCase())) {
        return null;
      }

      // Common formats:
      // - https://wa.me/919999999999
      // - https://api.whatsapp.com/send?phone=919999999999
      const phoneFromQuery = url.searchParams.get('phone');
      const phoneFromPath = url.pathname.split('/').filter(Boolean).at(-1) || '';
      const digits = getDigits(phoneFromQuery || phoneFromPath);

      if (digits.length >= 8) {
        return digits.startsWith('00') ? digits.slice(2) : digits;
      }
      return null;
    } catch {
      return null;
    }
  }

  const digits = getDigits(value);
  if (digits.length < 8) return null;
  return digits.startsWith('00') ? digits.slice(2) : digits;
}

export function buildWhatsAppUrl(rawValue?: string | null, message: string = DEFAULT_WHATSAPP_MESSAGE): string | null {
  const phoneNumber = extractWhatsAppNumber(rawValue);
  if (!phoneNumber) return null;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
