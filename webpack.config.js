const path = require('path');
const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
const outputDir = path.resolve(__dirname, 'public');

module.exports = {
  entry: [entryFile],
  output: {
    filename: "bundle.js",
    path: outputDir
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //     },
      //     {
      //       loader: 'sass-loader'
      //     }
      //   ]
      // }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty' 
  },
};
