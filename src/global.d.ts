/// <reference types="@sveltejs/kit" />

interface Post {
	dependencies?: Record<string, string>;
	description: string[];
	publishedAt: string;
	seoTitle?: string;
	slug: string;
	sources?: { text: string; url: string }[];
	tags: string[];
	title: string;
	updatedAt?: string;
}
