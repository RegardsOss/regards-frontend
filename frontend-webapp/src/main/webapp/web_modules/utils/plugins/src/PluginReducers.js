import { REQUEST_PLUGINS, RECEIVE_PLUGINS, FAILED_PLUGINS, PLUGIN_INITIALIZED } from './PluginsActions'
import { PluginsStore } from '@regardsoss/plugins'

export default (state = {
  isFetching: false,
  items: [],
  lastUpdate: '',
}, action) => {
  switch (action.type) {
    // Running fetch plugins from server
    case REQUEST_PLUGINS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    // Plugins received from server
    case RECEIVE_PLUGINS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        lastUpdate: action.meta.receivedAt,
      })
    // Error during plugins fetch from server
    case FAILED_PLUGINS:
      return Object.assign({}, state, {
        isFetching: false,
      })
    // The given plugin as been successfully initialized
    case PLUGIN_INITIALIZED:
      const result = Object.assign({}, state)
      result.items = result.items.map((plugin) => {
        // Search for the plugin whish has been initialized
        if (plugin.name === action.name) {
          // Add the loaded react component
          return Object.assign({}, plugin, {
            loadedComponent: action.loadedComponent,
          })
        } else {
          return Object.assign({}, plugin)
        }
      })
      return result
    default:
      return state
  }
}
