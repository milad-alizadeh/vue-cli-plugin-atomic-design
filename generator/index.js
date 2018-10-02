// eslint-disable-next-line no-unused-vars

module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      'serve:storybook': 'vue-cli-service serve:storybook -p 9001 -c private/storybook',
      'build:storybook': 'vue-cli-service build:storybook -c private/storybook',
    },
    devDependencies: {
      '@storybook/vue': '^4.0.0-alpha.23',
      '@storybook/addon-actions': '^4.0.0-alpha.23',
      '@storybook/addon-options': '^4.0.0-alpha.23',
      'storybook-addon-vue-info': '^0.6.1',
      'storybook-vue-router': '^1.0.1',
      'babel-polyfill': '^6.26.0'
    },
    eslintConfig: {
      env: {
        jest: true
      },
      rules: {
        'import/no-extraneous-dependencies': process.env.JEST_WORKER_ID ? 'off' : 'error'
      }
    },
    jest: {
      transform: {
        '^.+\\.svg$': '<rootDir>/private/jest/svgMock.js'
      },
      moduleNameMapper: {
        '^atoms(.*)$': '<rootDir>/src/components/atoms$1',
        '^molecules(.*)$': '<rootDir>/src/components/molecules$1',
        '^organism(.*)$': '<rootDir>/src/components/organism$1',
        '^templates(.*)$': '<rootDir>/src/components/templates$1',
        '^pages(.*)$': '<rootDir>/src/components/pages$1'
      },
      testMatch: [
        '**/src/**/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
      ]
    }
  })

  api.render('./template')
}
