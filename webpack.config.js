const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackInjector = require("html-webpack-injector");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = () => ({
  context: path.resolve(__dirname, "src"),
  entry: {
    index: "./index.js",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve("build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "fonts" },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "images" },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                plugins: ["@babel/plugin-proposal-class-properties"],
              },
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackInjector(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    open: true,
  },
});
