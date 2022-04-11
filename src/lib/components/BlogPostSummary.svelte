<script lang="ts">
	import Tag from './Tag.svelte';

	export let index: number;
	export let slug: string;
	export let title: string;
	export let tags: string[];
</script>

<a
	data-index={index}
	data-mod-2={index % 2}
	data-mod-3={index % 3}
	sveltekit:prefetch
	href={`/${slug}/`}
>
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
			border: var(--border-width) solid var(--c-text);
			content: '';
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;
			@media (prefers-color-scheme: light) {
				box-shadow: var(--border-width) var(--border-width) 0px 0px var(--c-text);
			}
		}
		&:focus-visible {
			&::before {
				border: var(--border-width) solid var(--c-active);
				@media (prefers-color-scheme: light) {
					box-shadow: var(--border-width) var(--border-width) 0px 0px var(--c-active);
				}
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

	@media (min-width: 600px) {
		a {
			&::before {
				border-radius: 0;
				border-width: 0;
				border-bottom-width: var(--border-width);
			}
			&[data-index='1']::before,
			&[data-index='2']::before {
				border-top-width: var(--border-width);
			}
		}
	}

	@media (min-width: 600px) and (max-width: 999px) {
		a {
			&[data-mod-2='1']::before {
				border-right-width: var(--border-width);
			}
		}
	}

	@media (min-width: 1000px) {
		a {
			&[data-index='3']::before {
				border-top-width: var(--border-width);
			}
			&[data-mod-3='0']::before {
				border-left-width: var(--border-width);
			}
			&[data-mod-3='1']::before {
				border-right-width: var(--border-width);
			}
		}
	}
</style>
