/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import { getReducerRegistry, configureReducers } from '@regardsoss/store'

/**
 * Contains tools around plugins reducers
 * @author Raphaël Mechali
 */

/**
 * Initializes plugin reducers
 * @param {*} plugin plugin instance as defined in UIPluginInstanceContent
 */
function initializePluginReducer(plugin, pluginInstanceId) {
  // install plugin instance reducer for plugin name and instance ID using exported
  // build plugin reducer on plugin name and instance ID to ensure each plugin has its own Redux store path
  // (therefore, plugins export a reducer builder function)
  const instanceReducers = plugin.getReducer(pluginInstanceId)
  if (!isEmpty(instanceReducers)) {
    // there are reducers for that plugin, install them if nor already done
    const loadedPluginReducer = {
      [`plugins.${plugin.name}.${pluginInstanceId}`]: configureReducers(instanceReducers),
    }
    // register instance if not already defined
    if (!getReducerRegistry().isRegistered(loadedPluginReducer)) {
      getReducerRegistry().register(loadedPluginReducer)
    }
  }
}

module.exports = {
  initializePluginReducer,
}
