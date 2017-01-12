/**
 * LICENSE_PLACEHOLDER
 **/
import { concat } from 'lodash'
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
  switch (action.type) {
     // The given plugin as been successfully initialized
    case PLUGIN_LOADED:
      const newItems = Object.assign({}, state.items)
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
