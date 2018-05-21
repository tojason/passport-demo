'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const copy = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {

  entry: {
    app: [APP_DIR + '/index.jsx'],
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom']
  },

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: './public/',
  },

  context: path.join(__dirname, 'src'),

  module : {
    rules: [
      {
        test : /\.jsx?/,
        exclude : [/node_modules/, /bower_components/],
        include : APP_DIR,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.scss$/,
        // the order of the following loaders is important
        loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        // the order of the following loaders is important
        loaders: ['style-loader', 'css-loader?-url', 'postcss-loader']
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          enforce: true,
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },

  plugins: [
    new copy([
      {from: APP_DIR + '/html/', to: BUILD_DIR},
      {from: APP_DIR + '/assets/', to: BUILD_DIR + '/assets/'}
    ], {
      copyUnmodified: false,
      debug: 'debug'
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    //   filename: 'vendor.bundle.js'
    // })
  ]

};

module.exports = config;
