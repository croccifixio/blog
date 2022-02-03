<script context="module">
	import { dev } from '$app/env';
	export const hydrate = dev;
	export const router = dev;
</script>

<script>
	import BlogRoll from '$lib/components/BlogRoll.svelte';

	export let posts = [];
</script>

<svelte:head>
	<title>Croccifixio</title>
	<meta
		name="description"
		content="Emmanuel Odongo is a web developer who writes about web design and development."
	/>
</svelte:head>

<BlogRoll {posts} />
