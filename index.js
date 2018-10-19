const server = require('@storybook/core/server')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const wrapInitialConfig = require('./wrapInitialConfig')

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
   webpackConfig.module
     .rule('svg')
     .use('file-loader')
     .loader('vue-svg-loader')
     .tap(options => ({
       name: options.name,
       svgo: {
         plugins: [
           { removeViewBox: false },
           { removeDimensions: true }
         ]
       }
     })
   )
  })

  // Set up Storybook commands

  /**
   * This section is owed to pksunkara
   * https://github.com/pksunkara/vue-cli-plugin-storybook
   */

  const wrapDefaultConfig = config => ({
    ...config,
    module: {
      ...config.module,
      rules: config.module.rules.slice(0, -4),
    },
  })

  const defaultOptions = {
    allowedPlugins: [],
  }

  const options = Object.assign({}, defaultOptions, pluginOptions.storybook)

  api.registerCommand('serve:storybook', {
    description: 'Start storybook',
    usage: 'vue-cli-service serve:storybook',
    options: {
      '-p, --port [number]': 'Port to run Storybook (required)',
      '-h, --host [string]': 'Host to run Storybook',
      '-s, --static-dir <dir-names>': 'Directory where to load static files from',
      '-c, --config-dir [dir-name]': 'Directory where to load Storybook configurations from',
      '--https': 'Serve Storybook over HTTPS. Note: You must provide your own certificate information.',
      '--ssl-ca <ca>': 'Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)',
      '--ssl-cert <cert>': 'Provide an SSL certificate. (Required with --https)',
      '--ssl-key <key>': 'Provide an SSL key. (Required with --https)',
      '--smoke-test': 'Exit after successful start',
      '--quiet': 'Suppress verbose build output',
    },
  }, () => {
    server.buildDev({
      packageJson: {
        name: '@storybook/vue',
        version: '4.0.0-alpha.20',
      },
      wrapInitialConfig: wrapInitialConfig(api, options),
      wrapDefaultConfig,
    })
  })

  api.registerCommand('build:storybook', {
    description: 'Build storybook',
    usage: 'vue-cli-service build:storybook',
    options: {
      '-s, --static-dir <dir-names>': 'Directory where to load static files from',
      '-o, --output-dir [dir-name]': 'Directory where to store built files',
      '-c, --config-dir [dir-name]': 'Directory where to load Storybook configurations from',
      '-w, --watch': 'Enable watch mode (default: false)'
    },
  }, () => {
    server.buildStatic({
      packageJson: {
        name: '@storybook/vue',
        version: '4.0.0-alpha.20',
      },
      wrapInitialConfig: wrapInitialConfig(api, options),
      wrapDefaultConfig
    })
  })
}

module.exports.defaultModes = {
  'build:storybook': 'production',
}
