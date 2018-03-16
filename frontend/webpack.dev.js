const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  devtool: 'eval',

  module: {
    rules: [
      // CSS modules stylesheets
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        exclude: /reset\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      },
      // External CSS. Needs to be loaded as stylesheet.
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: /reset\.css/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }
        ]
      }
    ]
  }
});