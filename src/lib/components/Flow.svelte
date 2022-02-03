<script lang="ts">
	export let steps: string[];
</script>

{#each steps as step, index}
	<span class="ui-flow">{@html step}</span>
	{#if index + 1 < steps.length}
		" "&rarr;" "
	{/if}
{/each}
