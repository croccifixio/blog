const ignoreWhiteSpace = (input: string): string => {
	return `${input}`
		.trim()
		.replace(/\t/g, ' ')
		.replace(/\n/g, ' ')
		.replace(/\s{2,}/g, ' ');
};

export { ignoreWhiteSpace };
