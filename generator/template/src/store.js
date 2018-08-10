import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create Modules object
const modules = {}

// Dynamically import and namespace Vuex modules
const req = require.context('./storeModules', true, /\.\/.+\/index\.js$/)

req.keys().forEach(key => {
  let module = req(key)
  const moduleName = key.replace(/^.+\/([^/]+)\/index\.js/, '$1')

  modules[moduleName] = {
    namespaced: true,
    ...module.default
  }
})

export default new Vuex.Store({ modules })
