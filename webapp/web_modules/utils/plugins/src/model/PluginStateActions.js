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

/**
 * Criterion plugin state management actions
 * @author Raphaël Mechali
 */
export default class PluginStateActions {
  /**
   * Namespace: actions namespace
   * @param {string} namespace namespace
   */
  constructor(namespace) {
    this.PUBLISH_ALL_STATES = `${namespace}/PUBLISH_ALL_STATES`
    this.PUBLISH_STATE = `${namespace}/PUBLISH_STATE`
    this.CLEAR_ALL = `${namespace}/CLEAR_ALL`
  }

  /**
   * Returns action to dispatch to publish all plugins state at once. Note: it replaces all currently defined plugins states
   * @param {*} pluginsStates plugins states (object like { pluginsInstanceId: {state, queryParameters}, ...})
   * @return {*} redux action to dispatch
   */
  publishAllStates(pluginsStates) {
    return {
      type: this.PUBLISH_ALL_STATES,
      pluginsStates,
    }
  }

  /**
   * Publish new state and query for given criterion plugin
   * @param {string} pluginInstanceId criterion plugin instance ID
   * @param {*} state new state
   * @param {*} queryParameters query parameters to be used for searching data. Note that q parameter will be merged
   * with AND separator, while other parameters will be append multiple times
   * @return {*} redux action to dispatch
   */
  publishState(pluginInstanceId, state, queryParameters) {
    return {
      type: this.PUBLISH_STATE,
      pluginInstanceId,
      state,
      queryParameters,
    }
  }

  /**
   * @return {*} redux action to dispatch to clear all plugins current state
   */
  clearAllStates() {
    return {
      type: this.CLEAR_ALL,
    }
  }
}
