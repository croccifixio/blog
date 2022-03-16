<script lang="ts">
	export let text: string;

	function slugify(str: string): string {
		return str.toLocaleLowerCase().replace(/  /g, ' ').replace(/ /g, '-');
	}
</script>

<h2 id={slugify(text ?? '')}>
	{text}
</h2>

<style lang="scss">
	h2 {
		counter-increment: sections;
		position: relative;

		&::before {
			content: counter(sections) '. ';
			font-size: 0.9em;
			padding-top: 0.1em;
			position: absolute;
			right: 100%;
		}
	}
</style>
