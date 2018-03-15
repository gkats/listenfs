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
      // External CSS. Needs to be loaded as stylesheet.
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
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
