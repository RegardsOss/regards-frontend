const CommonDllConfig = require('./webpack.dll.config')

CommonDllConfig.entry = {
  'core': ["chart.js", "flux-standard-action", "gsap", "immutable", "isomorphic-fetch", "lodash", "material-ui", "moment", "normalizr", "react", "react-chartjs-2", "react-dnd", "react-dnd-html5-backend", "react-dom", "react-infinite", "react-intl", "react-redux", "react-resizable", "react-router", "react-tap-event-plugin", "redux", "redux-api-middleware", "redux-form", "redux-form-material-ui", "redux-logger", "redux-thunk", "scriptjs", "window-or-global", "fixed-data-table"],
}


module.exports = CommonDllConfig
