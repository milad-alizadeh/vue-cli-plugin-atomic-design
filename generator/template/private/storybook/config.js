import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import Vue from 'vue'
import Vuex from 'vuex'
import './style.scss'

Vue.use(Vuex)

setOptions({
  hierarchyRootSeparator: / - /,
  name: 'Vue Atomic Design',
  url: '#'
})

// Require all the .stories.js files from all components
const req = require.context('components', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach((filePath) => {
    const componentName = filePath.replace(/^.+\/([^/]+)\/index.stories.js/, '$1')
    const component = req(filePath)
    Vue.component(componentName, component)
    return component
  })
}

configure(loadStories, module)
