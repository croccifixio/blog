import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkVscode from 'gatsby-remark-vscode';
import remarkToRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
	.use(remarkParse)
	.use(remarkVscode.remarkPlugin, {
		theme: `Blackboard Pro`,
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

const highlight = async (code, language) => {
	const vfile = await processor.process(`
\`\`\`${language ?? ''}
${code}
\`\`\`
  `);

	const {
		groups: { formattedCode, styles },
	} = vfile.value.match(/(?<styles><style.+<\/style>)(?<formattedCode>.+)/s, '');

	return `{@html \`${styles}${escape(formattedCode)}\`}`;
};

export { highlight };
