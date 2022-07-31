import { compile } from 'mdsvex';
import {
	entries,
	filter,
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

const getPosts = () =>
	pipe(
		import.meta.globEager(`/src/content/blog/**/*.svx`),
		entries,
		filter(([, post]) => post.metadata.publishedAt),
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

const getPost = async (slug) =>
	pipe(
		getPosts(),
		find((post) => slug === post.slug),
	);

const getLatestUpdate = () =>
	pipe(
		getPosts(),
		sortBy((post) => post.updatedAt ?? post.publishedAt),
		last,
		(post) => post.updatedAt ?? post.publishedAt,
	);

export { getLatestUpdate, getPost, getPosts };
