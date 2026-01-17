import { getProfile } from './data/profile';
import { DEFAULT_LANG } from './i18n/config';

const profile = getProfile(DEFAULT_LANG);

export const SITE_TITLE = profile.name;
export const SITE_TAGLINE = profile.headline;
export const SITE_DESCRIPTION = profile.siteDescription;
