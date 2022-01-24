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
import isNil from 'lodash/isNil'
import {
  PLUGIN_LOADED, CHECK_PLUGIN, PLUGIN_ERROR,
} from './LoadPluginActions'

const mergePluginInfo = (state, {
  type, sourcePath, ...otherProps
}) => {
  if (isNil(sourcePath)) {
    return state
  }
  return {
    items: {
      ...state.items,
      [sourcePath]: otherProps,
    },
  }
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
  const plugin = state.items[action.sourcePath]
  switch (action.type) {
    case PLUGIN_LOADED:
      // The given plugin as been successfully initialized
      return mergePluginInfo(state, action)
    case CHECK_PLUGIN:
      if (plugin) {
        return mergePluginInfo(state, plugin)
      }
      return mergePluginInfo(state, { sourcePath: action.sourcePath, loadError: true, errorCause: 'Your file is not a valid plugin.' })
    case PLUGIN_ERROR:
      if (plugin) {
        plugin.loadError = true
        plugin.errorCause = action.cause
        return mergePluginInfo(state, plugin)
      }
      return mergePluginInfo(state, { sourcePath: action.sourcePath, loadError: true, errorCause: action.cause })
    default:
      return state
  }
}
