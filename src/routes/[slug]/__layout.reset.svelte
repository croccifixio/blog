<script lang="ts">
	import '$lib/styles/index.scss';
</script>

<main class="blog-post">
	<slot />
</main>

<style global lang="scss">
	.blog-post {
		counter-reset: sections;

		h2 {
			@include css-lock('font-size', 'rem', 1.35, 1.8);
			line-height: 1.1;
			margin-block: 1rem 0.75rem;
			text-transform: uppercase;
		}

		h3 {
			line-height: 1.5;
			margin-block: 2.75rem -0.75rem;
		}

		img {
			display: block;
			margin: 3rem auto;
			max-width: 100%;
		}

		ol {
			list-style: none;
		}

		ol,
		ul {
			margin-block: 2rem;
		}

		> li:first-child {
			> h3:first-child {
				margin-top: 0;
			}
		}

		time {
			display: block;
			text-align: center;
		}

		@media screen and (min-width: 600px) {
			ol,
			ul {
				padding-left: 2ch;
			}
		}
	}
</style>
