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
	import BlogPost from '$lib/components/BlogPost.svelte';

	export let page, post;
</script>

<svelte:head>
	<title>{post?.seoTitle ?? post?.title}</title>
	<meta name="description" content={post?.description?.[0]} />
</svelte:head>

<BlogPost {post} />
<svelte:component this={page} />
