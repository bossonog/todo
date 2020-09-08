const HtmlWebPackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.js',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    // chunkFilename: '[name].[contenthash].bundle.js',
    // path: path.resolve('build'),
    // publicPath: 'build/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      favicon: './images/favicon.ico',
    }),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
};
