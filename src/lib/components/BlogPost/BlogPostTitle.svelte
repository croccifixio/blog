<script lang="ts">
	export let text: Post['title'];
</script>

<h1>{@html text}</h1>

<style lang="scss">
	h1 {
		@include css-lock('font-size', 'rem', 2.2, 3);
		line-height: 1.3;
		margin-bottom: 2.5rem;
	}
</style>
