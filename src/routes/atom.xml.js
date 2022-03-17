import { compile } from 'mdsvex';
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

const xml = async (posts) => `
<feed xml:lang="en">
  <title>${SITE_NAME}</title>
  <link href="${SITE_URL}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_URL}"/>
  <generator uri="https://kit.svelte.dev">SvelteKit</generator>
  <updated>${await getLatestUpdate()}</updated>
  <id>${SITE_URL}/atom.xml</id>
  ${await pipe(
		posts,
		toAsync,
		map(async (post) => ({ ...post, description: (await compile(post.description)).code })),
		map(xmlPost),
		join(''),
	)}
</feed>`;

const xmlPost = (post) => `
<entry xml:lang="en">
  <title>${post.seoTitle}</title>
  <published>${new Date(post.publishedAt)}</published>
  <updated>${new Date(post.updatedAt ?? post.publishedAt)}</updated>
  <link href="${SITE_URL}/${post.slug}" type="text/html"/>
  <id>${SITE_URL}/${post.slug}</id>
  <content type="html">${post.description}</content>
</entry>`;
