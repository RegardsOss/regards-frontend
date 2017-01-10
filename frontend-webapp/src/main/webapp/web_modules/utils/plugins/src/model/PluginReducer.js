import { concat } from 'lodash'
import { PLUGIN_LOADED } from './PluginActions'
export default (state = {
  items: [],
}, action) => {
  switch (action.type) {
     // The given plugin as been successfully initialized
    case PLUGIN_LOADED:
      const plugin = {
        plugin: action.plugin,
        name: action.name,
      }
      return {
        items: state.items ? concat(state.items, [plugin]) : [plugin],
      }
    default:
      return state
  }
}
