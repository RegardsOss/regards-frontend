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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { referencesActions } from './clients/ReferencesClient'
import { creationRequestActions } from './clients/CreationRequestsClient'
import { deleteRequestActions } from './clients/DeleteRequestsClient'
import { notificationRequestActions } from './clients/NotificationRequestsClient'
import { updateRequestActions } from './clients/UpdateRequestsClient'
import { settingsActions } from './clients/SettingsClient'

/**
  * Module hateoas depencies
  * @author Théo Lasserre
  */

const settingDependencies = [
  settingsActions.getDependency(RequestVerbEnum.GET_LIST),
]

const listDependencies = [
  referencesActions.getDependency(RequestVerbEnum.POST),
  creationRequestActions.getDependency(RequestVerbEnum.POST),
  deleteRequestActions.getDependency(RequestVerbEnum.POST),
  notificationRequestActions.getDependency(RequestVerbEnum.POST),
  updateRequestActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  settingDependencies,
}
