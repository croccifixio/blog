import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

import { highlight as highlighter } from './src/lib/utils/highlight.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.svx'],
			highlight: { highlighter },
			smartypants: false,
		}),
		preprocess({
			scss: {
				prependData: `
          @import './src/lib/styles/config/_colors';
          @import './src/lib/styles/config/_fonts';
          @import './src/lib/styles/config/_variables';
          @import './src/lib/styles/config/mixins';
        `,
			},
		}),
	],
	kit: {
		adapter: adapter({ precompress: true }),
		files: { assets: 'static' },
		prerender: { default: true },
	},
};

export default config;
