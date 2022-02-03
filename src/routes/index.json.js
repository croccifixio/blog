import { getPosts } from '$lib/utils/blog';

export async function get() {
	const posts = await getPosts();

	return { body: { posts } };
}
