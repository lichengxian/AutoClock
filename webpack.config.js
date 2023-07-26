const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production", // 生产模式
  target: "node", // 编译环境为Node
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "index.js",
    assetModuleFilename: "./[name][ext]",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // 不打包第三方库，并以commonjs2方式引入第三方库
  externals: {
    axios: "commonjs2 axios",
    puppeteer: "commonjs2 puppeteer",
    yamljs: "commonjs2 yamljs",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.yaml$/,
            type: "asset/resource",
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{ loader: "babel-loader" }],
          },
          // {
          //   test: /\.ts$/,
          //   exclude: /node_modules/,
          //   use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
          // },
        ],
      },
    ],
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })], // 关闭打包输出注释文件
  },
};
