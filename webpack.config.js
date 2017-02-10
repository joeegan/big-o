/* eslint-disable no-var, import/no-extraneous-dependencies */
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const curry = require('lodash/curry');
const ifVal = (cond, val) => !!cond ? val : undefined;
const filterExists = (a) => a.filter(Boolean);

module.exports = (env) => {
  const ifProd = curry(ifVal)(env.prod);
  const ifDev = curry(ifVal)(env.dev);
  const NODE_ENV = env.prod ? 'production' : 'development';
  return {
    entry: {
      app: './app.js',
      css: './style.css',
      binarySearch: './binary-search/animation.js',
      selectionSort: './selection-sort/animation.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[name].[hash].js',
      pathinfo: !env.prod,
    },
    resolve: {
      extensions: ['.js'],
    },
    context: path.resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval-source-map',
    bail: env.prod,
    devServer: {
      quiet: false,
      colors: true,
      inline: true,
    },
    plugins: filterExists([
      new ExtractTextPlugin('bundle.[hash].css'),
      new HtmlWebpackPlugin({
        template: 'index.html',
        chunks: ['app'],
      }),
      new HtmlWebpackPlugin({
        template: 'binary-search/index.html',
        filename: 'binary-search/index.html',
        chunks: ['binarySearch'],
      }),
      new HtmlWebpackPlugin({
        template: 'selection-sort/index.html',
        filename: 'selection-sort/index.html',
        chunks: ['selectionSort'],
      }),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })),
      ifDev(new webpack.HotModuleReplacementPlugin()),
    ]),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            loader: 'css-loader',
          }),
        },
        {
          test: /\.jsx?$/,
          use: ['babel-loader'],
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
          use: 'file-loader?name=[name].[ext]',
        },
      ],
    },
  };
};
