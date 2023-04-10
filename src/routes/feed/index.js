import { join, map, pipe, toAsync } from '@fxts/core';
import { getLatestUpdate, getPosts } from '$lib/utils/blog';
import { SITE_NAME, SITE_URL } from '$lib/info.ts';

export async function get() {
	return {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml',
		},
		body: await pipe(getPosts(), xml),
	};
}

const selfCloseBrs = (str) => str.replace(/<br>/g, '<br />');

const selfCloseImgs = (str) => str.replace(/<img (.+?)>/g, '<img $1 />');

const setImgSrcPaths = (slug) => (str) => str.replace(/ src="/g, ` src="blog/${slug}/`);

const stripAttributes = (str) => str.replace(/<(\w+\b(?<!\bimg)) [\s\S]+?>/g, '<$1>');

const stripComments = (str) => str.replace(/<!--[\s\S]+?-->/g, '');

const stripOrphanParagraphs = (str) => str.replace(/\n<\/p>/g, '\n');

const stripSpans = (str) => str.replace(/<span[\s\S]+?>/g, '').replace(/<\/span>/g, '');

const stripStyles = (str) => str.replace(/<style[\s\S]+?<\/style>/g, '');

const xml = async (posts) => `
<feed xml:lang="en">
  <title>${SITE_NAME}</title>
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}"/>
  <generator uri="https://kit.svelte.dev">SvelteKit</generator>
  <updated>${await getLatestUpdate()}</updated>
  <id>${SITE_URL}/atom.xml</id>
  ${await pipe(posts, toAsync, map(xmlPost), join(''))}
</feed>`;

const xmlPost = (post) => `
<entry xml:lang="en">
  <title>${post.seoTitle}</title>
  <published>${new Date(post.publishedAt)}</published>
  <updated>${new Date(post.updatedAt ?? post.publishedAt)}</updated>
  <link href="${SITE_URL}/${post.slug}" type="text/html"/>
  <id>${SITE_URL}/${post.slug}</id>
  <content type="html">${pipe(
		post.body,
		stripComments,
		stripStyles,
		stripSpans,
		stripAttributes,
		stripOrphanParagraphs,
		selfCloseBrs,
		selfCloseImgs,
		setImgSrcPaths(post.slug),
	)}</content>
</entry>`;
