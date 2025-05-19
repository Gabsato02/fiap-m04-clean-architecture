const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "bytebank",
    projectName: "notfound",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      hot: false, // ⚠️ Desativar HMR por causa de ESM
      liveReload: true, // ✅ Isso funciona bem
      port: 8502,
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
      filename: "bytebank-notfound.js",
      publicPath: "http://localhost:8502/",
    },
    externals: ["react-hook-form", "axios", "single-spa"],
  });
};
