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
import { borrowRoleReducer } from './clients/BorrowRoleClient'
import { borrowableRolesReducer } from './clients/BorrowableRolesClient'
import { myUserReducer } from './clients/MyUserClient'
import {
  notificationReducer, notificationDetailsReducer, notificationInstanceReducer,
  notificationReadPollerReducer, notificationReadPollerInstanceReducer, notificationPollerReducer,
  notificationPollerInstanceReducer, deleteNotificationReducer,
} from './clients/NotificationClient'
import { readNotificationReducer, readNotificationInstanceReducer } from './clients/ReadNotificationClient'
import { notificationSettingsReducer } from './clients/NotificationSettingsClient'
import { adminLayoutReducer } from './clients/LayoutListClient'
import { adminModuleReducer } from './clients/ModulesListClient'
import { roleReducer } from './clients/RoleClient'
import profileDialogReducer from './model/ProfileDialogReducer'
import { tableReducer } from './clients/TableClient'
import { serviceProviderReducer } from './clients/ServiceProviderClient'

export default {
  // admin reducers
  adminLayout: adminLayoutReducer,
  adminModule: adminModuleReducer,
  role: roleReducer,
  // user reducers
  borrowRole: borrowRoleReducer,
  borrowableRoles: borrowableRolesReducer,
  myUser: myUserReducer,

  notification: notificationReducer,
  notificationDetails: notificationDetailsReducer,
  notificationInstance: notificationInstanceReducer,
  notificationPoller: notificationPollerReducer,
  notificationPollerInstance: notificationPollerInstanceReducer,
  notificationReadPoller: notificationReadPollerReducer,
  notificationReadPollerInstance: notificationReadPollerInstanceReducer,
  notificationDelete: deleteNotificationReducer,

  readNotification: readNotificationReducer,
  readNotificationInstance: readNotificationInstanceReducer,
  // local actions / reducers
  profileDialog: profileDialogReducer,
  notificationSettings: notificationSettingsReducer,
  table: tableReducer,
  serviceProviders: serviceProviderReducer,
}
