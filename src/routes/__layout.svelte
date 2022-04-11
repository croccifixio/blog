<script>
	import { PageTitle } from '$lib/components';
	import '$lib/styles/index.scss';
</script>

<main>
	<PageTitle title="Blog" />
	<slot />
</main>

<style>
	main {
		max-width: 100ch;
	}
</style>
