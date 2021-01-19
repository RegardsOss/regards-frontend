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
import { AccessDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'

/**
 * Holds modules dumps for tests
 * @author Raphaël Mechali
 */

/**
 * Wraps basic modules definition into content object
 * @param modulesWithoutContent modules not wrapped in content field
 * @return modules wrapped in content field (also adds conf field)
 */
function exportModulesList(modulesWithoutContent) {
  return modulesWithoutContent.map((fields) => ({ // wrap in content field
    content: {
      ...fields,
      conf: {},
    },
  }))
}

const defaultModules = [{
  id: 2,
  active: true,
  container: 'dynamic-1',
  description: 'Order cart',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: 'Cart', fr: 'Panier' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.ORDER_CART,
}, {
  id: 3,
  active: true,
  container: 'dynamic-1',
  description: 'Orders',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: 'Orders', fr: 'Commandes' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.ORDER_HISTORY,
}, {
  id: 4,
  container: 'dynamic-1',
  active: true,
  description: 'Data graph',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: 'Browse data', fr: 'Naviguer dans les données' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.SEARCH_GRAPH,
}, {
  id: 5,
  description: 'Home page',
  container: 'dynamic-1',
  active: true,
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: 'Home', fr: 'Accueil' },
    home: true,
  },
  type: modulesManager.VisibleModuleTypes.EMBEDDED_HMTL,
}, {
  id: 6,
  active: true,
  container: 'dynamic-1',
  description: 'search results',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: 'View data', fr: 'Consulter les données' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
}]

export const allDefaultConfigDumpModules = exportModulesList(defaultModules)

export const modulesWithNewAndDeleted = exportModulesList(
  // we remove the module 6 and 3 and add 7 / 8 modules
  defaultModules.filter((module) => module.id !== 3 && module.id !== 6).concat([{
    id: 7,
    active: true,
    container: 'dynamic-1',
    description: 'another search results',
    page: {
      iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      title: { en: 'View data 2', fr: 'Consulter les données 2' },
      home: false,
    },
    type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
  }, {
    id: 8,
    active: true,
    container: 'dynamic-1',
    description: 'another search results 2',
    page: {
      iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      title: { en: 'View data 3', fr: 'Consulter les données 3' },
      home: false,
    },
    type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
  }]))

export const modulesWithInactiveAndNonDynamic = exportModulesList([{
  id: 1, // dynamic and active
  active: true,
  container: 'dynamic-1',
  description: '1',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: '1', fr: '1' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
}, {
  id: 2, // dynamic and disabled
  active: false,
  container: 'dynamic-1',
  description: '2',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: '2', fr: '2' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
}, {
  id: 3, // static and active
  active: true,
  container: 'static-1',
  description: '3',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: '3', fr: '3' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
}, {
  id: 4, // static and disabled
  active: false,
  container: 'static-1',
  description: '4',
  page: {
    iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
    title: { en: '4', fr: '4' },
    home: false,
  },
  type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
}])
