const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const buildDir = 'build';
const sourceDir = 'src';
const stylesDir = `${sourceDir}/styles`;

const config = {
  mode: process.env.NODE_ENV || 'development',
  devtool: false,
  entry: {
    app: [`./${sourceDir}/components/main.jsx`],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, buildDir),
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sassOptions: {
              includePaths: [path.resolve(__dirname, stylesDir)],
            },
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', {
              useBuiltIns: 'usage',
              corejs: 3,
              debug: true,
            }], '@babel/react'],
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, sourceDir), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, sourceDir),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'js starter',
      favicon: `./${sourceDir}/images/favicon.ico`,
      template: `./${sourceDir}/index.ejs`,
    }),
    new MiniCssExtractPlugin({
      filename: `styles.bundle${devMode ? '' : '.[contenthash]'}.css`,
    }),
  ],
};

if (devMode) {
  config.plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
  }));
}

module.exports = config;
