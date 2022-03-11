<script lang="ts">
	export let title: string;
</script>

<h1>{title}</h1>

<style lang="scss">
	h1 {
		@include body-font-bold();
		font-size: 2.4rem;
		hyphens: auto;
		line-height: 1;
		margin-block-end: 1.5rem;
		text-transform: uppercase;
	}
</style>
