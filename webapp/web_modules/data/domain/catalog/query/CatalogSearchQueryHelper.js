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
import StaticParameter from '../../common/query/abstract/StaticParameter'
import OpenSearchQuery from './OpenSearchQuery'

// TESTS for ME, open search query and url query (common)

/**
 * Helper and constant to emit a catalog search query
 * @author Raphaël Mechali
 */
export default class CatalogSearchQueryHelper {
  /** Query parameter name */
  static Q_PARAMETER_NAME = 'q'

  /** Sort parameter name */
  static SORT_PARAMETER_NAME = 'sort'

  /** Facets parameter name */
  static FACETS_PARAMETER_NAME = 'facets'

  /** Existence check parameter */
  static EXISTS_PARAMETER_NAME = 'exists'

  /** Check entity image existence */
  static HAS_IMAGE_PARAMETER_NAME = 'hasImage'

  /** Cone search parameters group: latitude */
  static LATITUDE_PARAMETER_NAME = 'lat'

  /** Cone search parameters group: longitude */
  static LONGITUDE_PARAMETER_NAME = 'lon'

  /** Cone search parameters group: half radius of the cone */
  static RADIUS_PARAMETER_NAME = 'r'

  /** Geomtry parameter name (expects WKT value) */
  static GEOMETRY_PARAMETER_NAME = 'g'

  /** Holds only parameters used to filter the results */
  static RESULTS_FILTERING_PARAMETERS = [
    CatalogSearchQueryHelper.Q_PARAMETER_NAME,
    CatalogSearchQueryHelper.EXISTS_PARAMETER_NAME,
    CatalogSearchQueryHelper.LATITUDE_PARAMETER_NAME,
    CatalogSearchQueryHelper.LONGITUDE_PARAMETER_NAME,
    CatalogSearchQueryHelper.RADIUS_PARAMETER_NAME,
    CatalogSearchQueryHelper.GEOMETRY_PARAMETER_NAME,
  ]

  /** Possible values for sorting, to be used as order in "sort={attribute},{order}" */
  static SORT_ORDERS = {
    ASCENDING: 'ASC',
    DESC: 'ASC',
  }

  /** Parameters that allow multiple values (to be merged before sending request) */
  static MULTIPLE_VALUES_PARAMETERS = [
    CatalogSearchQueryHelper.Q_PARAMETER_NAME,
    CatalogSearchQueryHelper.SORT_PARAMETER_NAME,
    CatalogSearchQueryHelper.FACETS_PARAMETER_NAME,
    CatalogSearchQueryHelper.EXISTS_PARAMETER_NAME,
  ]

  /**
   * @param {string} parameter parameter name
   * @return {boolean} true if parameter allows multiple values
   */
  static isAllowingMultipleValues(parameter) {
    return CatalogSearchQueryHelper.MULTIPLE_VALUES_PARAMETERS.includes(parameter)
  }

  /**
   * Merges query parameter
   * @param {[string]} parts query parts
   * @return {string} merged parameter value
   */
  static mergeQueryParameter(parts) {
    const nonEmptyParts = (parts || []).filter((part) => !!part)
    return nonEmptyParts.length ? new OpenSearchQuery(nonEmptyParts.map((part) => new StaticParameter(part))).toQueryString() : null
  }
}
