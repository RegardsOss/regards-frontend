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

/**
 * Redux actions to drive a given search-results module context.
 * Note that it may either be used by parent modules or by
 * search-results module to update its own state
 *
 * @author Raphaël Mechali
 */
export default class ResultsContextActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace, default user interface namespace when not provided
   */
  constructor(namespace = 'user/results-context') {
    this.SET_CONTEXT = `${namespace}/set`
    this.UPDATE_CONTEXT = `${namespace}/update`
  }

  /**
   * Sets the whole results context, overwriting previous state
   * @param {number} moduleId target search results module ID
   * @param {*} newState New context state, see web_modules/data/shape/src/ui/results/ResultsContext.js
   * for expected shape
   * @return {*} redux action to perform context replacement
   */
  setContext(moduleId, newState) {
    return {
      type: this.SET_CONTEXT,
      moduleId,
      newState,
    }
  }

  /**
   * Updates results context, overwriting previous state only when new values are available in stateDiff
   * @param {number} moduleId target search results module ID
   * @param {*} stateDiff object holding fields to update in search context
   * @return {*} redux action to perform context update
   */
  updateResultsContext(moduleId, stateDiff) {
    return {
      type: this.UPDATE_CONTEXT,
      moduleId,
      stateDiff,
    }
  }
}
