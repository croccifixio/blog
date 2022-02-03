<script lang="ts">
	export let text: string;

	function slugify(str: string): string {
		return str.toLocaleLowerCase().replace(/  /g, ' ').replace(/ /g, '-');
	}
</script>

<h2 class="numbered-heading" id={slugify(text ?? '')}>
	<span />
	{text}
</h2>
