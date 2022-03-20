<script context="module">
	import { dev } from '$app/env';
	export const hydrate = dev;
	export const router = dev;
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch, params, url }) {
		const { pathname } = url;
		const { slug } = params;
		const x = pathname.replace(/\/$/, '');
		const res = await fetch(`${x}.json`);
		if (res.ok) {
			return {
				props: {
					...(await res.json()),
					slug,
					page: (await import(`../../content/blog/${slug}/index.svx`)).default,
				},
			};
		}

		return {};
	}
</script>

<script>
	import {
		BlogPostMeta,
		BlogPostSources,
		BlogPostTitle,
		DependencyTable,
		Hr,
	} from '$lib/components';

	export let page, post;
</script>

<svelte:head>
	<title>{post?.seoTitle ?? post?.title}</title>
	<meta name="description" content={post?.description?.[0]} />
</svelte:head>

{#if post}
	<BlogPostTitle text={post.title} />
	<Hr spacing="2.25rem 1.5rem" />
	<BlogPostMeta publishedAt={post.publishedAt} tags={post.tags} updatedAt={post.updatedAt} />
	{#if post.dependencies}
		<div style="margin-block-start: 1.5rem;">
			<DependencyTable dependencies={post.dependencies} />
		</div>
		<Hr spacing="2.25rem" />
	{:else}
		<Hr spacing="1.25rem 2.25rem" />
	{/if}

	<svelte:component this={page} />

	{#if post.sources}
		<Hr spacing="2.25rem 1.5rem" />
		<BlogPostSources sources={post.sources} />
	{/if}
{/if}
