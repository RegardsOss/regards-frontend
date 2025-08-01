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
import NotificationNone from 'mdi-material-ui/BellOffOutline'
import { CardHeader, CardText } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { MIME_TYPES } from '@regardsoss/mime-types'
import NotificationIcon from './NotificationIcon'
import FormattedNotificationDate from './FormattedNotificationDate'
import '../../../styles/styles.css'

/**
 * Shows a notification detail: title, subtile, content...
 * @author Raphaël Mechali
 */
class NotificationDetailComponent extends React.Component {
  static propTypes = {
    notification: AdminShapes.Notification,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  renderNotification = () => {
    const { notification } = this.props
    const { intl: { formatMessage }, moduleTheme: { notifications: { dialog: { details } } } } = this.context
    const notificationWithContent = { content: notification }
    return (
      <>
        <div style={details.header.style}>
          <CardHeader
            title={notification.title}
            subtitle={formatMessage({ id: 'user.menu.notification.details.sentby' }, { sender: notification.sender })}
            avatar={<NotificationIcon entity={notificationWithContent} />}
          />
          <div style={details.date.style}>
            <FormattedNotificationDate notification={notification} />
          </div>
        </div>
        <CardText style={details.message.style}>
          { // Render through IIF
            (() => {
              switch (notification.mimeType) {
                case MIME_TYPES.HTML_MIME_TYPE:
                  // eslint-disable-next-line
                  return <div className="html-notification" dangerouslySetInnerHTML={{ __html: notification.message }} />
                case MIME_TYPES.TEXT:
                default:
                  return (
                    <pre>
                      {notification.message}
                    </pre>
                  )
              }
            })()
          }

        </CardText>
      </>
    )
  }

  renderNoNotificationSelected = () => {
    const { muiTheme, intl: { formatMessage }, moduleTheme: { notifications: { dialog: { details: { emptyStyle } } } } } = this.context
    return (
      <div style={emptyStyle.mainDiv}>
        <NotificationNone color={muiTheme.components.noData.icon.color} style={emptyStyle.iconStyle} />
        <div style={emptyStyle.messageStyle}>{formatMessage({ id: 'user.menu.notification.empty.title' })}</div>
      </div>
    )
  }

  render() {
    const { notification } = this.props
    const { moduleTheme: { notifications: { dialog: { details } } } } = this.context
    return (
      <div style={details.header.main}>
        {notification ? this.renderNotification() : this.renderNoNotificationSelected()}
      </div>)
  }
}

export default NotificationDetailComponent
