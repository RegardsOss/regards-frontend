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
import pickBy from 'lodash/pickBy'
import map from 'lodash/map'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import includes from 'lodash/includes'
import keys from 'lodash/keys'

/**
 * Helper for query filters construction
 * @author Théo Lasserre
 */

function pickFilters(filters) {
  return pickBy(filters, (filt) => filt !== '' && filt !== undefined && filt !== false && filt !== null)
}

export function getQueryString(filters) {
  const filteredFilters = pickFilters(filters)
  return map(keys(filteredFilters), (key) => `&${key}=${filters[key]}`).join('')
}

export function getUserRequestParameters(requestParameters, defaultFilterState) {
  const filters = omit(requestParameters, 'sort')
  const currentFilters = pickBy(filters, (filt, key) => includes(keys(defaultFilterState), key))
  return {
    ...currentFilters,
    ...pick(requestParameters, 'sort'),
  }
}
