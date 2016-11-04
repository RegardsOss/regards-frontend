const pluginRoutes = {
  path: 'plugins/:plugin',

  getComponent(nextState, cb) {
    const Plugin = require('./Plugin')
    require.ensure([], () => {
      cb(null, {
        content: Plugin.default,
      })
    })
  },
}

export default pluginRoutes
