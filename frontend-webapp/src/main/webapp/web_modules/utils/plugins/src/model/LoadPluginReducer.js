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
import { PLUGIN_LOADED } from './LoadPluginActions'

const mergePluginInfo = (state, { type, sourcePath, plugin, reducer, name, messages, styles, info, ...otherProps }) => {
  const newState = Object.assign({}, state)
  newState.items[sourcePath] = {
    plugin,
    reducer,
    name,
    messages,
    styles,
    info,
    ...otherProps,
  }
  return newState
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
  switch (action.type) {
    case PLUGIN_LOADED:
      // The given plugin as been successfully initialized
      return mergePluginInfo(state, action)
    default:
      return state
  }
}
