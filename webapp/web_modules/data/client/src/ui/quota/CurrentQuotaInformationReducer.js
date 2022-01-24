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
import { CurrentQuotaInformationActions } from './CurrentQuotaInformationActions'

/**
 * Current quota information (in user app) reducer
 *
 * @author Raphaël Mechali
 */
export class CurrentQuotaInformationReducer {
  /** Default state (empty) */
  static DEFAULT_STATE = {
    currentQuota: 0,
    maxQuota: 0,
    currentRate: 0,
    rateLimit: 0,
  }

  /**
   * Constructor
   * @param {string} namespace actions namespace, defaults to user app namespace when not provided
   */
  constructor(namespace) {
    this.actionsModel = new CurrentQuotaInformationActions(namespace)
  }

  /**
   * Reducer implementation for dialog requests
   */
  reduce(state = CurrentQuotaInformationReducer.DEFAULT_STATE, { type, ...data }) {
    switch (type) {
      case this.actionsModel.SET_QUOTA_INFORMATION:
        return {
          ...data, // each field in action matches reducer state
        }
      default:
        return state
    }
  }
}

/**
 * Returns reduce function instance for a given namespace
 * @param {*} namespace namespace (optional, leave empty to get reducer on default namespace)
 * @return {Function} reduce
 */
export function getCurrentQuotaInformationReducer(namespace) {
  const reducer = new CurrentQuotaInformationReducer(namespace)
  return function reduce(state, action) {
    return reducer.reduce(state, action)
  }
}
