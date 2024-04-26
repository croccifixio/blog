import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { transformerMetaHighlight, transformerMetaWordHighlight } from '@shikijs/transformers';

import { SITE_URL } from './src/consts';

const transformerPrompt = () => ({
	postprocess(html) {
		return html.replaceAll('$$$', '<span class="code-prompt">$</span>');
	},
});

// https://astro.build/config
export default defineConfig({
	devToolbar: { enabled: false },
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			themes: {
				dark: 'catppuccin-mocha',
				light: 'catppuccin-latte',
			},
			transformers: [
				transformerMetaHighlight(),
				transformerMetaWordHighlight(),
				transformerPrompt(),
			],
		},
		smartypants: false,
	},
	site: SITE_URL,
});
