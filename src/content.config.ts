import { defineCollection, z } from 'astro:content';
import { SUPPORTED_LANGS } from './i18n/config';
const langEnum = z.enum(SUPPORTED_LANGS);

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: z.string().optional(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      coverImage: image().optional(),
      lang: langEnum.default('en'),
      translationOf: z.string().optional(),
    }),
});

const publications = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      venue: z.string().optional(),
      link: z.string().url().optional(),
      tags: z.array(z.string()).optional(),
      lang: langEnum.default('en'),
    }),
});

export const collections = { blog, publications };
