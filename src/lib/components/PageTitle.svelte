<script lang="ts">
	import { page } from '$app/stores';
	import { navItems } from '$lib/consts';

	let title = '';
	page.subscribe((page) => {
		title = navItems.find(([, path]) => path === page.url.pathname)?.[0];
	});
</script>

<h1>{title}</h1>

<style lang="scss">
	h1 {
		@include body-font-bold();
		font-size: 2.4rem;
		hyphens: auto;
		line-height: 1;
		margin-block-end: 1.5rem;
		text-transform: uppercase;
	}
</style>
