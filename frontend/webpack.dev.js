const {createConfig} = require('./webpack.base')

module.exports = createConfig({
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  }, 
})
