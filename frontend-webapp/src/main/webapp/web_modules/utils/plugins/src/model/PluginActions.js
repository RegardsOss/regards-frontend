/**
 * LICENSE_PLACEHOLDER
 **/

// Load scriptjs library. This lib is used to asynchronously load new external javascript files.
let scriptjs
if (typeof document !== 'undefined') {
  scriptjs = require('scriptjs')
}

/**
 * Action type to define that a plugin is loaded
 * @type {string}
 */
export const PLUGIN_LOADED = 'PLUGIN_LOADED'

export const pluginLoaded = plugin => ({
  type: PLUGIN_LOADED,
  name: plugin.name,
  plugin: plugin.plugin,
  reducer: plugin.reducer,
  messages: plugin.messages,
  info: plugin.info,
})

/**
 * Load a plugin with a given name and a given sourcepath
 * @param pluginName
 * @param sourcePath
 * @param dispatchAction
 */
export const loadPlugin = (pluginName, sourcePath, dispatchAction) => {
  // Listen for pluin initialization done
  document.addEventListener('plugin', (event) => {
    const action = pluginLoaded(event.detail)
    dispatchAction(action)
  })

  if (typeof document !== 'undefined') {
    scriptjs([`${window.location.origin}/plugins/${sourcePath}`], pluginName)
  }
}
