<details>
	<summary><h2>Books</h2></summary>
	<ul>
		<li>
			<a href="https://grokkingsimplicity.com/">Grokking Simplicity</a> by Eric Normand &ndash; Techniques
			on how best to refactor existing code using the fundamentals of functional programming.
		</li>
		<li>
			<a href="https://github.com/MostlyAdequate/mostly-adequate-guide"
				>Professor Frisby's Mostly Adequate Guide to Functional Programming</a
			> by Brian Lonsdorf &ndash; Gentle intro to functional programming paradigms.
		</li>
		<li>
			<a href="https://www.manning.com/books/the-joy-of-javascript">The Joy of Javascript</a> by Luis
			Atencio &ndash; In-depth tour of some of Javascript's features.
		</li>
	</ul>
</details>

<details>
	<summary><h2>Podcasts</h2></summary>
	<ul>
		<li>
			<a href="https://corecursive.com/">Corecursive</a> &ndash; Beautifully weaved-together tales
			of code and the people behind it. Notable episodes:
			<a href="https://corecursive.com/remote-developer/">The Original Remote Developer</a>
			and
			<a href="https://corecursive.com/memento-mori-with-kate-gregory/">Memento Mori</a>.
		</li>
		<li>
			<a href="https://tunein.com/podcasts/Technology-Podcasts/Software-Unscripted-p1613049/"
				>Software Unscripted</a
			> &ndash; Conversations primarily about programming languages and the decisions that shape them.
		</li>
		<li>
			<a href="https://www.smashingsecurity.com/">Smashing Security</a> &ndash; Humorous takes on security
			incidents and privacy violations.
		</li>
		<li>
			<a href="https://www.heavybit.com/library/podcasts/to-be-continuous/">To Be Continuous</a>
			&ndash; Discussions about continuous delivery and deployment. Notable episodes:
			<a
				href="https://www.heavybit.com/library/podcasts/to-be-continuous/ep-37-the-man-behind-windows-powershell"
				>The Man Behind Windows PowerShell</a
			>.
		</li>
	</ul>
</details>

<details>
	<summary><h2>Uses</h2></summary>
	<ul>
		<li>
			<a href="https://github.com/foostan/crkbd">Corne</a> &ndash; Split ortho-linear mechanical
			keyboard. I use the the 5-column variant (3&times;5) with the
			<a href="http://colemakmods.github.io/mod-dh/">Colemak DHm layout</a>.
		</li>
		<li>
			<a href="https://github.com/lra/mackup">Mackup</a> &ndash; CLI for backing up application settings.
		</li>
		<li><a href="https://github.com/TailorDev/Watson">Watson</a> &ndash; CLI for time tracking.</li>
	</ul>
</details>

<style lang="scss">
	details {
		&:first-of-type {
			margin-block-start: 0.75em;
		}
		& + details {
			@include css-lock('margin-block-start', 'rem', 1.5, 1);
		}
		&[open] + details {
			@include css-lock('margin-block-start', 'rem', 2, 1.5);
		}
	}
	h2 {
		display: inline;
		font-size: 1.5em;
		font-style: normal;
		margin-inline-start: 0.2em;
	}
	li a:first-of-type {
		font-style: italic;
		font-weight: bold;
	}
	li + li {
		@include css-lock('margin-block-start', 'rem', 1.5, 0.75);
	}
	summary {
		@include css-lock('margin-block-end', 'rem', 1.25, 0.75);
	}
</style>
