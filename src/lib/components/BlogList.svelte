<script lang="ts">
	import { BlogPostSummary } from '$lib/components';
	import { formatDate } from '$lib/utils/date';
	import { countBy } from '@fxts/core';

	export let posts: Post[];

	const yearCounts = countBy((post) => formatDate(post.publishedAt, 'Y').trim(), posts);
	const { postsGrid } = posts.reduce(
		(acc, post) => {
			const year = formatDate(post.publishedAt, 'Y').trim();
			const index = acc.years.filter((y) => y === year).length + 1;
			const size = yearCounts?.[year] ?? 0;

			acc.years.push(year);
			acc.postsGrid.push({ index, post, size, year });

			return acc;
		},
		{ postsGrid: [], years: [] },
	) as {
		postsGrid: Array<{ index: number; post: Post; size: number; year: string }>;
		years: string[];
	};
</script>

<ul>
	{#each postsGrid as { index, post, size, year }}
		<li
			data-index={index}
			data-reverse-index={size - index + 1}
			data-mod-2={index % 2}
			data-mod-3={index % 3}
			data-year={year}
		>
			<article>
				<BlogPostSummary {index} {size} slug={post.slug} tags={post.tags} title={post.title} />
			</article>
		</li>
	{:else}
		<p>No posts yet!</p>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
		list-style: none;
	}

	@media (min-width: 600px) {
		article,
		li,
		ul {
			align-items: stretch;
			display: grid;
			position: relative;
		}

		li {
			--gap: 6rem;

			&[data-index='1'],
			&[data-index='2'] {
				margin-block-start: var(--gap);
			}

			&[data-index='1'] {
				grid-column-start: 1;
				&::before {
					content: attr(data-year);
					font-size: 1.75em;
					position: absolute;
					padding-top: calc(var(--gap) - 4rem);
					top: calc(var(--gap) * -1 + var(--border-width) * -0.5);
				}
			}
		}

		ul {
			gap: 0;
			grid-template-columns: repeat(2, 1fr);
		}

		@media (prefers-color-scheme: light) {
			ul {
				margin-block-start: -2rem;
			}
		}

		@media (prefers-color-scheme: dark) {
			li {
				--gap: 7rem;
				&::after {
					content: '';
					height: 100%;
					position: absolute;
				}
				&[data-index='1']::before {
					border-block: var(--border-width) dashed var(--c-text);
					border-block: var(--border-width) dashed var(--c-text);
					height: calc(var(--gap) + var(--border-width));
					left: calc(var(--border-width) * -0.5);
					padding-left: 0.3em;
					right: calc(-100% + var(--border-width) * -0.5);
				}
			}

			ul {
				outline: var(--border-width) dashed var(--c-text);
				outline-offset: calc(var(--border-width) * -0.5);
			}
		}
	}

	@media (min-width: 1000px) {
		li {
			&[data-index='3'] {
				margin-block-start: var(--gap);
			}
		}

		ul {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (prefers-color-scheme: dark) {
			li {
				position: relative;
				&[data-index='1']::before {
					right: calc(-200% + var(--border-width) * -0.5);
				}
				&[data-reverse-index='1'][data-mod-3='1']:not([data-index='1'])::before {
					border-right: var(--border-width) dashed var(--c-text);
					content: '';
					height: 100%;
					position: absolute;
					right: calc(-100% + var(--border-width) * -0.5);
				}
			}
		}
	}
</style>
