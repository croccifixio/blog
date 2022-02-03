<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	export let post;
</script>

<h1 class="title">{@html post.title}</h1>
<time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
