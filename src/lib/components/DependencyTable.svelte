<script lang="ts">
	export let dependencies: NonNullable<Post['dependencies']>;
</script>

<table>
	<thead>
		<tr>
			<th>Dependency</th>
			<th>Version</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(dependencies) as [dependency, version]}
			<tr>
				<td>{dependency}</td>
				<td>{version}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		@media (max-width: 400px) {
			width: 100%;
		}
	}

	tbody {
		border: var(--border-width) solid currentColor;
		tr:first-child td {
			padding-block-start: 0.3em;
		}
		tr:last-child td {
			padding-block-end: 0.3em;
		}
	}

	td {
		border-right: var(--border-width) solid currentColor;
		min-width: 66%;
		padding: 0.1em 0.6em;
		&:last-child {
			@include code-font();
		}
	}

	th {
		border: var(--border-width) solid currentColor;
		font-weight: bold;
		padding: 0.1em 0.6em;
	}
</style>
