/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'menu/read-notification'
const readNotificationActions = new AdminClient.ReadNotificationActions(namespace)
const readNotificationReducer = AdminClient.getReadNotificationReducer(namespace)
const readNotificationSelectors = AdminClient.getReadNotificationSelectors(['modules.menu', 'readNotification'])

module.exports = {
  readNotificationActions,
  readNotificationReducer,
  readNotificationSelectors,
}
