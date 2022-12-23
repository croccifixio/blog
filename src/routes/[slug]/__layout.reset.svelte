<script lang="ts">
	import { Nav } from '$lib/components';
	import '$lib/styles/index.scss';
</script>

<main>
	<slot />
	<footer>
		<Nav />
	</footer>
</main>
