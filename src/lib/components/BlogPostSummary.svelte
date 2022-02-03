<script>
	import { formatDate } from '$lib/utils/date';

	export let title;
	export let publishedAt;
	export let description;
	export let slug;
</script>

<div class="header">
	<h2>
		<a sveltekit:prefetch href={`/${slug}/`}>
			<span class="title">{@html title}</span>
		</a>
	</h2>
	<time datetime={publishedAt}>{formatDate(publishedAt)}</time>
</div>
<div class="description">
	<p>{description}</p>
</div>
