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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { projectUserActions } from './clients/ProjectUserClient'
import { projectUserSettingsActions, updateSettingActions } from './clients/ProjectUserSettingsClient'
import { roleActions } from './clients/RoleClient'
import { accessGroupActions } from './clients/AccessGroupClient'

/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.POST),
  roleActions.getDependency(RequestVerbEnum.GET),
  accessGroupActions.getDependency(RequestVerbEnum.GET),
]
const settingsDependencies = [
  projectUserSettingsActions.getDependency(RequestVerbEnum.GET),
  updateSettingActions.getDependency(RequestVerbEnum.PUT),
]

export default {
  listDependencies,
  addDependencies,
  settingsDependencies,
}
