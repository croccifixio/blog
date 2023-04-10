<script lang="ts">
	import { getContext } from 'svelte';

	export let src: string;
	export let alt: string = '';

	const context = getContext('__svelte__');
	let fullPath = src;

	if (context) {
		(context as any).page.subscribe((page) => {
			fullPath = `blog/${page.params.slug}/${src}`;
		});
	}
</script>

<img {alt} src={fullPath} />
