'use strict';

const webpack = require('webpack');
const { vendor, entries, pages } = require('./pages');
const {
  context,
  fonts
} = require('./paths');

const entry = Object.assign({
  vindex: ['jquery', 'dom4'],
  vcontacts: ['dom4']
}, entries);

module.exports = {
  context,
  entry,
  module: {
    rules: [
      {
        test: /\.pug/,
        include: context,
        exclude: [/node_modules/],
        use: ['pug-loader']
      },
      {
        test: /\.js?$/,
        include: context,
        exclude: [/node_modules/],
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.(eot|ttf|otf|svg|woff2?)(\?.*)?$/,
        include: fonts,
        exclude: [/node_modules/],
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    ...pages,
    ...vendor,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    modules: [
      context,
      'node_modules'
    ],
    extensions: ['.js', '.json']
  }
};
