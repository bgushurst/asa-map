const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

// Transpiling from ES8 for browser compatibility
const babelLoader = {
  test: /\.js$/,
  include: [path.resolve(__dirname, 'src')],
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', { targets: 'defaults' }]],
    },
  },
};

// SCSS Loader
const scssLoader = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
};

// URL Loader
const urlLoader = {
  test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
  loader: 'url-loader',
};

// HTML Loader
const htmlLoader = {
  test: /\.html$/,
  loader: 'html-loader',
};

const WebpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [babelLoader, scssLoader, urlLoader, htmlLoader],
  },
};

if (process.env.NODE_ENV === 'production') {
  WebpackConfig.mode = 'production';
} else {
  WebpackConfig.mode = 'development';
  WebpackConfig.devtool = 'eval-source-map';
}

module.exports = WebpackConfig;
