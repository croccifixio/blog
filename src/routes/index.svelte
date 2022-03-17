<script context="module">
	import { dev } from '$app/env';
	export const hydrate = dev;
	export const router = dev;
</script>

<script lang="ts">
	import BlogList from '$lib/components/BlogList.svelte';
	import { SITE_DESCRIPTION, SITE_NAME } from '$lib/info';

	export let posts: Post[] = [];
</script>

<svelte:head>
	<title>{SITE_NAME}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<BlogList {posts} />
