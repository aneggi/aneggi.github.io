import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';

// https://astro.build/config
export default defineConfig({
  site: 'https://aneggi.it',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: 'aneggi.it'
    }]]
  }
});
