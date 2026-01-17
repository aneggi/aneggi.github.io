export const SUPPORTED_LANGS = ['en', 'it'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';
export const LANG_NAMES: Record<Lang, string> = {
  en: 'EN',
  it: 'IT',
};

export function resolveLang(input?: string | null): Lang {
  if (SUPPORTED_LANGS.includes((input || '') as Lang)) {
    return input as Lang;
  }
  return DEFAULT_LANG;
}

function ensureTrailingSlash(pathname: string) {
  if (pathname.endsWith('/') || pathname.endsWith('.xml')) {
    return pathname;
  }
  return `${pathname}/`;
}

export function withLangPrefix(pathname: string, lang: Lang) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (normalized === '/' || normalized === '') {
    return `/${lang}/`;
  }
  return `/${lang}${ensureTrailingSlash(normalized)}`;
}

export function switchLangInPath(pathname: string, lang: Lang) {
  const normalized = ensureTrailingSlash(pathname.startsWith('/') ? pathname : `/${pathname}`);
  const parts = normalized.split('/').filter(Boolean);

  if (parts[0] && SUPPORTED_LANGS.includes(parts[0] as Lang)) {
    parts[0] = lang;
  } else {
    parts.unshift(lang);
  }

  return `/${parts.join('/')}/`;
}

export function stripLangFromSlug(slug: string | undefined | null) {
  if (!slug) return '';
  const parts = slug.split('/');
  if (parts.length > 1 && SUPPORTED_LANGS.includes(parts[0] as Lang)) {
    return parts.slice(1).join('/');
  }
  return slug;
}
