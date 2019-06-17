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
import get from 'lodash/get'
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Plugin state selectors
 * @author Raphaël Mechali
 */
export class PluginStateSelectors extends BasicSelector {
  static REQUEST_PARAMETERS_FIELD = 'requestParameters'

  static STATE_FIELD = 'state'

  /**
   * @param {*} store redux store
   * @return {*} all known criteria data, as map of pluginInstanceId keys
   */
  getAllCriteriaData(store) {
    return this.uncombineStore(store)
  }

  /**
   * @param {*} store redux store
   * @param {string} pluginInstanceId plugin instance Id key
   * @return {{state:{*}, requestParameters: {*}}} found plugin instance ID state or null
   */
  getCriterionData(store, pluginInstanceId) {
    return get(this.getAllCriteriaData(store), pluginInstanceId, null)
  }

  /**
   * @param {*} store redux store
   * @param {string} pluginInstanceId plugin instance Id key
   * @return {*} criterion state
   */
  getCriterionState(store, pluginInstanceId) {
    return get(this.getCriterionData(store, pluginInstanceId), PluginStateSelectors.STATE_FIELD, null)
  }

  /**
   * @param {*} store redux store
   * @param {string} pluginInstanceId plugin instance Id key
   * @return {*} request parameters
   */
  getCriterionRequestParameters(store, pluginInstanceId) {
    return get(this.getCriterionData(store, pluginInstanceId), PluginStateSelectors.REQUEST_PARAMETERS_FIELD, null)
  }
}

/**
 * Selectors builder
 * @param {*} storePath store path
 * @return {PluginStateSelectors} selectors instance
 */
export function getPluginStateSelectors(storePath) {
  return new PluginStateSelectors(storePath)
}
