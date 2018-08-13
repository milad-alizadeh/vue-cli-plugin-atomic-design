module.exports = new Proxy({}, {
  get: () => {
    return {
      name: 'mocked',
      tempalte: '<span></span>'
    }
  }
})
