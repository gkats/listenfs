const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const publicPath = path.join(__dirname, '../public');
const outputPath = path.join(publicPath, 'assets');

module.exports = {
  module: {
    rules: [
      // Javascript files
      {
        test: /\.js$/,
        include: srcPath,
        loader: 'babel-loader'
      }
    ]
  },

  output: {
    path: outputPath,
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      SPA_HOST: JSON.stringify(process.env.SPA_HOST || 'http://localhost:3000')
    }),
    new CleanWebpackPlugin([outputPath], {
      root: publicPath,
      verbose: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join(publicPath, 'index.html'),
      template: path.join(srcPath, 'index.ejs')
    })
  ]
};
