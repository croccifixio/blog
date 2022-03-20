<script lang="ts">
	export let keys: string[];
	export let separator: string = '+';
</script>

{#if keys.length === 1}
	<kbd class="key">{keys[0]}</kbd>
{:else}
	<kbd>
		{#each keys as key, index}
			<kbd class="key">{key}</kbd>{#if index + 1 < keys.length}&nbsp;{separator}&nbsp;{/if}
		{/each}
	</kbd>
{/if}

<style lang="scss">
	.key {
		border: 2px solid var(--c-gray);
		padding: 0.05em 0.3em 0.1em;
	}
</style>
