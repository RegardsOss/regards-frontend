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
import RunPluginServiceActions from './RunPluginServiceActions'

/**
 * Run plugin service reducer in context results
 * @author Raphaël Mechali
 */
export class RunPluginServiceReducer {
  /** Default state */
  static DEFAULT_STATE = {
    serviceRunModel: null,
  }

  /**
 * Constructor
 * @param {string} namespace actions namespace, default user interface namespace when not provided
 */
  constructor(namespace) {
    this.actions = new RunPluginServiceActions(namespace)
  }

  /**
   * Reducer implementation for dialog requests
   */
  reduce = (state = RunPluginServiceReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.actions.RUN_SERVICE:
        return {
          serviceRunModel: action.serviceRunModel,
        }
      case this.actions.CLOSE_SERVICE:
        return {
          serviceRunModel: null,
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
export default function getRunPluginServiceReducer(namespace) {
  const reducer = new RunPluginServiceReducer(namespace)
  return function reduce(state, action) {
    return reducer.reduce(state, action)
  }
}
