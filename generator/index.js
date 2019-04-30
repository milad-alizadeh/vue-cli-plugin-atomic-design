// eslint-disable-next-line no-unused-vars

module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    devDependencies: {
      'storybook-addon-vue-info': '1.1.1',
      'storybook-vue-router': '1.0.3'
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
