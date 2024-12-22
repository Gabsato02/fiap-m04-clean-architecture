const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
	const defaultConfig = singleSpaDefaults({
		orgName: 'bytebank',
		projectName: 'auth',
		webpackConfigEnv,
		argv,
	});

	return merge(defaultConfig, {
		devServer: {
			hot: false, // Desativa o HMR
		},
		externals: ["react-hook-form", "axios"],
	});
};
