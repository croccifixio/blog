import { getPost } from '$lib/utils/blog';

export async function get({ params }) {
	const post = await getPost(params.slug);
	if (post) {
		return {
			body: { post },
		};
	}
}
