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
import includes from 'lodash/includes'
import split from 'lodash/split'
import values from 'lodash/values'
import reduce from 'lodash/reduce'
import get from 'lodash/get'

/**
 * Sorting table column helpers
 * @author Théo Lasserre
 */
export class SortingHelper {
  /**
   * Filter sorting parameters from requestParameters to match specified column keys
   * Necessary when multiple tables are displayed in the same page (multiple tabs).
   * @param {*} requestParameters
   * @param {*} columnKeys
   * @returns
   */
  static buildSortingParameters = (requestParameters, columnKeys) => {
    let newRequestParameters = requestParameters
    const sortingParameters = get(requestParameters, 'sort')
    if (sortingParameters) {
      newRequestParameters = {
        ...requestParameters,
        sort: reduce(sortingParameters, (acc, value) => {
          const sortKey = split(value, ',')[0]
          if (includes(values(columnKeys), sortKey)) {
            acc.push(value)
          }
          return acc
        }, []),
      }
    }
    return newRequestParameters
  }
}
