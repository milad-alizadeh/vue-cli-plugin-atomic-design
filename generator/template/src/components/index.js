const req = require.context('.', true, /\.\/[^/]+\/[^/]+\/index\.vue$/)
const components = {}

req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.vue/, '$1')
  components[componentName] = req(key).default
})

export default components
