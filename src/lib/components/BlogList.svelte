<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	export let posts;
</script>

<ul>
	{#each posts as post}
		<li>
			<article>
				<Card slug={post.slug} tags={post.tags} title={post.title} />
				<!-- <BlogPostSummary
					publishedAt={post.publishedAt}
					title={post.title}
					description={post.description}
					slug={post.slug}
				/> -->
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
		gap: 2em;
		list-style: none;
	}
</style>
