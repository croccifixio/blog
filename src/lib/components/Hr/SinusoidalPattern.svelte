<script lang="ts">
	import { ignoreWhiteSpace } from '$lib/utils/strings';

	export let amplitude: number;
	export let periods: number;
	export let wavelength: number;
</script>

<pattern fill="transparent" height={amplitude} id="sinusoidal-wave" width={1 / periods} x="0" y="0">
	<path
		d={ignoreWhiteSpace(`
			M0                    ${amplitude * 0.475}
			C${wavelength * 0.2}  ${amplitude * 0.1}
			 ${wavelength * 0.33} ${amplitude * 0.1}
			 ${wavelength * 0.5}  ${amplitude * 0.475}
			C${wavelength * 0.66} ${amplitude * 0.9}
			 ${wavelength * 0.8}  ${amplitude * 0.9}
			 ${wavelength}        ${amplitude * 0.475}
		`)}
		stroke="currentColor"
		stroke-linecap="square"
		stroke-width="var(--border-width)"
	/>
</pattern>
