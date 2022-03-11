<main class="blog-post">
	<slot />
</main>

<style global lang="scss">
	@mixin border-heading {
		overflow: clip;
		padding-block: 0.05em 0.2em;
		padding-right: 0.5em;
		position: relative;

		&::before {
			border-image-slice: 1;
			border-image-source: linear-gradient(30deg, $color-gold, $color-yellow);
			border-left: none;
			border-style: solid;
			border-width: 0.14em;
			bottom: 0;
			content: '';
			left: -0.2em;
			padding-right: 0.4em;
			pointer-events: none;
			position: absolute;
			top: 0;
			transform: skewX(-6.6deg);
			width: calc(100% - 0.6em);
		}
	}

	.blog-post {
		counter-reset: sections;

		h1,
		h2 {
			background: linear-gradient(30deg, $color-gold, $color-yellow);
			background-color: $color-gold;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		h2 {
			@include css-lock('font-size', 'rem', 1.45, 1.5);
			line-height: 1.1;
			margin-block: 1rem 0;
			text-transform: uppercase;

			&:not(.numbered-heading) {
				@include border-heading;
				display: inline-block;
				padding-block: 0.1em 0.2em;
			}

			&.numbered-heading {
				counter-increment: sections;

				span {
					&:empty {
						position: relative;

						&::before {
							-webkit-background-clip: text;
							background-color: $color-gold;
							content: counter(sections) '. ';
							font-size: 0.9em;
							height: auto;
							padding-top: 0.1em;
							position: absolute;
							right: 0.1em;
							top: 2px;
							transform: none;
						}
					}

					&:not(:empty) {
						@include border-heading;
					}
				}
			}
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
