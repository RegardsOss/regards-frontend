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

import { ConnectivityCheck, ConnectivityCheckList } from './ConnectivityCheck'
import { MetadataContent, MetadataContentArray } from './Metadata'
import { ProjectContent, Project, ProjectList } from './Project'
import { ProjectConnection, ProjectConnectionList } from './ProjectConnection'
import { ProjectUser, ProjectUserList } from './ProjectUser'
import { ProjectUserSettings, ProjectUserSettingsWithContent } from './ProjectUserSettings'
import { Resource, ResourceList, ResourceArray } from './Resource'
import { Role, RoleList, RoleArray } from './Role'
import { Notification, NotificationList, NotificationArray } from './Notification'
import { NotificationSettings } from './NotificationSettings'

module.exports = {
  ConnectivityCheck,
  ConnectivityCheckList,

  MetadataContent,
  MetadataContentArray,

  ProjectContent,
  Project,
  ProjectList,

  ProjectConnection,
  ProjectConnectionList,

  ProjectUser,
  ProjectUserList,

  ProjectUserSettings,
  ProjectUserSettingsWithContent,

  Resource,
  ResourceList,
  ResourceArray,

  Role,
  RoleList,
  RoleArray,

  Notification,
  NotificationList,
  NotificationArray,

  NotificationSettings,
}
