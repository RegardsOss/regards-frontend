/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'
import FormattedNotificationDate from './FormattedNotificationDate'
import NotificationIcon from './NotificationIcon'

/**
 * Floating message to display notification
 * @author Raphaël Mechali
 */
class NotificationFloatingMessage extends React.Component {
  static propTypes = {
    notification: AdminShapes.Notification.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { notification } = this.props
    const floatingMessageTheme = this.context.moduleTheme.notifications.notificationSystem.message
    const {
      moduleTheme: { notifications: { notificationSystem: notificationSystemStyle } },
    } = this.context
    return (
      <div
        role="presentation"
        style={notificationSystemStyle.message.rootStyle}
      >
        <NotificationIcon notification={notification} />
        <div style={floatingMessageTheme.containerStyle}>
          {/* Date */}
          <div style={floatingMessageTheme.dateStyle}>
            <FormattedNotificationDate notification={notification} />
          </div>
          {/* Title */}
          <div style={floatingMessageTheme.titleStyle}>{notification.title}</div>
          {/* Message content */}
          <div style={floatingMessageTheme.messageStyle}>
            { // Render through IIF
            (() => {
              switch (notification.mimeType) {
                case MIME_TYPES.HTML_MIME_TYPE:
                  // eslint-disable-next-line
                  return <div className="html-notification" dangerouslySetInnerHTML={{ __html:notification.message}} />
                case MIME_TYPES.TEXT:
                default:
                  return notification.message
              }
            })()
          }
          </div>
        </div>
      </div>
    )
  }
}
export default NotificationFloatingMessage
