const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "bytebank",
    projectName: "dashboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
		devServer: {
			hot: false, // Desativa o HMR
		},
		externals: ['chart.js', 'single-spa'],
	});
};
