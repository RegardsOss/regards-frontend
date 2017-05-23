/**
 * LICENSE_PLACEHOLDER
 **/
import root from 'window-or-global'
import { has, isUndefined } from 'lodash'
// Load scriptjs library. This lib is used to asynchronously load new external javascript files.
let scriptjs
if (!isUndefined(root.document) && !isUndefined(root.document.getElementsByTagName)) {
  scriptjs = require('scriptjs')
}

/**
 * Action type to define that a plugin is loaded
 * @type {string}
 * @author Sébastien Binda
 */
export const PLUGIN_LOADED = 'LOAD_PLUGINS/PLUGIN_LOADED'

export const savePluginLoaded = ({ sourcePath, info, plugin, reducer, messages, ...otherProps }, sourcePathFromDb) => ({
  type: PLUGIN_LOADED,
  name: info.name,
  plugin,
  reducer,
  messages,
  info,
  sourcePath: sourcePathFromDb,
  ...otherProps,
})


/**
 * Load a plugin with a given name and a given sourcePath
 * @param pluginName
 * @param sourcePath
 * @param dispatchAction
 */
export const loadPlugin = (sourcePath, onErrorCallback, dispatchAction) => {
  let fullSourcePlugin = ''
  if (!isUndefined(root.document)) {
    if (sourcePath[0] === '/') {
      fullSourcePlugin = `${root.location.origin}${sourcePath}`
    } else {
      fullSourcePlugin = `${root.location.origin}/${sourcePath}`
    }

    // Listen for plugin initialization done
    root.document.addEventListener('plugin', (event) => {
      // Verify that the event raised by a plugin loaded is the expected one
      if (fullSourcePlugin === event.detail.sourcePath) {
        dispatchAction(savePluginLoaded(event.detail, sourcePath))
      }
    })

    scriptjs(fullSourcePlugin, sourcePath)
    root.document.addEventListener('error', (e, url) => {
      if (has(e, 'srcElement.src') && e.srcElement.src === fullSourcePlugin) {
        onErrorCallback(fullSourcePlugin)
      }
    }, true)
  }
}
