<script lang="ts">
	export let keys: string[];
	export let separator: string = '+';
</script>

{#if keys.length === 1}
	<kbd class="key">{keys[0]}</kbd>
{:else}
	<kbd>
		{#each keys as key, index}
			{key}
			{#if index + 1 < keys.length}
				&nbsp;{separator}&nbsp;
			{/if}
		{/each}
	</kbd>
{/if}
