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
import { UIDomain } from '@regardsoss/domain'
import { TableActions, getTableSelectors, getTableReducer } from '@regardsoss/components'

/** Main results table action  */
const MAIN_NAMESPACE = 'search-results/main-table'
const MAIN_STORE_PATH = ['modules.search-results', 'mainResultsTable']
export const mainTableActions = new TableActions(MAIN_NAMESPACE)
export const mainTableReducer = getTableReducer(MAIN_NAMESPACE)
export const mainTableSelectors = getTableSelectors(MAIN_STORE_PATH)
const mainTableClient = {
  tableActions: mainTableActions,
  tableReducer: mainTableReducer,
  tableSelectors: mainTableSelectors,
}

/** Tag results table */
const TAG_NAMESPACE = 'search-results/tag-table'
const TAG_STORE_PATH = ['modules.search-results', 'tagResultsTable']
export const tagTableActions = new TableActions(TAG_NAMESPACE)
export const tagTableReducer = getTableReducer(TAG_NAMESPACE)
export const tagTableSelectors = getTableSelectors(TAG_STORE_PATH)
const tagTableClient = {
  tableActions: tagTableActions,
  tableReducer: tagTableReducer,
  tableSelectors: tagTableSelectors,
}

/**
 * Returns client to use for tab type
 * @param {*} tabType tab type
 * @return {{tableActions: *, tableReducer: *, tableSelectors: *}} table client to use for current tab
 */
export function getTableClient(tabType) {
  switch (tabType) {
    case UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS:
      return mainTableClient
    case UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS:
      return tagTableClient
    default:
      throw new Error(`Cannot get table client for tab ${tabType}`)
  }
}
