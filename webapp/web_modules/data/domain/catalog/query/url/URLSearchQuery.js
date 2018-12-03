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
import Query from '../common/Query'

/**
 * URL search query model (open search request URL)  (note: ? parameter is useless)
 */
export default class URLSearchQuery extends Query {
  /** parameters separator */
  static PARAMETERS_SEPARATOR = '&'

  /** Query parameter name */
  static QUERY_PARAMETER_NAME = 'q'

  /** Sort parameter name */
  static SORT_PARAMETER_NAME = 'sort'

  /** Facets parameter name */
  static FACETTES_PARAMETER_NAME = 'facets'

  /** Existence check parameter */
  static EXISTS_PARAMETER_NAME = 'exists'

  constructor(rootQuery, parameters) {
    super(rootQuery, parameters, URLSearchQuery.PARAMETERS_SEPARATOR)
  }
}
