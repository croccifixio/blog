<script lang="ts">
	export let deps: Record<string, string>;
</script>

<ul>
	{#each Object.entries(deps) as [name, version]}
		<li>{name}@{version}</li>
	{/each}
</ul>
