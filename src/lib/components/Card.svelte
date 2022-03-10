<script lang="ts">
	export let slug: string;
	export let title: string;
	export let tags: string[];
</script>

<a sveltekit:prefetch href={`/${slug}/`}>
	<h2>{@html title}</h2>
	<ul>
		{#each tags as tag}
			<li>{tag}</li>
		{/each}
	</ul>
</a>

<style lang="scss">
	h2 {
		font-size: 1.25rem;
		line-height: 1.4;
		margin-block-start: 0;
		margin-top: 0;
	}

	a {
		all: unset;
		border-radius: 10px;
		color: currentColor;
		display: block;
		margin-inline: -0.25rem 0.25rem;
		padding-block: 11px 5px;
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
		list-style: none;
		margin-block: 0;
	}

	li {
		background-color: var(--c-text);
		border-radius: 5px;
		color: var(--c-bg);
		line-height: 1;
		padding-block: 0.2em 0.4em;
		padding-inline: 0.5em;
	}
</style>
