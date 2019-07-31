const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

// eslint-disable-next-line no-unused-vars
module.exports = (api, { pluginOptions = {} }) => {
  api.chainWebpack(webpackConfig => {
    // Create Aliases
    let aliases = {
      atoms: path.resolve(__dirname, '../../src/components/atoms/'),
      molecules: path.resolve(__dirname, '../../src/components/molecules/'),
      organisms: path.resolve(__dirname, '../../src/components/organisms/'),
      templates: path.resolve(__dirname, '../../src/components/templates/'),
      pages: path.resolve(__dirname, '../../src/components/pages/'),
      store: path.resolve(__dirname, '../../src/store/'),
      vue$: require.resolve('vue/dist/vue.esm.js')
    }

    for(let key in aliases) {
      webpackConfig.resolve.alias.set(key, aliases[key])
    }

    // Change SVG loader from file to inline SVG
    const svgRule = webpackConfig.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('raw-loader')
      .loader('raw-loader')
  })
}
