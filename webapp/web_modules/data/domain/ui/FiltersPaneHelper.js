/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isPlainObject from 'lodash/isPlainObject'
import keys from 'lodash/keys'
import has from 'lodash/has'
import split from 'lodash/split'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import { CommonDomain } from '@regardsoss/domain'
import { TableSelectionModes } from '@regardsoss/components'

/**
 * Filters pane helper,
 * @author Théo Lasserre
 */
export class FiltersPaneHelper {
  static getFilterDateValue = (inputValues, filterKey, dateParameter) => get(inputValues, `${filterKey}.${dateParameter}`, null)
    ? new Date(inputValues[filterKey][dateParameter]) : null

  static getParameterDateValue = (dateValue) => !isEmpty(dateValue) ? dateValue : null

  static extractFiltersFromURL = (defaultFiltersState) => {
    const { query } = browserHistory.getCurrentLocation()
    let urlFilters = { ...defaultFiltersState }
    if (values(query).length > 0) {
      urlFilters = reduce(query, (acc, queryValue, queryKey) => {
        if (has(defaultFiltersState, queryKey)) {
          if (has(defaultFiltersState[queryKey], CommonDomain.REQUEST_PARAMETERS.VALUES)) {
            // Values Restrictiction filters type
            acc[queryKey] = {
              [CommonDomain.REQUEST_PARAMETERS.VALUES]: split(query[queryKey], ','),
            }
          } else if (has(defaultFiltersState[queryKey], CommonDomain.REQUEST_PARAMETERS.BEFORE)
            && has(defaultFiltersState[queryKey], CommonDomain.REQUEST_PARAMETERS.AFTER)) {
            // Date Restriction filters type
            const splitDates = split(query[queryKey], ',')
            acc[queryKey] = {
              [CommonDomain.REQUEST_PARAMETERS.AFTER]: FiltersPaneHelper.getParameterDateValue(splitDates[0]),
              [CommonDomain.REQUEST_PARAMETERS.BEFORE]: FiltersPaneHelper.getParameterDateValue(splitDates[1]),
            }
          } else {
            // Other filters type
            acc[queryKey] = query[queryKey]
          }
        }
        return acc
      }, { ...defaultFiltersState })
    }
    return urlFilters
  }

  static updateURL = (inputValues) => {
    const { pathname } = browserHistory.getCurrentLocation()
    const newQuery = reduce(keys(inputValues), (acc, value) => {
      if ((inputValues[value] !== null && inputValues[value] !== undefined && !isEmpty(inputValues[value])) || isBoolean(inputValues[value])) {
        // Values Restriction & Dates Restriction
        if (isPlainObject(inputValues[value])) {
          if (CommonDomain.REQUEST_PARAMETERS.VALUES in inputValues[value] && !isEmpty(inputValues[value][CommonDomain.REQUEST_PARAMETERS.VALUES])) {
            acc[value] = inputValues[value][CommonDomain.REQUEST_PARAMETERS.VALUES].toString()
          } else if (CommonDomain.REQUEST_PARAMETERS.AFTER in inputValues[value] && CommonDomain.REQUEST_PARAMETERS.BEFORE in inputValues[value]) {
            let paramValue = ''
            if (inputValues[value][CommonDomain.REQUEST_PARAMETERS.AFTER] !== null) {
              paramValue = inputValues[value][CommonDomain.REQUEST_PARAMETERS.AFTER]
            }
            if (inputValues[value][CommonDomain.REQUEST_PARAMETERS.BEFORE] !== null) {
              paramValue += `,${inputValues[value][CommonDomain.REQUEST_PARAMETERS.BEFORE]}`
            }
            if (!isEmpty(paramValue)) {
              acc[value] = paramValue
            }
          }
        } else if (isBoolean(inputValues[value])) {
          if (inputValues[value]) {
            acc[value] = `${inputValues[value]}`
          }
        } else {
          acc[value] = inputValues[value]
        }
      }
      return acc
    }, {})
    browserHistory.replace({
      pathname,
      search: encodeURIComponent(new URLSearchParams(newQuery).toString()),
      query: newQuery,
    })
  }

  static buildRequestParameters = (parametersObject) => (
    reduce(parametersObject, (acc, filterValue, filterKey) => {
      if (has(filterValue, CommonDomain.REQUEST_PARAMETERS.VALUES)) {
        if (!isEmpty(filterValue[CommonDomain.REQUEST_PARAMETERS.VALUES])) {
          // Values Restriction filters type
          acc[filterKey] = {
            [CommonDomain.REQUEST_PARAMETERS.VALUES]: filterValue[CommonDomain.REQUEST_PARAMETERS.VALUES],
            [CommonDomain.REQUEST_PARAMETERS.MODE]: TableSelectionModes.INCLUDE,
          }
        }
      } else if (has(filterValue, CommonDomain.REQUEST_PARAMETERS.BEFORE)
        || has(filterValue, CommonDomain.REQUEST_PARAMETERS.AFTER)) {
        if (!(isEmpty(filterValue[CommonDomain.REQUEST_PARAMETERS.AFTER])
          && isEmpty(filterValue[CommonDomain.REQUEST_PARAMETERS.BEFORE]))) {
          // Dates Restriction filters type
          acc[filterKey] = {
            [CommonDomain.REQUEST_PARAMETERS.AFTER]: FiltersPaneHelper.getFilterDateValue(parametersObject, filterKey, CommonDomain.REQUEST_PARAMETERS.AFTER),
            [CommonDomain.REQUEST_PARAMETERS.BEFORE]: FiltersPaneHelper.getFilterDateValue(parametersObject, filterKey, CommonDomain.REQUEST_PARAMETERS.BEFORE),
          }
        }
      } else if (isBoolean(filterValue)) {
        acc[filterKey] = filterValue ? `${filterValue}` : ''
      } else if (!isEmpty(filterValue)) {
        // Other filters type
        acc[filterKey] = filterValue
      }
      return acc
    }, {}))
}
