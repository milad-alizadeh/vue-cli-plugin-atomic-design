import Vue from 'vue'
const req = require.context('.', true, /\.\/[^/]+\/[^/]+\/index\.vue$/)

req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.vue/, '$1')
  Vue.component(componentName, req(key).default)
})
