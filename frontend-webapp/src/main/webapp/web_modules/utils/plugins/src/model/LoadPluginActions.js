/**
 * LICENSE_PLACEHOLDER
 **/
import root from 'window-or-global'

// Load scriptjs library. This lib is used to asynchronously load new external javascript files.
let scriptjs
if (typeof root.document !== 'undefined' && typeof root.document.getElementsByTagName !== 'undefined') {
  scriptjs = require('scriptjs')
}

/**
 * Action type to define that a plugin is loaded
 * @type {string}
 * @author Sébastien Binda
 */
export const PLUGIN_LOADED = 'LOAD_PLUGINS/PLUGIN_LOADED'

export const pluginLoaded = plugin => ({
  type: PLUGIN_LOADED,
  name: plugin.info.name,
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
export const loadPlugin = (sourcePath, onErrorCallback, dispatchAction) => {
  let fullSourcePlugin = ''
  if (typeof root.document !== 'undefined') {
    if (sourcePath[0] === '/') {
      fullSourcePlugin = `${window.location.origin}${sourcePath}`
    } else {
      fullSourcePlugin = `${window.location.origin}/${sourcePath}`
    }
  }

  // Listen for pluin initialization done
  root.document.addEventListener('plugin', (event) => {
    if (fullSourcePlugin === event.detail.sourcePath) {
      const action = pluginLoaded(event.detail)
      action.sourcesPath = sourcePath
      dispatchAction(action)
    }
  })

  if (typeof root.document !== 'undefined') {
    scriptjs(fullSourcePlugin, sourcePath)
    root.window.addEventListener('error', (e, url) => {
      if (e && e.srcElement && e.srcElement.src === fullSourcePlugin) {
        console.log(e.srcElement.src, fullSourcePlugin)
        onErrorCallback(fullSourcePlugin)
      }
    }, true)
  }
}
