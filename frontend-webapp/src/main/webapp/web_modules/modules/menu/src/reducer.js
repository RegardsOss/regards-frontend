/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { notificationReducer, notificationInstanceReducer } from './clients/NotificationClient'
import {
  readNotificationReducer,
  readNotificationInstanceReducer,
} from './clients/ReadNotificationClient'
import profileDialogReducer from './model/ProfileDialogReducer'

module.exports = {
  // web consuming clients (redux API actions / reducers)
  borrowRole: borrowRoleReducer,
  borrowableRoles: borrowableRolesReducer,
  myUser: myUserReducer,
  notification: notificationReducer,
  readNotification: readNotificationReducer,
  notificationInstance: notificationInstanceReducer,
  readNotificationInstance: readNotificationInstanceReducer,
  // local actions / reducers
  profileDialog: profileDialogReducer,
}
