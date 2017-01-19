/**
 * LICENSE_PLACEHOLDER
 **/
import { PLUGIN_LOADED } from './PluginActions'

/**
 * Plugin loader reducer
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {
  items: {},
}, action) => {
  let newItems = []
  switch (action.type) {
    case PLUGIN_LOADED:
      // The given plugin as been successfully initialized
      newItems = Object.assign({}, state.items)
      newItems[action.name] = {
        plugin: action.plugin,
        name: action.name,
        messages: action.messages,
        info: action.info,
      }
      return newItems
    default:
      return state
  }
}
