<script lang="ts">
	export let sources: NonNullable<Post['sources']>;
</script>

<dl>
	<dt>Sources</dt>
	<dd>
		<ul>
			{#each sources as { text, url }}
				<li><a href={url}>{text}</a></li>
			{/each}
		</ul>
	</dd>
</dl>

<style lang="scss">
	dl {
		display: flex;
		flex-direction: column;
		gap: 0.5rem 0;
	}
	dt {
		@include css-lock('font-size', 'rem', 1.05, 1.15);
	}
	dt::after {
		content: ': ';
	}
	li + li {
		margin-block-start: 0.75rem;
	}
	ul {
		margin: 0;
	}
</style>
