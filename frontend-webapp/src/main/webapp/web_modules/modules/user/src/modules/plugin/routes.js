import Plugin from './Plugin'
import { PlainRoute } from 'react-router'

export const pluginRoutes = {
  path: 'plugins/:plugin',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        content: Plugin,
      })
    })
  },
}
