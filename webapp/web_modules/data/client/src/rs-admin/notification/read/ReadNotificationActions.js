/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSignalsActions } from '@regardsoss/store-utils'

/**
 * Actions to send a read notification request
 */
export default class ReadNotificationActions extends BasicSignalsActions {
  static MARK_READ_ACTIONS = 'markReadEndpoint'

  static MARK_ALL_READ_ACTIONS = 'markAllReadEndpoint'

  /**
   * We use a static namespace to allow another reducer to catch actions from this actionner
   */
  static NAMESPACE = 'menu/read-notification'

  constructor(instance = false) {
    /** Root endpoints for order state actions */
    const ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${instance ? STATIC_CONF.MSERVICES_PUBLIC.ADMIN_INSTANCE : STATIC_CONF.MSERVICES_PUBLIC.ADMIN}/notifications`
    const ROOT_RESOURCE = `${GATEWAY_HOSTNAME}/${API_URL}/${instance ? STATIC_CONF.IMSERVICES.ADMIN_INSTANCE : STATIC_CONF.MSERVICES.ADMIN}/notifications`

    super({
      [ReadNotificationActions.MARK_READ_ACTIONS]: {
        entityEndpoint: `${ROOT_ENDPOINT}/{notificationId}/read`,
        resourcesEndpoint: `${ROOT_RESOURCE}/{notificationId}/read`,
        namespace: `${ReadNotificationActions.NAMESPACE}/resume`,
        bypassErrorMiddleware: true,
      },
      [ReadNotificationActions.MARK_ALL_READ_ACTIONS]: {
        entityEndpoint: `${ROOT_ENDPOINT}/all/read`,
        resourcesEndpoint: `${ROOT_RESOURCE}/all/read`,
        namespace: `${ReadNotificationActions.NAMESPACE}/all-read`,
        bypassErrorMiddleware: true,
      },
    })
  }

  /**
   * Sends a read notification request
   * @param notificationId Notification ID
   */
  readNotification(notificationId) {
    return this.getSubAction(ReadNotificationActions.MARK_READ_ACTIONS).sendSignal('PUT', null, { notificationId })
  }

  /**
   * Mark all unread notification from the current user as read
   * @return an action to dispatch
   */
  markAllNotificationRead() {
    return this.getSubAction(ReadNotificationActions.MARK_ALL_READ_ACTIONS).sendSignal('PUT')
  }
}
