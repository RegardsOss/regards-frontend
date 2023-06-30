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

/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { adminModuleActions } from './clients/ModulesListClient'
import { roleActions } from './clients/RoleClient'

/**
 * Mandatory Dependencies to display module in user interface
 * @type {Array}
 */
const user = []

/**
 * Mandatory Dependencies to display module in admin interface
 * @type {Array}
 */
const admin = [
  // cannot express that dependency, as the server considers here a path variable. Anyway, it is not required as
  // it MUST be public for the user app to work
  // adminLayoutActions.getDependency(RequestVerbEnum.GET_LIST),
  adminModuleActions.getDependency(RequestVerbEnum.GET_LIST),
  roleActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  user,
  admin,
}
