const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/App.jsx'],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
};
