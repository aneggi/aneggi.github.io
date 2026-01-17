import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { DEFAULT_LANG, withLangPrefix, stripLangFromSlug } from '../i18n/config';

export async function GET(context) {
	const posts = (await getCollection('blog')).filter((post) => post.data.lang === DEFAULT_LANG);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: withLangPrefix(`/${stripLangFromSlug(post.slug || post.id)}/`, post.data.lang || DEFAULT_LANG),
		})),
	});
}
