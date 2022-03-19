<script lang="ts">
	import { media } from '$lib/stores/media';

	export let spacing: string = '0';

	let clientWidth;
	let wave: { amplitude: number; pattern: 'sinusoidal' | 'triangular'; wavelength: number };

	$: if ($media.dark) {
		wave = { amplitude: 8, pattern: 'sinusoidal', wavelength: 22 };
	} else {
		wave = { amplitude: 12, pattern: 'triangular', wavelength: 20 };
	}
	$: height = wave?.amplitude;
	$: pattern = wave?.pattern;
	$: width = wave?.wavelength;
</script>

<div bind:clientWidth style:margin-block={spacing}>
	<svg {height} width={clientWidth} xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern fill="transparent" {height} id="pattern" width={width / clientWidth} x="0" y="0">
				{#if pattern === 'triangular'}
					<path
						d={`M0 ${height * 0.2} l${width / 2} ${height * 0.6}`}
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="var(--border-width)"
					/>
					<path
						d={`M${width / 2} ${height * 0.8} l${width / 2} -${height * 0.6}`}
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="var(--border-width)"
					/>
				{/if}
				{#if pattern === 'sinusoidal'}
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
				{/if}
			</pattern>
		</defs>
		<rect fill="url(#pattern)" {height} width={clientWidth} />
	</svg>
</div>
