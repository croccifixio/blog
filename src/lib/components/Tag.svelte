<script lang="ts">
	export let text: string;
</script>

<span>{text}</span>

<style lang="scss">
	span {
		background-color: var(--c-text);
		border-radius: 5px;
		color: var(--c-bg);
		font-size: 0.9em;
		line-height: 1;
		padding-block: 0.1em 0.3em;
		padding-inline: 0.5em;
	}
</style>
