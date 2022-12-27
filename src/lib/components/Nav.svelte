<script lang="ts">
	import { page } from '$app/stores';
	import { navItems } from '$lib/consts';
</script>

<nav>
	<ul>
		{#each navItems as [name, path]}
			<li class:sr-only={path === $page.url.pathname}><a href={path}>{name}</a></li>
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
		&::before {
			content: ' | ';
			white-space: pre;
		}
		&:first-child::before {
			content: none;
		}
		&:first-child.sr-only + li::before {
			content: none;
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
