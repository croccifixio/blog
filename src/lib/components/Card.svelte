<script lang="ts">
	import Tag from './Tag.svelte';

	export let slug: string;
	export let title: string;
	export let tags: string[];
</script>

<a sveltekit:prefetch href={`/${slug}/`}>
	<h2>{@html title}</h2>
	<ul>
		{#each tags as tag}
			<li><Tag text={tag} /></li>
		{/each}
	</ul>
</a>

<style lang="scss">
	h2 {
		font-size: 1.25rem;
		line-height: 1.4;
		margin-block-start: 0;
		margin-block-end: 0.75rem;
	}

	a {
		all: unset;
		border-radius: 10px;
		color: currentColor;
		display: block;
		padding-block: 11px;
		padding-inline: 12px;
		position: relative;
		&::before {
			background-color: var(--c-bg);
			border-radius: 10px;
			border: 3px solid var(--c-text);
			box-shadow: 3px 3px 0px 0px var(--c-text);
			content: '';
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;
		}
		&:focus-visible {
			&::before {
				border: 3px solid var(--c-active);
				box-shadow: 3px 3px 0px 0px var(--c-active);
			}
			h2 {
				color: var(--c-active);
			}
		}
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 12px;
		justify-content: end;
	}
</style>
