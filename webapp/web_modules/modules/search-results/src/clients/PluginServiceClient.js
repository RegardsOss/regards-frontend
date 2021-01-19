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
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Defines plugin services client for results context
 * @author Raphaël Mechali
 */

/**
 * Client to search services for main results tab
 */
const MAIN_SERVICES_STORE_PATH = ['modules.search-results', 'mainPluginServices']
const MAIN_SERVICES_NAMESPACE = 'search-results/main-results/plugin-services'
export const mainPluginServicesActions = new AccessProjectClient.PluginServiceActions(MAIN_SERVICES_NAMESPACE)
export const mainPluginServicesReducer = AccessProjectClient.getPluginServiceReducer(MAIN_SERVICES_NAMESPACE)
export const mainPluginServicesSelectors = AccessProjectClient.getPluginServiceSelectors(MAIN_SERVICES_STORE_PATH)
const mainServicesCatalogClient = {
  servicesActions: mainPluginServicesActions,
  servicesReducer: mainPluginServicesReducer,
  servicesSelectors: mainPluginServicesSelectors,
}

/**
 * Client to search services for tag results tab
 */
const TAG_SERVICES_STORE_PATH = ['modules.search-results', 'tagPluginServices']
const TAG_SERVICES_NAMESPACE = 'search-results/tag-results/plugin-services'
export const tagPluginServicesActions = new AccessProjectClient.PluginServiceActions(TAG_SERVICES_NAMESPACE)
export const tagPluginServicesReducer = AccessProjectClient.getPluginServiceReducer(TAG_SERVICES_NAMESPACE)
export const tagPluginServicesSelectors = AccessProjectClient.getPluginServiceSelectors(TAG_SERVICES_STORE_PATH)
const tagServicesCatalogClient = {
  servicesActions: tagPluginServicesActions,
  servicesReducer: tagPluginServicesReducer,
  servicesSelectors: tagPluginServicesSelectors,
}

/**
 * Returns client to use for tab type
 * @param {*} tabType tab type
 * @return {{
 * servicesActions: *,
 * servicesReducer: Function,
 * servicesSelectors: *,
 * }} results client to use for current tab
 */
export function getServicesClient(tabType) {
  switch (tabType) {
    case UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS:
      return mainServicesCatalogClient
    case UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS:
      return tagServicesCatalogClient
    default:
      throw new Error(`Cannot get services client for tab ${tabType}`)
  }
}
