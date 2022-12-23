<script lang="ts">
	import { page } from '$app/stores';
	import { navItems } from '$lib/consts';

	let nav = [];
	page.subscribe((page) => {
		nav = navItems.filter(([, path]) => path !== page.url.pathname);
	});
</script>

<nav>
	<ul>
		{#each nav as [name, path]}
			<li><a href={path}>{name}</a></li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	ul {
		&::before {
			content: '[ ';
		}
		&::after {
			content: ' ]';
		}
	}
	li {
		display: inline-block;
		&:not(:first-child)::before {
			content: ' | ';
			white-space: pre;
		}
	}
	a {
		background-image: none;
		color: inherit;
		text-decoration: none;
		text-transform: lowercase;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
