#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { z } from 'zod';

const schema = z.object({
	title: z.string(),
	excerpt: z.string(),
	publishDate: z
		.string()
		.datetime({ offset: true, message: 'publishDate must be ISO 8601 with timezone, e.g. 2026-01-14T09:00:00Z' }),
	updateDate: z
		.string()
		.datetime({ offset: true })
		.optional(),
	tags: z.array(z.string()).optional(),
	category: z.string().optional(),
	draft: z.boolean().optional(),
	metadata: z
		.object({
			canonical: z.string().url().optional(),
		})
		.optional(),
});

async function main() {
	const filePath = process.argv[2];

	if (!filePath) {
		console.error('Usage: npm run validate:post -- <path-to-markdown>');
		process.exit(1);
	}

	const raw = await readFile(filePath, 'utf8');
	const { data } = matter(raw);
	const normalized = {
		...data,
		publishDate:
			data.publishDate instanceof Date ? data.publishDate.toISOString() : data.publishDate,
		updateDate:
			data.updateDate instanceof Date ? data.updateDate.toISOString() : data.updateDate,
	};

	const result = schema.safeParse(normalized);

	if (!result.success) {
		console.error('Validation failed:');
		for (const issue of result.error.issues) {
			console.error(`- ${issue.path.join('.') || 'root'}: ${issue.message}`);
		}
		process.exit(1);
	}

	console.log(`${filePath} is valid.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
