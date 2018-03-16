const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      },
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
  },

  output: {
    path: path.join(__dirname, '../public')
  },

  devtool: 'eval',

  plugins: [
    new webpack.DefinePlugin({
      SPA_HOST: JSON.stringify(process.env.SPA_HOST || 'http://localhost:3000')
    }),
  ]
};
