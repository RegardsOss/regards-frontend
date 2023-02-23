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
import every from 'lodash/every'
import includes from 'lodash/includes'
import isFinite from 'lodash/isFinite'
import isNull from 'lodash/isNull'
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
  static extractFiltersFromURL = (defaultFiltersState) => {
    const { query } = browserHistory.getCurrentLocation()
    let urlFilters = {}
    if (values(query).length > 0) {
      urlFilters = reduce(query, (acc, queryValue, queryKey) => {
        if (has(defaultFiltersState, queryKey)) {
          if (has(defaultFiltersState[queryKey], CommonDomain.REQUEST_PARAMETERS.VALUES)) {
            // Values Restrictiction filters type
            const parsedQueryValue = JSON.parse(queryValue)
            acc[queryKey] = {
              [CommonDomain.REQUEST_PARAMETERS.VALUES]: split(parsedQueryValue[CommonDomain.REQUEST_PARAMETERS.VALUES], ','),
              [CommonDomain.REQUEST_PARAMETERS.MATCH_MODE]: parsedQueryValue[CommonDomain.REQUEST_PARAMETERS.MATCH_MODE],
              [CommonDomain.REQUEST_PARAMETERS.IGNORE_CASE]: parsedQueryValue[CommonDomain.REQUEST_PARAMETERS.IGNORE_CASE],
            }
          } else if (has(defaultFiltersState[queryKey], CommonDomain.REQUEST_PARAMETERS.BEFORE)
            && has(defaultFiltersState[queryKey], CommonDomain.REQUEST_PARAMETERS.AFTER)) {
            // Date Restriction filters type
            const splitDates = split(queryValue, ',')
            acc[queryKey] = {
              [CommonDomain.REQUEST_PARAMETERS.AFTER]: splitDates[0] || null,
              [CommonDomain.REQUEST_PARAMETERS.BEFORE]: splitDates[1] || null,
            }
          } else {
            // Other filters type
            acc[queryKey] = queryValue
          }
        }
        return acc
      }, {})
    }
    return urlFilters
  }

  static updateURL = (inputValues, ignoredURLParameters = []) => {
    const { pathname, query } = browserHistory.getCurrentLocation()
    const previousQuery = reduce(keys(query), (acc, value) => {
      if (includes(ignoredURLParameters, value)) {
        acc[value] = query[value]
      }
      return acc
    }, {})
    const newQuery = reduce(keys(inputValues), (acc, value) => {
      if ((inputValues[value] !== null && inputValues[value] !== undefined && !isEmpty(inputValues[value])) || isBoolean(inputValues[value]) || isFinite(inputValues[value])) {
        // Values Restriction & Dates Restriction
        if (isPlainObject(inputValues[value])) {
          if (has(inputValues[value], CommonDomain.REQUEST_PARAMETERS.VALUES) && !isEmpty(inputValues[value][CommonDomain.REQUEST_PARAMETERS.VALUES])) {
            acc[value] = JSON.stringify({
              [CommonDomain.REQUEST_PARAMETERS.VALUES]: inputValues[value][CommonDomain.REQUEST_PARAMETERS.VALUES].toString(),
              [CommonDomain.REQUEST_PARAMETERS.MATCH_MODE]: inputValues[value][CommonDomain.REQUEST_PARAMETERS.MATCH_MODE],
              [CommonDomain.REQUEST_PARAMETERS.IGNORE_CASE]: inputValues[value][CommonDomain.REQUEST_PARAMETERS.IGNORE_CASE],
            })
          } else if (has(inputValues[value], CommonDomain.REQUEST_PARAMETERS.AFTER) || has(inputValues[value], CommonDomain.REQUEST_PARAMETERS.BEFORE)) {
            let paramValue = ''
            if (!FiltersPaneHelper.isAfterDateEmptyFilter(inputValues[value])) {
              paramValue = `${inputValues[value][CommonDomain.REQUEST_PARAMETERS.AFTER]}`
            }
            if (!FiltersPaneHelper.isBeforeDateEmptyFilter(inputValues[value])) {
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
      query: { ...previousQuery, ...newQuery },
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
            [CommonDomain.REQUEST_PARAMETERS.IGNORE_CASE]: filterValue[CommonDomain.REQUEST_PARAMETERS.IGNORE_CASE],
            [CommonDomain.REQUEST_PARAMETERS.MATCH_MODE]: filterValue[CommonDomain.REQUEST_PARAMETERS.MATCH_MODE],
          }
        }
      } else if (has(filterValue, CommonDomain.REQUEST_PARAMETERS.BEFORE)
        || has(filterValue, CommonDomain.REQUEST_PARAMETERS.AFTER)) {
        if (!(isEmpty(filterValue[CommonDomain.REQUEST_PARAMETERS.AFTER])
          && isEmpty(filterValue[CommonDomain.REQUEST_PARAMETERS.BEFORE]))) {
          // Dates Restriction filters type
          acc[filterKey] = {
            [CommonDomain.REQUEST_PARAMETERS.AFTER]: get(parametersObject, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.AFTER}`, null),
            [CommonDomain.REQUEST_PARAMETERS.BEFORE]: get(parametersObject, `${filterKey}.${CommonDomain.REQUEST_PARAMETERS.BEFORE}`, null),
          }
        }
      } else if (isBoolean(filterValue)) {
        acc[filterKey] = filterValue ? `${filterValue}` : ''
      } else if (!isEmpty(filterValue) || isFinite(filterValue)) {
        // Other filters type
        acc[filterKey] = filterValue
      }
      return acc
    }, {}))

  static isValuesEmptyFilter(filter) {
    return isEmpty(get(filter, CommonDomain.REQUEST_PARAMETERS.VALUES, []))
  }

  static isDatesEmptyFilter(filter) {
    return FiltersPaneHelper.isBeforeDateEmptyFilter(filter) && FiltersPaneHelper.isAfterDateEmptyFilter(filter)
  }

  static isBeforeDateEmptyFilter(filter) {
    const beforeDateValue = get(filter, CommonDomain.REQUEST_PARAMETERS.BEFORE, '')
    return isNull(beforeDateValue) || isEmpty(beforeDateValue)
  }

  static isAfterDateEmptyFilter(filter) {
    const afterDateValue = get(filter, CommonDomain.REQUEST_PARAMETERS.AFTER, '')
    return isNull(afterDateValue) || isEmpty(afterDateValue)
  }

  static isFilterEmpty(filter) {
    if (has(filter, CommonDomain.REQUEST_PARAMETERS.VALUES)) {
      return FiltersPaneHelper.isValuesEmptyFilter(filter)
    }
    if (has(filter, CommonDomain.REQUEST_PARAMETERS.BEFORE) || has(filter, CommonDomain.REQUEST_PARAMETERS.AFTER)) {
      return FiltersPaneHelper.isDatesEmptyFilter(filter)
    }
    if (isBoolean(filter)) {
      return !filter
    }
    return isEmpty(filter)
  }

  static isFiltersEmpty(filters) {
    return isEmpty(filters) || every(filters, (filter) => FiltersPaneHelper.isFilterEmpty(filter))
  }
}
