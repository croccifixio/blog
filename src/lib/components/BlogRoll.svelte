<script lang="ts">
	import BlogPostSummary from '$lib/components/BlogPostSummary.svelte';

	export let posts;
</script>

<ul class="blog-list">
	{#each posts as post}
		<li>
			<article>
				<BlogPostSummary
					publishedAt={post.publishedAt}
					title={post.title}
					description={post.description}
					slug={post.slug}
				/>
			</article>
		</li>
	{:else}
		<p>No posts yet!</p>
	{/each}
</ul>
