/// <reference types="@sveltejs/kit" />

interface Post {
	dependencies?: Record<string, string>;
	description: string[];
	publishedAt: string;
	seoTitle?: string;
	slug: string;
	tags: string[];
	title: string;
	updatedAt?: string;
}
