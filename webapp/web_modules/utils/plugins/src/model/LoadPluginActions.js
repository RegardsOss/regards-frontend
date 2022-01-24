/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import root from 'window-or-global'
import get from 'lodash/get'
import isUndefined from 'lodash/isUndefined'

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
export const CHECK_PLUGIN = 'LOAD_PLUGINS/CHECK_LOADED'
export const PLUGIN_ERROR = 'LOAD_PLUGINS/PLUGIN_ERROR'

export const savePluginLoaded = ({
  sourcePath, info, ...otherProps
}, sourcePathFromDb) => ({
  type: PLUGIN_LOADED,
  name: info.name,
  info,
  sourcePath: sourcePathFromDb,
  ...otherProps,
})

export const checkPluginLoaded = (sourcePath) => ({
  type: CHECK_PLUGIN,
  sourcePath,
})

export const pluginError = (sourcePath, cause) => ({
  type: PLUGIN_ERROR,
  sourcePath,
  cause,
})

/**
 * Load a plugin with a given name and a given sourcePath
 * @param {string} sourcePath plugin source path
 * @param {function} onErrorCallback error callback, first param is attempted loading path
 * @param {function} dispatchAction Dispatch success action (can also be used as success callback, first param is action to dispatch)
 */
export const loadPlugin = (sourcePath, onErrorCallback, dispatchAction) => {
  let fullSourcePlugin = ''
  if (!isUndefined(root.document)) {
    if (sourcePath[0] === '/') {
      fullSourcePlugin = `${root.location.origin}${sourcePath}`
    } else {
      fullSourcePlugin = `${root.location.origin}/${sourcePath}`
    }
    // Add dateNow tag at the end of the plugin sourcePath to allow reload of the plugin file.
    const sourcePathPluginWithDateTag = `${fullSourcePlugin}?${Date.now()}`

    // Listen for plugin initialization done
    root.document.addEventListener('plugin', (event) => {
      // Verify that the event raised by a plugin loaded is the expected one
      if (sourcePathPluginWithDateTag === event.detail.sourcePath) {
        dispatchAction(savePluginLoaded(event.detail, sourcePath))
      }
    })
    root.document.addEventListener('error', (e, url) => {
      if (get(e, 'srcElement.src', null) === sourcePathPluginWithDateTag) {
        dispatchAction(pluginError(sourcePath, 'Error loading file. Check if your plugin file exists and is readable.'))
        onErrorCallback(fullSourcePlugin)
      }
    }, true)

    try {
      // Load file. Then when file is ready, run checkPluginLoaded. This method only check that the plugin is well instanciated.
      // Each valid plugin loaded should run the plugin event that is catch here before.
      // Then the plugin is set asd loaded in the state. If when the file is ready, the plugin is not set as loaded in the state
      // that  means that the loaded file does not fired the plugin event and is not a valid plugin.
      scriptjs(sourcePathPluginWithDateTag, sourcePath, () => dispatchAction(checkPluginLoaded(sourcePath)))
    } catch (e) {
      console.error('Error getting plugin', e)
      onErrorCallback(fullSourcePlugin)
    }
  }
}
