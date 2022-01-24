/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIClient } from '@regardsoss/client'

/**
 * Defines plugin services client for results context
 * @author Raphaël Mechali
 */

/**
 * Client to run service for main results tab
 */
const MAIN_RUN_PLUGIN_SERVICES_STORE_PATH = ['modules.search-results', 'mainRunPluginService']
const MAIN_RUN_PLUGIN_SERVICE_NAMESPACE = 'search-results/main-results/run-plugin-service'
export const mainRunPluginServiceActions = new UIClient.RunPluginServiceActions(MAIN_RUN_PLUGIN_SERVICE_NAMESPACE)
export const mainRunPluginServiceReducer = UIClient.getRunPluginServiceReducer(MAIN_RUN_PLUGIN_SERVICE_NAMESPACE)
export const mainRunPluginServiceSelectors = UIClient.getRunPluginServiceSelectors(MAIN_RUN_PLUGIN_SERVICES_STORE_PATH)
const mainRunPluginServiceClient = {
  runServiceActions: mainRunPluginServiceActions,
  runServiceReducer: mainRunPluginServiceReducer,
  runServiceSelectors: mainRunPluginServiceSelectors,
}

/**
 * Client to run service for tag results tab
 */
const TAG_RUN_PLUGIN_STORE_PATH = ['modules.search-results', 'tagRunPluginService']
const TAG_RUN_PLUGIN_NAMESPACE = 'search-results/tag-results/run-plugin-service'
export const tagRunPluginServiceActions = new UIClient.RunPluginServiceActions(TAG_RUN_PLUGIN_NAMESPACE)
export const tagRunPluginServiceReducer = UIClient.getRunPluginServiceReducer(TAG_RUN_PLUGIN_NAMESPACE)
export const tagRunPluginServiceSelectors = UIClient.getRunPluginServiceSelectors(TAG_RUN_PLUGIN_STORE_PATH)
const tagServicesCatalogClient = {
  runServiceActions: tagRunPluginServiceActions,
  runServiceReducer: tagRunPluginServiceReducer,
  runServiceSelectors: tagRunPluginServiceSelectors,
}

/**
 * Returns client to use for tab type
 * @param {*} tabType tab type
 * @return {{
 * runServiceActions: *,
 * runServiceReducer: Function,
 * runServiceSelector: *,
 * }} results client to use for current tab
 */
export function getRunServiceClient(tabType) {
  switch (tabType) {
    case UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS:
      return mainRunPluginServiceClient
    case UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS:
      return tagServicesCatalogClient
    default:
      throw new Error(`Cannot get run service client client for tab ${tabType}`)
  }
}
