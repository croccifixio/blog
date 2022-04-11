<script lang="ts">
	import { BlogPostSummary } from '$lib/components';
	import { formatDate } from '$lib/utils/date';

	export let posts: Post[];

	const { postsGrid } = posts.reduce(
		(acc, post) => {
			const year = formatDate(post.publishedAt, 'Y').trim();
			const index = acc.years.filter((y) => y === year).length + 1;

			acc.years.push(year);
			acc.postsGrid.push({ index, post, year });

			return acc;
		},
		{ postsGrid: [], years: [] },
	) as { postsGrid: Array<{ index: number; post: Post; year: string }>; years: string[] };
</script>

<ul>
	{#each postsGrid as { index, post, year }}
		<li data-index={index} data-year={year}>
			<article>
				<BlogPostSummary {index} slug={post.slug} tags={post.tags} title={post.title} />
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
		}

		li {
			&[data-index='1'],
			&[data-index='2'] {
				margin-block-start: 8rem;
			}

			&[data-index='1'] {
				grid-column-start: 1;
				position: relative;
				&::before {
					content: attr(data-year);
					font-size: 2em;
					position: absolute;
					top: -5rem;
				}
			}
		}

		ul {
			gap: 0;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1000px) {
		li {
			&[data-index='3'] {
				margin-block-start: 8rem;
			}
		}

		ul {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
