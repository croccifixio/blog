<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import { formatDate } from '$lib/utils/date';

	export let post: Post;

	const updatedSameMonth = formatDate(post.updatedAt, 'MY') === formatDate(post.publishedAt, 'MY');
	const dateFormat = updatedSameMonth ? 'DMY' : 'MY';
</script>

<h1>{@html post.title}</h1>
<dl>
	<div>
		<dt>Tags</dt>
		<dd>
			<ul>
				{#each post.tags as tag}
					<li><Tag text={tag} /></li>
				{/each}
			</ul>
		</dd>
	</div>
	<div>
		<dt>Published</dt>
		<dd>
			<time datetime={post.publishedAt}>{formatDate(post.publishedAt, dateFormat)}</time>
		</dd>
	</div>
	{#if post.updatedAt}
		<div>
			<dt>Updated</dt>
			<dd>
				<time datetime={post.updatedAt}>{formatDate(post.updatedAt, dateFormat)}</time>
			</dd>
		</div>
	{/if}
</dl>

<style lang="scss">
	dl {
		display: flex;
		flex-direction: column;
		gap: 0.5rem 0;

		div {
			align-items: baseline;
			display: flex;
		}
		dt {
			margin-inline-end: 1ch;
		}
		dt::after {
			content: ': ';
		}
		li {
			display: flex;
		}
		time {
			font-weight: bold;
		}
		ul {
			display: flex;
			flex-wrap: wrap;
			gap: 10px 12px;
			margin: 0;
		}
	}

	h1 {
		@include css-lock('font-size', 'rem', 1.5, 3);
		line-height: 1.3;
		margin-bottom: 2.5rem;
	}
</style>
