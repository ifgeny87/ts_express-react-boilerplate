const { resolve } = require('path');

const mode = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const isProd = mode === 'production';
const isDev = !isProd;

function makeBaseConfig() {
  return {
    mode,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [],
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    },
  };
}

module.exports = {
  srcRoot: resolve(__dirname, '..', 'src'),
  distPath: resolve(__dirname, '..', 'dist'),
  mode,
  isDev,
  isProd,
  port,
  makeBaseConfig,
};
