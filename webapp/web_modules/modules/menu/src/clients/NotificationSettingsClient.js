/**
 * LICENSE_PLACEHOLDER
 **/
import { AdminClient } from '@regardsoss/client'

/**
 * Client to request notification resources.
 *
 * @author Maxime Bouveron
 */
const namespace = 'menu/notification-settings'
const notificationSettingsActions = new AdminClient.NotificationSettingsActions(namespace)
const notificationSettingsReducer = AdminClient.getNotificationSettingsReducer(namespace)
const notificationSettingsSelectors = AdminClient.getNotificationSettingsSelectors(['modules.menu', 'notificationSettings'])

module.exports = {
  notificationSettingsActions,
  notificationSettingsReducer,
  notificationSettingsSelectors,
}
