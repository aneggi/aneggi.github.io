import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LANG, SUPPORTED_LANGS, stripLangFromSlug, type Lang, withLangPrefix } from '../i18n/config';
import { slugify } from '../utils';

export const prerender = true;

type BlogPost = CollectionEntry<'blog'>;
type Publication = CollectionEntry<'publications'>;

type UrlEntry = {
  loc: string;
  lastmod?: string;
};

const BASE_SECTIONS = ['/', '/about/', '/posts/', '/projects/', '/publications/', '/tags/'] as const;

const asIsoDate = (value: Date) => value.toISOString().slice(0, 10);

const toAbsoluteUrl = (site: URL | undefined, path: string) => {
  const fallbackOrigin = 'https://aneggi.it';
  const origin = (site ? site.toString() : fallbackOrigin).replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
};

const addEntry = (entries: Map<string, UrlEntry>, loc: string, lastmod?: string) => {
  const existing = entries.get(loc);
  if (!existing) {
    entries.set(loc, { loc, lastmod });
    return;
  }

  if (!existing.lastmod || (lastmod && lastmod > existing.lastmod)) {
    existing.lastmod = lastmod;
  }
};

const getLangTags = (lang: Lang, posts: BlogPost[], publications: Publication[]) => {
  const tagSet = new Set<string>();

  for (const post of posts.filter((item) => item.data.lang === lang)) {
    for (const tag of post.data.tags || []) {
      const normalized = slugify(tag);
      if (normalized) tagSet.add(normalized);
    }
  }

  for (const publication of publications.filter((item) => item.data.lang === lang)) {
    for (const tag of publication.data.tags || []) {
      const normalized = slugify(tag);
      if (normalized) tagSet.add(normalized);
    }
  }

  return [...tagSet].sort((a, b) => a.localeCompare(b));
};

const xmlEscape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET(context: { site?: URL }) {
  const now = new Date();
  const blogPosts = (await getCollection('blog')).filter((post) => post.data.date <= now);
  const publications = (await getCollection('publications')).filter((publication) => publication.data.pubDate <= now);

  const entries = new Map<string, UrlEntry>();

  for (const section of BASE_SECTIONS) {
    addEntry(entries, toAbsoluteUrl(context.site, section));
  }

  for (const lang of SUPPORTED_LANGS) {
    for (const section of BASE_SECTIONS) {
      addEntry(entries, toAbsoluteUrl(context.site, withLangPrefix(section, lang)));
    }
  }

  for (const post of blogPosts) {
    const lang = post.data.lang || DEFAULT_LANG;
    const path = withLangPrefix(`/${stripLangFromSlug(post.slug || post.id)}/`, lang);
    const lastmod = asIsoDate(post.data.updatedDate || post.data.date);
    addEntry(entries, toAbsoluteUrl(context.site, path), lastmod);
  }

  for (const lang of SUPPORTED_LANGS) {
    const tags = getLangTags(lang, blogPosts, publications);
    for (const tag of tags) {
      const path = withLangPrefix(`/tags/${tag}/`, lang);
      addEntry(entries, toAbsoluteUrl(context.site, path));
    }
  }

  const urlEntries = [...entries.values()].sort((a, b) => a.loc.localeCompare(b.loc));
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries
    .map((entry) => `  <url><loc>${xmlEscape(entry.loc)}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
