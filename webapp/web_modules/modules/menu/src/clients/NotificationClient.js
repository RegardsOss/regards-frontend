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
import { AdminClient } from '@regardsoss/client'

/**
 * Client to request notification resources.
 *
 * @author Maxime Bouveron
 * @author Léo Mieulet
 */
const namespacePoller = 'menu/notification'
const namespaceReadPoller = 'menu/notification-read'
const namespaceResearch = 'menu/notification-research'

// Used to fetch is there is a new notification
export const notificationPollerActions = new AdminClient.NotificationActions(namespacePoller)
export const notificationPollerReducer = AdminClient.getNotificationReducer(namespacePoller)
export const notificationPollerInstanceActions = new AdminClient.NotificationActions(namespacePoller, true)
export const notificationPollerInstanceReducer = AdminClient.getNotificationReducer(namespacePoller, true)
export const notificationPollerSelectors = AdminClient.getNotificationSelectors(['modules.menu', 'notificationPoller'])

export const notificationReadPollerActions = new AdminClient.NotificationActions(namespaceReadPoller)
export const notificationReadPollerReducer = AdminClient.getNotificationReducer(namespaceReadPoller)
export const notificationReadPollerInstanceActions = new AdminClient.NotificationActions(namespaceReadPoller, true)
export const notificationReadPollerInstanceReducer = AdminClient.getNotificationReducer(namespaceReadPoller, true)
export const notificationReadPollerSelectors = AdminClient.getNotificationSelectors(['modules.menu', 'notificationReadPoller'])

// Used to fetch notification inside the HMI
export const notificationActions = new AdminClient.NotificationActions(namespaceResearch)
export const notificationReducer = AdminClient.getNotificationReducer(namespaceResearch)
export const notificationInstanceActions = new AdminClient.NotificationActions(namespaceResearch, true)
export const notificationInstanceReducer = AdminClient.getNotificationReducer(namespaceResearch, true)
export const notificationSelectors = AdminClient.getNotificationSelectors(['modules.menu', 'notification'])
