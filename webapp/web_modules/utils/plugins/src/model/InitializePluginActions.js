/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
  * Actions to initialize plugins by their IDs: it provides information for reducer to store a list of initialized plugins by their IDs
  * @author Raphaël Mechali
  */
export class InitializePluginActions {
  static MARK_INITIALIZED = 'INITIALIZE_PLUGINS/MARK_INITIALIZED'

  static MARK_UNLOADED = 'INITIALIZE_PLUGINS/MARK_UNLOADED'

  /**
   * Marks a plugin initialized
   * @param {string} pluginInstanceId plugin instance ID
   * @return {{type: string, pluginInstanceId: string}} redux action to dispatch
   */
  static markInitialized(pluginInstanceId) {
    return {
      type: InitializePluginActions.MARK_INITIALIZED,
      pluginInstanceId,
    }
  }

  /**
   * Marks a plugin unloaded
   * @param {string} pluginInstanceId plugin instance ID
   * @return {{type: string, pluginInstanceId: string}} redux action to dispatch
   */
  static markUnloaded(pluginInstanceId) {
    return {
      type: InitializePluginActions.MARK_UNLOADED,
      pluginInstanceId,
    }
  }
}

export default new InitializePluginActions()
