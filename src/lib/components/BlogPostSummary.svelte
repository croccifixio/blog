<script lang="ts">
	import Tag from './Tag.svelte';

	export let index: number;
	export let size: number;
	export let slug: string;
	export let title: string;
	export let tags: string[];
</script>

<a
	data-index={index}
	data-reverse-index={size - index + 1}
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
		cursor: pointer;
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
			border-radius: 10px;
			border: var(--border-width) solid var(--c-text);
			content: '';
			inset: calc(var(--border-width) * -0.5);
			position: absolute;
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
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-block-end: 16px;
			&:focus-visible {
				> * {
					position: relative;
					z-index: 1;
				}
				&::before {
					border: var(--border-width) solid var(--c-active);
					user-select: none;
					z-index: 1;
					@media (prefers-color-scheme: light) {
						box-shadow: none;
					}
				}
				@media (prefers-color-scheme: light) {
					&::after {
						color: var(--c-active);
						user-select: none;
						z-index: 0;
					}
				}
			}
			&::before {
				border-radius: 0;
				@media (prefers-color-scheme: light) {
					background-color: var(--c-bg);
					border-width: var(--border-width);
					box-shadow: none;
				}
			}
			@media (prefers-color-scheme: light) {
				&::after {
					background-color: currentColor;
					bottom: 0;
					content: '';
					inset: calc(var(--border-width) * -0.5);
					position: absolute;
					z-index: -2;
				}
			}
		}
	}

	@media (min-width: 600px) and (max-width: 999px) {
		a {
			@media (prefers-color-scheme: light) {
				// every 1st
				&[data-mod-2='1']::after {
					left: var(--border-width);
				}
				// 2nd
				&[data-index='2']::after {
					top: calc(var(--border-width) * 1);
				}
				// last + every 2nd
				&[data-reverse-index='1']::after,
				&[data-mod-2='0']::after {
					right: calc(var(--border-width) * -2);
				}
				// last 2
				&[data-reverse-index='1']::after,
				&[data-reverse-index='2']::after {
					bottom: calc(var(--border-width) * -2);
				}
			}
		}
	}

	@media (min-width: 1000px) {
		a {
			@media (prefers-color-scheme: light) {
				// every 1st
				&[data-mod-3='1']::after {
					left: var(--border-width);
				}
				// 3rd
				&[data-index='3']::after {
					top: calc(var(--border-width) * 1);
				}
				// last + every 3rd
				&[data-reverse-index='1']::after,
				&[data-mod-3='0']::after {
					right: calc(var(--border-width) * -2);
				}
				// last 3
				&[data-reverse-index='1']::after,
				&[data-reverse-index='2']::after,
				&[data-reverse-index='3']::after {
					bottom: calc(var(--border-width) * -2);
				}
			}
		}
	}
</style>
