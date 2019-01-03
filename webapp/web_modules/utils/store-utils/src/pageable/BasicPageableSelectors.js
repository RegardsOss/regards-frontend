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
 * @author Léo Mieulet
 */
import BasicListSelectors from '../list/BasicListSelectors'

/**
 *  Provide an high level class to interact with entity stored in a pageable list
 */
class BasicPageableSelectors extends BasicListSelectors {
  /**
   * Returns metadata for last page request
   * @param {*} state state
   * @return {{size: number, totalElements: number, totalPages: number, number: number}} page metadata
   */
  getMetaData(state) {
    return this.uncombineStore(state).metadata
  }

  /**
   * Returns total results count for last page request
   * @param {*} state redux store state
   * @return {number} total results count
   */
  getResultsCount(state) {
    const metaData = this.getMetaData(state)
    return metaData ? metaData.totalElements : 0
  }

  /**
   * Returns links for last page request
   * @param {*} state state
   * @return {[{rel: string, href: string}]} links
   */
  getLinks(state) {
    return this.uncombineStore(state).links
  }
}

export default BasicPageableSelectors
