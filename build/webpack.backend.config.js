const { resolve } = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const { srcRoot, distPath, port, isDev, makeBaseConfig } = require('./config');
const srcPath = resolve(srcRoot, 'backend');

const config = Object.assign(makeBaseConfig(), {
  target: 'node',
  entry: {
    backend: resolve(srcPath, 'backend'),
  },
  output: {
    filename: '[name].js',
    path: distPath,
  },
  externals: [nodeExternals()],
});

if (isDev) {
  config.plugins.push(
    new WebpackShellPlugin({ onBuildEnd:[ 'nodemon dist/backend' ] }),
    new webpack.DefinePlugin({ 'process.env.PORT': port + 1 }),
  );
}

module.exports = config;
