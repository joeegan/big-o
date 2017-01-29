/* eslint-disable no-var, import/no-extraneous-dependencies */
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      binarySearch: './binary-search/animation.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[name].[hash].js',
    },
    resolve: {
      extensions: ['.js'],
    },
    context: path.resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval-source-map',
    bail: env.prod,
    plugins: filterExists([
      new HtmlWebpackPlugin({
        template: 'index.html',
        chunks: ['app'],
      }),
      new HtmlWebpackPlugin({
        template: 'binary-search/index.html',
        filename: 'binary-search/index.html',
        chunks: ['binarySearch'],
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV),
        },
        VERSION: JSON.stringify(pkg.version),
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
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { root: '.' }
            }
          ]
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel-loader'],
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
          loader: 'file-loader?name=[name].[ext]',
        },
      ],
    },
  };
};
