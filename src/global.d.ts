/// <reference types="@sveltejs/kit" />

interface Post {
	dependencies?: string[];
	description: string[];
	publishedAt: string;
	seoTitle?: string;
	slug: string;
	tags: string[];
	title: string;
	updatedAt?: string;
}
