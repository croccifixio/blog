const ignoreWhiteSpace = (input: string): string => {
	return `${input}`.trim().replace(/\t/g, ' ').replace(/\n/g, ' ');
};

export { ignoreWhiteSpace };
