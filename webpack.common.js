const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 

module.exports = {
  entry: './src/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      /* style and css loader */
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({ 
      patterns: [
        {
          from: path.resolve(__dirname, 'src/scripts/sw.js'),
          to: path.resolve(__dirname, 'dist/sw.js'),
        },
        {
          from: path.resolve(__dirname, 'src/public/'), 
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
};