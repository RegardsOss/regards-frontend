/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

    // Add dateNow tag at the end of the plugin sourcePath to allow reload of the plugin file.
    const sourcePathPluginWithDateTag = `${fullSourcePlugin}?${Date.now()}`

    // Listen for plugin initialization done
    root.document.addEventListener('plugin', (event) => {
      // Verify that the event raised by a plugin loaded is the expected one
      if (sourcePathPluginWithDateTag === event.detail.sourcePath) {
        dispatchAction(savePluginLoaded(event.detail, sourcePath))
      }
    })

    try {
      scriptjs(sourcePathPluginWithDateTag, sourcePath)
    } catch (e) {
      console.error('Error getting plugin', e)
    }
    root.document.addEventListener('error', (e, url) => {
      if (get(e, 'srcElement.src', null) === sourcePathPluginWithDateTag) {
        console.error('Error loading plugin', e.srcElement.src)
        onErrorCallback(fullSourcePlugin)
      }
    }, true)
  }
}
