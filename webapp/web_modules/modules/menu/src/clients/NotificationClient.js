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
import { AdminClient } from '@regardsoss/client'

/**
 * Client to request notification resources.
 *
 * @author Maxime Bouveron
 * @author Léo Mieulet
 * @author Théo Lasserre
 */
const namespacePoller = 'menu/notification'
const namespaceResearch = 'menu/notification-research'
const namespaceDetails = 'menu/notification-details'
const namespaceDelete = 'menu/notification-delete-read'

// Used to fetch is there is a new notification
export const notificationPollerActions = new AdminClient.NotificationActions(namespacePoller)
export const notificationPollerReducer = AdminClient.getNotificationReducer(namespacePoller)
export const notificationPollerInstanceActions = new AdminClient.NotificationActions(namespacePoller, true)
export const notificationPollerInstanceReducer = AdminClient.getNotificationReducer(namespacePoller, true)
export const notificationPollerSelectors = AdminClient.getNotificationSelectors(['modules.menu', 'notificationPoller'])

// Used to fetch notification inside the HMI
export const notificationActions = new AdminClient.NotificationActions(namespaceResearch)
export const notificationReducer = AdminClient.getNotificationReducer(namespaceResearch)
export const notificationInstanceActions = new AdminClient.NotificationActions(namespaceResearch, true)
export const notificationInstanceReducer = AdminClient.getNotificationReducer(namespaceResearch, true)
export const notificationSelectors = AdminClient.getNotificationSelectors(['modules.menu', 'notification'])

export const notificationDetailsActions = new AdminClient.NotificationDetailsActions(namespaceDetails)
export const notificationDetailsReducer = AdminClient.getNotificationDetailsReducer(namespaceDetails)
export const notificationDetailsSelectors = AdminClient.getNotificationDetailsSelectors(['modules.menu', 'notificationDetails'])
export const notificationDetailsInstanceActions = new AdminClient.NotificationDetailsActions(namespaceDetails, true)
export const notificationDetailsInstanceReducer = AdminClient.getNotificationDetailsReducer(namespaceDetails, true)

export const deleteNotificationActions = new AdminClient.DeleteNotificationActions(namespaceDelete)
export const deleteNotificationReducer = AdminClient.getDeleteNotificationReducer(namespaceDelete)
export const deleteNotificationSelectors = AdminClient.getDeleteNotificationSelectors(['modules.menu', 'notificationDelete'])
export const deleteNotificationInstanceActions = new AdminClient.DeleteNotificationActions(namespaceDelete, true)
export const deleteNotificationInstanceReducer = AdminClient.getDeleteNotificationReducer(namespaceDelete, true)
