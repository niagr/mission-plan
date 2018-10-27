/* global require module __dirname */

const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function createConfig (options={}) {

  const {
    outputFilename = 'bundle.js',
    ...merge  // extra top-level keys to merge into the config
  } = options

  return {
    entry: ['./src/index.tsx'],
    output: {
      filename: outputFilename,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      modules: [path.join(__dirname,  'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$|\.jsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            'style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new webpack.EnvironmentPlugin({
        API_URL: 'http://localhost:8000',
      }),
      // new BundleAnalyzerPlugin(),
    ],
    ...merge
  }
}

module.exports = {
  createConfig: createConfig,
}
