const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { srcRoot, distPath, port, makeBaseConfig } = require('./config');
const srcPath = resolve(srcRoot, 'frontend');

module.exports = Object.assign(makeBaseConfig(), {
  entry: [
    resolve(srcPath, 'hello'),
  ],
  output: {
    filename: 'app/[name].[contenthash].js',
    path: resolve(distPath, 'public'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(srcPath, 'templates', 'index.html'),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port,
    open: true,
    proxy: {
      '/api': `http://localhost:${port + 1}`,
    },
  }
});
