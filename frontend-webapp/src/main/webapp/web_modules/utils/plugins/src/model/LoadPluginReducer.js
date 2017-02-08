/**
 * LICENSE_PLACEHOLDER
 **/
import { PLUGIN_LOADED } from './LoadPluginActions'

const mergePluginInfo = (state, action) => {
  const newState = Object.assign({}, state)
  newState[action.sourcesPath] = {
    plugin: action.plugin,
    reducer: action.reducer,
    name: action.name,
    messages: action.messages,
    info: action.info,
  }
  return newState
}

/**
 * Plugin loader reducer
 * @param state
 * @param action
 * @returns {*}
 * @author Sébastien Binda
 */
export default (state = {
  items: {},
}, action) => {
  switch (action.type) {
    case PLUGIN_LOADED:
      // The given plugin as been successfully initialized
      return mergePluginInfo(state, action)
    default:
      return state
  }
}
