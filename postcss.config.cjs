module.exports = {
	plugins: [
		require('postcss-utopia')({
			minWidth: 360,
			maxWidth: 1416,
		}),
	],
};
