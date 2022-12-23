<script>
	import { Nav, PageTitle } from '$lib/components';
	import '$lib/styles/index.scss';
</script>

<main>
	<header>
		<PageTitle />
		<Nav />
	</header>
	<slot />
</main>

<style>
	main {
		max-width: 100ch;
	}
</style>
