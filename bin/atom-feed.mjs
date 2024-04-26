import { pipe } from '@fxts/core';
import fs from 'fs/promises';
import path from 'path';

const SOURCE_FOLDER = path.normalize('./dist/atom.xml');
const SOURCE_FILE = path.join(SOURCE_FOLDER, 'index.html');
const TARGET_FILE = path.normalize('./dist/atom.xml');

const setDocType = (str) =>
	str.replace('<!DOCTYPE html>', '<?xml version="1.0" encoding="utf-8"?>');
const stripStyles = (str) => str.replace(/<style[\s\S]+?<\/style>/g, '');
const stripSpans = (str) => str.replace(/<span[\s\S]+?>/g, '').replace(/<\/span>/g, '');
const stripAttributes = (str) =>
	str.replace(/<(pre) [\s\S]+?>/g, '<$1>').replace(/ data-astro-cid-[a-z0-9]+/g, '');
const selfCloseTags = (str) => str.replace(/<(img|link) (.+?)>/g, '<$1 $2/>');
const setImgSrcPaths = (str) =>
	str
		.split('<link href="https://odongo.pl')
		.map((substr) => {
			const uri = substr.match(/^(\/blog\/[a-z\-]+?)"/)?.at(1);

			if (!uri) return substr;
			return substr.replace(/\/atom.xml\/\//g, `https://odongo.pl${uri}/`);
		})
		.join('<link href="https://odongo.pl');
const unescapeCharacters = (str) => str.replaceAll('&rarr;', '→').replaceAll('&nbsp;', ' ');
const wrapContent = (str) =>
	str
		.replaceAll(
			'<content type="xhtml">',
			'<content type="xhtml"><div xmlns="http://www.w3.org/1999/xhtml">',
		)
		.replaceAll('</content>', '</div></content>');

const content = await fs.readFile(SOURCE_FILE, 'utf8');

await fs.rm(SOURCE_FOLDER, { force: true, recursive: true });

await fs.writeFile(
	TARGET_FILE,
	pipe(
		content,
		setDocType,
		stripStyles,
		stripSpans,
		stripAttributes,
		selfCloseTags,
		setImgSrcPaths,
		unescapeCharacters,
		wrapContent,
	),
);
