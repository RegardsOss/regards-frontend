/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

/**
 * Client to request notification resources.
 *
 * @author Maxime Bouveron
 */
const namespace = 'menu/notification'
const notificationActions = new AdminClient.NotificationActions(namespace)
const notificationReducer = AdminClient.getNotificationReducer(namespace)
const notificationSelectors = AdminClient.getNotificationSelectors(['modules.menu', 'notification'])

module.exports = {
  notificationActions,
  notificationReducer,
  notificationSelectors,
}

