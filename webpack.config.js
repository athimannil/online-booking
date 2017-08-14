const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const bootstrapEntryPoints = require('./webpack.bootstrap.config');

const extractPlugin = new ExtractTextPlugin({
  filename: '[name].css'
});
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  // entry: [SRC_DIR + "/index.js"],
  entry: [SRC_DIR + "/index.js",bootstrapEntryPoints.dev],
  output: {
    path: DIST_DIR,
    filename: "bundle.js"
    // publicPath: "/app/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query:{
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: ['last 2 version']
                  }),
                  require('postcss-flexbugs-fixes')(),
                  require('css-mqpacker')
                ]
              }
            },
            {
              loader: 'sass-loader',
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpeg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // outputPath: 'img/',
              publicPath: 'img/'
            }
          }
        ]
      },
      // { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(woff2?|svg)$/, use: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      // { test: /\.(ttf|eot)$/, loader: 'file-loader' },
      { test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]' },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ],
        exclude: path.resolve(__dirname, 'src/index.html')
      }
    ]
  },
  plugins:[
    extractPlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};

module.exports = config;
