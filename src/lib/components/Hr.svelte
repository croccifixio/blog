<script lang="ts">
	export let spacing: string = '0';

	let clientWidth;
	const width = 22;
	const height = 8;
</script>

<div bind:clientWidth style:margin-block={spacing}>
	<svg {height} width={clientWidth} xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern fill="transparent" {height} id="pattern" width={width / clientWidth} x="0" y="0">
				<path
					d={`
					M0 ${height * 0.475}
					C${width * 0.2} ${height * 0.1} ${width * 0.33} ${height * 0.1} ${width * 0.5} ${height * 0.475}
					C${width * 0.66} ${height * 0.9} ${width * 0.8} ${height * 0.9} ${width} ${height * 0.475}
					`}
					stroke="currentColor"
					stroke-linecap="square"
					stroke-width="var(--border-width)"
				/>
			</pattern>
		</defs>
		<rect fill="url(#pattern)" {height} width={clientWidth} />
	</svg>
</div>
