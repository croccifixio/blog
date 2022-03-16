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
		padding: 0 4px 4px;
	}
	.flow {
		display: inline;
	}
</style>
