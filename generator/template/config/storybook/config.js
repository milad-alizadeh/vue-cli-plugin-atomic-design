import { configure, addDecorator, addParameters } from '@storybook/vue'
import StoryRouter from 'storybook-vue-router'
import Vue from 'vue'
import Vuex from 'vuex'
import './style.scss'

Vue.use(Vuex)

addParameters({
  options: {
    hierarchyRootSeparator: / - /
  }
})

// Require all the .stories.js files from all components
const req = require.context('@/components', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach((filePath) => {
    const componentName = filePath.replace(/^.+\/([^/]+)\/index.stories.js/, '$1')
    const component = req(filePath)
    Vue.component(componentName, component)
    return component
  })
}

addDecorator(StoryRouter())

configure(loadStories, module)
