import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		dependencies: z.record(z.string()).optional(),
		description: z.array(z.string()),
		publishedAt: z.coerce.date(),
		seoTitle: z.string(),
		sources: z
			.array(
				z.object({
					text: z.string(),
					url: z.string(),
				}),
			)
			.optional(),
		tags: z.array(z.string()),
		title: z.string(),
		updatedAt: z.coerce.date().optional(),
	}),
});

export const collections = { blog };
