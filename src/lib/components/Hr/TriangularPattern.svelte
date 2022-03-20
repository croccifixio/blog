<script lang="ts">
	import { ignoreWhiteSpace } from '$lib/utils/strings';

	export let amplitude: number;
	export let periods: number;
	export let wavelength: number;
</script>

<pattern fill="transparent" height={amplitude} id="triangular-wave" width={1 / periods} x="0" y="0">
	<path
		d={ignoreWhiteSpace(`
			M0                 ${amplitude * 0.2}
			l${wavelength / 2} ${amplitude * 0.6}
		`)}
		stroke="currentColor"
		stroke-linecap="round"
		stroke-width="var(--border-width)"
	/>
	<path
		d={ignoreWhiteSpace(`
			M${wavelength / 2} ${amplitude * 0.8}
			l${wavelength / 2} -${amplitude * 0.6}
		`)}
		stroke="currentColor"
		stroke-linecap="round"
		stroke-width="var(--border-width)"
	/>
</pattern>
