const {createConfig} = require('./webpack.base')

module.exports = createConfig({
  mode: 'production',
  outputFilename: 'bundle-[contenthash].js',
})
