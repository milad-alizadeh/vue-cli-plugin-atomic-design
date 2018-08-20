const req = require.context('@/components', true, /\.\/[^/]+\/[^/]+\/index\.vue$/)
const components = {}

req.keys().forEach(key => {
  const name = key.replace(/^.+\/([^/]+)\/index\.vue/, '$1')
  const component = req(key).default
  components[name] = component
})

for (let name in components) {
  components[name].components = components
}

export default components
