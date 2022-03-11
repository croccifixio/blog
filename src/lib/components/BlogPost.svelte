<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	export let post;
</script>

<h1>{@html post.title}</h1>
<time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>

<style lang="scss">
	h1 {
		@include css-lock('font-size', 'rem', 1.5, 3);
		line-height: 1.3;
		margin-bottom: 2.5rem;
	}
</style>
