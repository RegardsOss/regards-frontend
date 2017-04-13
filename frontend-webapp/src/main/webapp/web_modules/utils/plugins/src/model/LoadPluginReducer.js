/**
 * LICENSE_PLACEHOLDER
 **/
import { PLUGIN_LOADED } from './LoadPluginActions'

const mergePluginInfo = (state, { type, sourcePath, plugin, reducer, name, messages, info, ...otherProps }) => {
  const newState = Object.assign({}, state)
  newState.items[sourcePath] = {
    plugin,
    reducer,
    name,
    messages,
    info,
    ...otherProps,
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
