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
import { TableSortOrders } from '@regardsoss/components'
import {
  OpenSearchQuery, OpenSearchQueryParameter, URLSearchQuery,
  URLSearchQueryParameter, StaticQueryParameter,
} from '@regardsoss/domain/catalog'

function getSearchTagParameter(searchTag) {
  return new OpenSearchQueryParameter(OpenSearchQuery.TAGS_PARAM_NAME, searchTag)
}

function getDatasetIpIdParameter(datasetIpId) {
  return new OpenSearchQueryParameter(OpenSearchQuery.TAGS_PARAM_NAME, datasetIpId)
}

/**
 * Returns open search query
 * @param rootSearchQuery root search query (optional)
 * @param facetFilters [{openSearchQuery}] facet filters, to be applied on result (optional)
 * @param otherParameters other query parameters (optional)
 * @returns open search query
 */
function getOpenSearchQuery(rootSearchQuery, facettesFilters = [], otherParameters = []) {
  // compute all query parameters
  const openSearchParameters = [
    ...facettesFilters.map(({ openSearchQuery }) => new StaticQueryParameter(openSearchQuery)),
    ...otherParameters,
  ]

  return new OpenSearchQuery(rootSearchQuery, openSearchParameters)
}

/** Maps table sorting to open search sort keywords */
const tableToOpenSearchSort = {
  [TableSortOrders.ASCENDING_ORDER]: 'ASC',
  [TableSortOrders.DESCENDING_ORDER]: 'DESC',
}

/**
 * Returns URL query
 * @param sortingArray [{attributePath, type}] sorting array, where attribute is an attribute path and type is sorting type,
 * from table columns sorting types
 * @param facettesQuery facettes query, facettes to be provided on results (optional)
 * @param facettesQuery quicklook filter (optional)
 * @return URL query
 */
function getURLQuery(openSearchQuery, sortingArray = [], facettesQuery = '', quicklookFilterQuery = '') {
  // specific query format: put parameter value in parenthesis (when available)
  const queryParamValue = openSearchQuery && `(${openSearchQuery})`
  const urlParameters = [
    // 1 - query parameter (q)
    new URLSearchQueryParameter(URLSearchQuery.QUERY_PARAMETER_NAME, queryParamValue),
    // 2 - sort parameters
    ...sortingArray.map(sorting =>
      new URLSearchQueryParameter(URLSearchQuery.SORT_PARAMETER_NAME, `${sorting.attributePath},${tableToOpenSearchSort[sorting.type]}`)),
    // 3 - facettes query
    new StaticQueryParameter(facettesQuery),
    // 4 - Quicklook filter
    new StaticQueryParameter(quicklookFilterQuery),
  ]

  return new URLSearchQuery('', urlParameters)
}

module.exports = {
  getOpenSearchQuery,
  getURLQuery,
  getSearchTagParameter,
  getDatasetIpIdParameter,
}
