/* eslint-disable no-var, import/no-extraneous-dependencies */
const pkg = require('./package.json');
const webpack = require('webpack');
const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const curry = require('lodash/curry');
const ifVal = (cond, val) => !!cond ? val : undefined;
const filterExists = (a) => a.filter(Boolean);

const slugs = [
  'binary-search',
  'selection-sort',
  'insertion-sort',
];

const pages = slugs.map(s => {
  return new HtmlWebpackPlugin({
    template: `${s}/index.html`,
    filename: `${s}/index.html`,
    chunks: [`${_.camelCase(s)}`],
  });
});

const entries = slugs.reduce((acc, s) => Object.assign(acc, {
  [`${_.camelCase(s)}`]: `./${s}/animation.js`,
}), {});

module.exports = (env) => {
  const ifProd = curry(ifVal)(env.prod);
  const ifDev = curry(ifVal)(env.dev);
  return {
    entry: Object.assign({
      app: './app.js',
      css: './style.css',
    }, entries),
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
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })),
      ifDev(new webpack.HotModuleReplacementPlugin()),
    ].concat(pages)),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader',
          }),
        },
        {
          test: /\.jsx?$/,
          use: ['babel-loader'],
          include: path.join(__dirname, 'src'),
        },
      ],
    },
  };
};
