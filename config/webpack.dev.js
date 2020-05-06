const webpack = require('webpack');
const merge = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');

// Convert and process SCSS files into CSS
// inject CSS into the head with source maps.
const configureSassLoader = () => ({
  test: /\.(scss|css)$/i,
  use: [
    'style-loader',
    'css-modules-typescript-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
        onlyLocals: false,
        sourceMap: true,
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'resolve-url-loader',
      options: {
        sourceMap: true,
        debug: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        webpackImporter: true,
      },
    },
  ],
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [configureSassLoader()],
  },
  plugins: [
    // Only update what has changed
    new webpack.HotModuleReplacementPlugin(),
  ],
});
