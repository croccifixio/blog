<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import { formatDate } from '$lib/utils/date';

	export let publishedAt: Post['publishedAt'];
	export let tags: Post['tags'];
	export let updatedAt: Post['updatedAt'];

	const updatedSameMonth = formatDate(updatedAt, 'MY') === formatDate(publishedAt, 'MY');
	const dateFormat = updatedSameMonth ? 'DMY' : 'MY';
</script>

<dl>
	<div>
		<dt>Tags</dt>
		<dd>
			<ul>
				{#each tags as tag}
					<li><Tag text={tag} /></li>
				{/each}
			</ul>
		</dd>
	</div>
	<div>
		<dt>Published</dt>
		<dd>
			<time datetime={publishedAt}>{formatDate(publishedAt, dateFormat)}</time>
		</dd>
	</div>
	{#if updatedAt}
		<div>
			<dt>Updated</dt>
			<dd>
				<time datetime={updatedAt}>{formatDate(updatedAt, dateFormat)}</time>
			</dd>
		</div>
	{/if}
</dl>

<style>
	div {
		align-items: baseline;
		display: flex;
	}
	dl {
		display: flex;
		flex-direction: column;
		gap: 0.5rem 0;
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
</style>
