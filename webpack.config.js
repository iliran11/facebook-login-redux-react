var path = require('path');
var webpack = require('webpack')

module.exports = {
  entry: {
    index: [
      './index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    library: 'ReactSparklines',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: ['absolute/path/a', 'absolute/path/b']
        }
      },


      ]
    },
    {
      test: /\.(gif|png)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './asset/[hash].[ext]'
          }
        }
      ]
    }
    ],

  },
};