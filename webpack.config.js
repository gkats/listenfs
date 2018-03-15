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
  devtool: 'eval',

  plugins: [
    new webpack.EnvironmentPlugin(['ROOT_PATH']),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true
  }
};
