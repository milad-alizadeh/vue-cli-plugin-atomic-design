// eslint-disable-next-line no-unused-vars

module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      'serve:storybook': 'vue-cli-service serve:storybook -p 8001 -c private/storybook',
      'build:storybook': 'vue-cli-service build:storybook -c private/storybook && node ./build-scripts/fix-static-storybook.js',
    },
    devDependencies: {
      '@storybook/vue': '^5.0.10',
      '@storybook/addon-actions': '^5.0.10',
      '@storybook/addon-options': '^5.0.10',
      '@storybook/addon-info': '^5.0.10',
      'storybook-vue-router': '^1.0.3',
      'jest-image-snapshot': '^2.8.1',
      'puppeteer': '^1.14.0',
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
      globals: {
        PATH: 'http://localhost:8080'
      },
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
