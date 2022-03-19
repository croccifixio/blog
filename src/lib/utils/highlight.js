import { unified } from 'unified';
import { pipe } from '@fxts/core';
import remarkParse from 'remark-parse';
import remarkVscode from 'gatsby-remark-vscode';
import remarkToRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
	.use(remarkParse)
	.use(remarkVscode.remarkPlugin, {
		theme: {
			dark: `Blackboard Pro`,
			default: 'Light+ (default light)',
		},
		extensions: ['blackboard-pro'],
	})
	.use(remarkToRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeStringify, {
		allowDangerousHtml: true,
		closeSelfClosing: true,
	});

const escape = (str) =>
	str
		.replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
		.replace(/\\([trn])/g, '&#92;$1');

const emphasiseCode = (str) =>
	str.replace(/(_\^)(.+?)(\$_)/g, '<span class="code-emphasis">&lt;$2&gt;</span>');

const applyCodePrompt = (str) =>
	str.replace(/\${2}(\S{1,}\s)/g, '<span class="code-prompt">$1</span>');

const highlight = async (code, language) => {
	const vfile = await processor.process(`
\`\`\`${language ?? ''}
${code}
\`\`\`
  `);

	const {
		groups: { formattedCode, styles },
	} = vfile.value.match(/(?<styles><style.+<\/style>)(?<formattedCode>.+)/s, '');

	return `{@html \`${styles}${pipe(formattedCode, escape, applyCodePrompt, emphasiseCode)}\`}`;
};

export { highlight };
