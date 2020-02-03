/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { servicesManagementDependencies } from '@regardsoss/admin-dataaccess-services-management'
import { searchEnginesDependencies } from '@regardsoss/admin-dataaccess-searchengines-management'
import { accessGroupDependencies } from '@regardsoss/admin-accessright-accessgroup-management'
import { indexActions, RESET_INDEX_ACTION } from './clients/IndexClient'

/**
 * Mandatory Dependencies to display module in project menu
 * @type {Array}
 */
export default [
  [...servicesManagementDependencies.listDependencies, ...servicesManagementDependencies.addDependencies],
  [...searchEnginesDependencies.listDependencies, ...searchEnginesDependencies.addDependencies],
  [...accessGroupDependencies.addDependencies, ...accessGroupDependencies.listDependencies],
  [indexActions.getSubAction(RESET_INDEX_ACTION).getDependency(RequestVerbEnum.DELETE)],
]
