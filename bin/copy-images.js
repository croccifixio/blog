import fs from 'fs';
import path from 'path';

const BLOG_PATH = './src/content/blog';
const SUPPORTED_IMAGE_FORMATS = ['gif', 'jpg'];
const DESTINATION_FOLDER = './static/blog';

const isFolder = (filename) => fs.statSync(path.join(BLOG_PATH, filename)).isDirectory();

const isImageFile = (filename) =>
	SUPPORTED_IMAGE_FORMATS.some((extension) => filename.endsWith(`.${extension}`));

fs.readdirSync(BLOG_PATH)
	.filter(isFolder)
	.forEach((folder) => {
		fs.readdirSync(path.join(BLOG_PATH, folder))
			.filter(isImageFile)
			.forEach((filename) => {
				const fromFile = path.join(BLOG_PATH, folder, filename);
				const toFolder = path.join(DESTINATION_FOLDER, folder);
				const toFile = path.join(toFolder, filename);

				if (!fs.existsSync(toFolder)) {
					fs.mkdirSync(toFolder, { recursive: true });
				}
				fs.copyFileSync(fromFile, toFile);
			});
	});
