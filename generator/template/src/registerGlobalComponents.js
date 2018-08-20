import Vue from 'vue'
const req = require.context('./components', true, /\.\/[^/]+\/[^/]+\/index\.vue$/)

req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.vue/, '$1')
  const component = req(key).default
  Vue.component(componentName, component)
})
