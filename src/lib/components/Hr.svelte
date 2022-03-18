<script lang="ts">
	export let spacing: string = '0';

	let width;
</script>

<div bind:clientWidth={width} style:margin-block={spacing}>
	<svg {width} height="8" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern fill="transparent" height="1" id="pattern" width={22 / width} x="0" y="0">
				<path
					d="M0 3.80435C4.45284 0.471019 7.78617 0.471019 11.1195 3.80435C14.4528 7.13769 17.7862 7.13769 22 3.80435"
					stroke="currentColor"
					stroke-linecap="square"
					stroke-width="var(--border-width)"
				/>
			</pattern>
		</defs>

		<rect {width} fill="url(#pattern)" height="8" />
	</svg>
</div>
