const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

// Processing TS files
const configureTSLoader = () => ({
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  loader: 'ts-loader',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
  },
});

// Copy image files to build folder and compresses them
const configureImageLoader = () => ({
  test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        context: 'src', // prevent display of src/ in filename
        outputPath: 'assets/',
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
        mozjpeg: {
          progressive: true,
          arithmetic: false,
        },
        optipng: {
          optimizationLevel: 5,
        },
        pngquant: {
          enabled: false,
        },
        gifsicle: {
          enabled: false,
        },
      },
    },
  ],
});

const configureFontLoader = () => ({
  test: /\.(ttf|eot|woff2?)$/i,
  loader: 'url-loader',
  options: {
    limit: 8192,
    outputPath: 'assets/',
    name: '[path][name].[ext]',
    context: 'src', // prevent display of src/ in filename
  },
});

module.exports = {
  entry: [`${paths.src}/index.tsx`],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': paths.src,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: 'assets',
        ignore: ['*.DS_Store', 'favicon.ico', 'template.html'],
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'SPA React Starter with Typescript',
      favicon: `${paths.static}/favicon.png`,
      template: `${paths.static}/template.html`,
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [configureTSLoader(), configureImageLoader(), configureFontLoader()],
  },
};
