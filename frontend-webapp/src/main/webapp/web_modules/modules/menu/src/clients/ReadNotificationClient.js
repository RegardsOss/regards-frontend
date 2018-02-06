/**
 * LICENSE_PLACEHOLDER
 **/
import { AdminClient } from '@regardsoss/client'

const namespace = 'menu/read-notification'
const readNotificationActions = new AdminClient.ReadNotificationActions(namespace)
const readNotificationReducer = AdminClient.getReadNotificationReducer(namespace)
const readNotificationInstanceActions = new AdminClient.ReadNotificationActions(namespace, true)
const readNotificationInstanceReducer = AdminClient.getReadNotificationReducer(namespace, true)
const readNotificationSelectors = AdminClient.getReadNotificationSelectors([
  'modules.menu',
  'readNotification',
])

module.exports = {
  readNotificationActions,
  readNotificationReducer,
  readNotificationInstanceActions,
  readNotificationInstanceReducer,
  readNotificationSelectors,
}
