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
		margin-top: 0;
		text-transform: uppercase;
	}
</style>
