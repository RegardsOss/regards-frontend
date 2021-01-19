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
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Results context selectors
 * @author Raphaël Mechali
 */
export class ResultsContextSelectors extends BasicSelector {
  /**
   * Returns context for module ID as parameter
   * @param {*} state redux state
   * @param {number} moduleId module ID
   * @return {*} result context for module ID as parameter, see web_modules/data/shape/src/ui/results/ResultsContext.js
   */
  getResultsContext(state, moduleId) {
    return this.uncombineStore(state)[moduleId]
  }
}

/**
 * Returns an instance of results context selectors on given store path
 * @param  {[string]} store path: reducer store path (default provided)
 * @return {ResultsContextSelectors} selectors instance
 */
export default function getResultsContextSelectors(storePath = ['user', 'resultsContext']) {
  return new ResultsContextSelectors(storePath)
}
