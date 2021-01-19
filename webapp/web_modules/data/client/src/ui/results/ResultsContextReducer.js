/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import ResultsContextActions from './ResultsContextActions'

/**
 * Results context actions: used to drive each results module context, by their module ID. That client
 * provides a single entry point to all modules displaying a search-results module. search-results module
 * also uses it to update its state
 *
 * @author Raphaël Mechali
 */
export class ResultsContextReducer {
  /** Default state (empty) */
  static DEFAULT_STATE = {}

  /**
   * Constructor
   * @param {string} namespace actions namespace, default user interface namespace when not provided
   */
  constructor(namespace) {
    this.actionsModel = new ResultsContextActions(namespace)
  }

  /**
   * Reducer implementation for dialog requests
   */
  reduce(state = ResultsContextReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actionsModel.SET_CONTEXT:
        return {
          ...state,
          [action.moduleId]: action.newState,
        }
      case this.actionsModel.UPDATE_CONTEXT: {
        return {
          ...state,
          [action.moduleId]: UIDomain.ResultsContextHelper.deepMerge(state[action.moduleId], action.stateDiff),
        }
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
export default function getResultsContextReducer(namespace) {
  const reducer = new ResultsContextReducer(namespace)
  return function reduce(state, action) {
    return reducer.reduce(state, action)
  }
}
