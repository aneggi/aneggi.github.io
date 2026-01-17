import { DEFAULT_LANG, SUPPORTED_LANGS, type Lang } from '../i18n/config';
import profile from './profile.json';

type ProfileTranslations = typeof profile.languages;
type SupportedProfileLang = keyof ProfileTranslations;

function resolveLang(lang: Lang): SupportedProfileLang {
  return (SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG) as SupportedProfileLang;
}

export function getProfile(lang: Lang = DEFAULT_LANG) {
  const selectedLang = resolveLang(lang);
  const { languages, ...common } = profile;
  return {
    ...common,
    ...languages[selectedLang],
  };
}
