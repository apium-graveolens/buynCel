const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './client'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}