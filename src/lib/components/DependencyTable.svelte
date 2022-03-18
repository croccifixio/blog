<script lang="ts">
	export let dependencies: Post['dependencies'];
</script>

{#if dependencies}
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
{/if}

<style lang="scss">
	table {
		@media (max-width: 400px) {
			width: 100%;
		}
	}

	tbody {
		border: 3px solid currentColor;
		tr:first-child td {
			padding-block-start: 0.3em;
		}
		tr:last-child td {
			padding-block-end: 0.3em;
		}
	}

	td {
		border-right: 3px solid currentColor;
		min-width: 66%;
		padding: 0.1em 0.6em;
	}

	th {
		border: 3px solid currentColor;
		font-weight: bold;
		padding: 0.1em 0.6em;
	}
</style>
