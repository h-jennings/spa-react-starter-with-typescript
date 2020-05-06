const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const paths = require('./paths');
const common = require('./webpack.common.js');

// Convert and process SCSS files into CSS
// inject CSS into the head with source maps. (production)
const configureProductionSassLoader = () => ({
  test: /\.(scss|css)$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
        onlyLocals: false,
        importLoaders: 1,
      },
    },
    'postcss-loader',
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
        webpackImporter: true,
      },
    },
  ],
});

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    // getting an error here
    new webpack.SourceMapDevToolPlugin({
      exclude: ['/node_modules/'],
    }),
  ],
  module: {
    rules: [configureProductionSassLoader()],
  },
  // Production minimizing of JavaSvript and CSS assets.
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    // Once your build outputs multiple chunks, this option will
    // ensure they share the webpack runtime instead of having their own.
    // This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: 'single',
    // This breaks apart commonly shared deps (react, semantic ui, etc) into one shared bundle.
    // React, etc won't change as often as the app code, so this
    // chunk can be cached separately from app code.
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|lodash)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
