<script lang="ts">
	export let index: number;
	export let type: 'blocks' | 'text' = 'text';
</script>

<li id={`footnote-${index}`}>
	{#if type === 'text'}
		<p>
			<slot />
			<a href={`#ref-${index}`} role="doc-backlink">↩︎</a>
		</p>
	{:else}
		<slot />
		<a href={`#ref-${index}`} role="doc-backlink">↩︎</a>
	{/if}
</li>
