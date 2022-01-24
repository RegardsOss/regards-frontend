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

import find from 'lodash/find'
import { createSelector } from 'reselect'
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Common action to be extended by all plugins list action: provides reselect on businessId
 * @author Raphaël Mechali
 */
export class PluginListSelectors extends BasicListSelectors {
  /**
   * Lazy map of selector by business ID
   */
  businessIdSelector = {}

  /**
   * builds or retrieve reselector for business ID as parameter
   * @param {string} businessId -
   * @return {Function} business ID reselector
   */
  getByBusinessIdReselector(businessId) {
    const existingReselector = this.businessIdSelector[businessId]
    if (existingReselector) {
      // re-use known selector
      return existingReselector
    }
    // Unexisting selector: create it
    const newReselector = createSelector(
      [this.getList],
      (results) => find(results, (r) => r.content.businessId === businessId))
    this.businessIdSelector[businessId] = newReselector
    return newReselector
  }

  /**
   * Finds connection with business Id as parameter
   * @param {*} state state
   * @param {string} businessId business ID to find
   * @return {*} found connection, matching
   */
  getByBusinessId(state, businessId) {
    return this.getByBusinessIdReselector(businessId)(state)
  }
}
