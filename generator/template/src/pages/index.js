const req = require.context('.', false, /^((?!index).)*\.js$/)
const containers = {}

req.keys().forEach(key => {
  const containerName = key.replace(/^\.\/([^.]+)\.js$/, '$1')
  containers[containerName] = req(key).default
})

export default containers
