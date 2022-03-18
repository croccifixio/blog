<script lang="ts">
	export let steps: string[];
</script>

{#each steps as step, index}
	<span class="flow">
		<span class="name">{@html step}</span>
		{#if index + 1 < steps.length}&rarr;{/if}
	</span>
{/each}

<style lang="scss">
	.name {
		border: 2px solid var(--c-text);
		border-radius: 4px;
		padding: 0.05em 0.3em 0.1em;
	}
	.flow {
		display: inline;
	}
</style>
