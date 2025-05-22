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
      hot: false, // ⚠️ HMR desativado por causa de module: true
      liveReload: true,
      port: 8501,
      host: "0.0.0.0",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      watchFiles: ["src/**/*"],
      client: {
        overlay: true,
      },
    },
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
    output: {
      filename: "bytebank-dashboard.js",
      publicPath: "http://localhost:8501/",
    },
    externals: ["chart.js", "single-spa", "recoil"],
  });
};
