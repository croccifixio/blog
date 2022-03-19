import watchMedia from 'svelte-media';

const mediaQueries = {
	dark: '(prefers-color-scheme: dark)',
};

export const media = watchMedia(mediaQueries);
