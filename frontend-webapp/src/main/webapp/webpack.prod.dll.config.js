const CommonDllConfig = require('./webpack.dll.config')

CommonDllConfig.entry = {
  'core': ["flux-standard-action", "immutable", "isomorphic-fetch", "normalizr", "react", "react-dnd", "react-dnd-html5-backend", "react-dom", "react-intl", "react-redux", "react-resizable", "react-router", "react-tap-event-plugin", "redux", "redux-api-middleware", "redux-form", "redux-logger", "redux-thunk", "window-or-global"],
}

module.exports = CommonDllConfig
