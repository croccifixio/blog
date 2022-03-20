<script lang="ts">
	import { ignoreWhiteSpace } from '$lib/utils/strings';

	import SinusoidalPattern from './SinusoidalPattern.svelte';
	import TriangularPattern from './TriangularPattern.svelte';

	export let spacing: string = '0';

	const periods = 100;
	const waves = {
		sinusoidal: {
			amplitude: 8,
			wavelength: 20,
		},
		triangular: {
			amplitude: 12,
			wavelength: 22,
		},
	};
</script>

<div
	style:margin-block={spacing}
	style={ignoreWhiteSpace(`
		--periods: ${periods};
		--sinusoidal-wave-amplitude: ${waves.sinusoidal.amplitude};
		--sinusoidal-wave-wavelength: ${waves.sinusoidal.wavelength};
		--triangular-wave-amplitude: ${waves.triangular.amplitude};
		--triangular-wave-wavelength: ${waves.triangular.wavelength};
	`)}
>
	<svg xmlns="http://www.w3.org/2000/svg">
		<defs>
			<SinusoidalPattern
				amplitude={waves.sinusoidal.amplitude}
				{periods}
				wavelength={waves.sinusoidal.wavelength}
			/>
			<TriangularPattern
				amplitude={waves.triangular.amplitude}
				{periods}
				wavelength={waves.triangular.wavelength}
			/>
		</defs>
		<rect />
	</svg>
</div>

<style>
	div {
		overflow: hidden;
	}

	rect {
		fill: url(#sinusoidal-wave);
	}

	:is(rect, svg) {
		height: calc(1px * var(--sinusoidal-wave-amplitude));
		width: calc(1px * var(--periods) * var(--sinusoidal-wave-wavelength));
	}

	@media (prefers-color-scheme: light) {
		rect {
			fill: url(#triangular-wave);
		}

		:is(rect, svg) {
			height: calc(1px * var(--triangular-wave-amplitude));
			width: calc(1px * var(--periods) * var(--triangular-wave-wavelength));
		}
	}
</style>
