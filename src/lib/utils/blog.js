import { compile } from 'mdsvex';
import {
	entries,
	find,
	last,
	map,
	pipe,
	reverse,
	sortBy,
	split,
	take,
	toArray,
	toAsync,
} from '@fxts/core';

export const getPosts = () =>
	pipe(
		import.meta.globEager(`/src/content/blog/**/*.svx`),
		entries,
		sortBy(([, post]) => post.metadata.publishedAt),
		reverse,
		toAsync,
		map(async ([path, post]) => ({
			...post.metadata,
			body: (await compile(post.default.render().html)).code,
			slug: pipe(path, split('/'), reverse, take(2), last),
		})),
		toArray,
	);

export const getPost = async (slug) =>
	pipe(
		getPosts(),
		find((post) => slug === post.slug),
	);
