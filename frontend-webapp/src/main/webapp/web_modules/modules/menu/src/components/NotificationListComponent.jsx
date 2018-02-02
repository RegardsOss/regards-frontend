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
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import NotificationNone from 'material-ui/svg-icons/social/notifications-none'
import Notification from 'material-ui/svg-icons/social/notifications'
import Close from 'material-ui/svg-icons/navigation/close'
import Info from 'mdi-material-ui/InformationVariant'
import Warning from 'material-ui/svg-icons/alert/warning'
import ClearAll from 'material-ui/svg-icons/communication/clear-all'
import Avatar from 'material-ui/Avatar'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender, PositionedDialog } from '@regardsoss/components'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider/Divider'
import map from 'lodash/map'
import truncate from 'lodash/truncate'
import { FormattedMessage, FormattedDate } from 'react-intl'
import NotificationSystem from 'react-notification-system'
import { AdminShapes } from '@regardsoss/shape'
import FlatButton from 'material-ui/FlatButton'
import { CardHeader, CardText, CardActions } from 'material-ui/Card'

/**
 * Notification List Component
 * @author Maxime Bouveron
 */
class NotificationListComponent extends React.Component {
  static propTypes = {
    readNotifications: AdminShapes.NotificationArray,
    unreadNotifications: AdminShapes.NotificationArray,
    registerNotify: PropTypes.func,
    readNotification: PropTypes.func,
    readAllNotifications: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static MAX_ELEMENTS_COUNT = 9999

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.registerNotify(this.notify)
  }

  /**
   * Gives a formatted date from a notification
   * @param notif notification
   */
  getFormattedDate = (nDate) => {
    const date = new Date()
    const notifDate = new Date(nDate)
    const isSameYear = date.getFullYear() === notifDate.getFullYear()
    return date.getDate() === notifDate.getDate() &&
      date.getMonth() === notifDate.getMonth() &&
      date.getFullYear() === notifDate.getFullYear() ? (
        <FormattedDate value={nDate} hour="2-digit" minute="2-digit" />
      ) : (
        <FormattedDate
          value={nDate}
          year={isSameYear ? undefined : '2-digit'}
          month="short"
          day="numeric"
          hour="2-digit"
          minute="2-digit"
        />
      )
  }

  notify = (notif) => {
    const {
      moduleTheme: { notifications: { notificationSystem: notificationSystemStyle } },
    } = this.context
    const levels = {
      FATAL: 'error',
      ERROR: 'warning',
      INFO: 'info',
    }
    this.notificationSystem.addNotification({
      message: (
        <div
          role="presentation"
          style={notificationSystemStyle.message.style}
          onClick={() => this.handleOpen(notif)}
        >
          {this.renderAvatar(notif.type)}
          <div>
            <div style={notificationSystemStyle.message.titleStyle}>{notif.title}</div>
            <div style={notificationSystemStyle.message.messageStyle}>
              {truncate(notif.message, { length: 100 })}
            </div>
            <div style={notificationSystemStyle.message.dateStyle}>
              {this.getFormattedDate(notif.date)}
            </div>
          </div>
        </div>
      ),
      level: levels[notif.type],
      position: 'br',
      dismissible: false,
      autoDismiss: 7,
    })
  }

  handleOpen = (notification) => {
    this.notificationSystem.clearNotifications()
    if (this.state.openedNotification) {
      if (notification.id !== this.state.openedNotification.id) {
        this.props.readNotification(this.state.openedNotification)
      }
    }
    this.setState({
      openedNotification: notification,
    })
  }

  handleClose = () => {
    this.props.readNotification(this.state.openedNotification)
    this.setState({ openedNotification: undefined })
  }

  /**
   * Renders an avatar based on a notification's type
   * @param type notification type
   */
  renderAvatar = (type) => {
    const { moduleTheme: { notifications: { list: { icons } } } } = this.context
    switch (type) {
      case 'INFO':
        return <Avatar backgroundColor={icons.infoColor} color={icons.color} icon={<Info />} />
      case 'ERROR':
        return <Avatar backgroundColor={icons.errorColor} color={icons.color} icon={<Warning />} />
      case 'FATAL':
        return <Avatar backgroundColor={icons.fatalColor} color={icons.color} icon={<Close />} />
      default:
        return <Avatar backgroundColor={icons.infoColor} color={icons.color} icon={<Info />} />
    }
  }

  /**
   * Renders a notification list
   * @param notifications Array containing the notifications to show
   * @param unread Is the array containing unread notifications ?
   */
  renderNotificationList = (notifications, unread = false) => {
    const { moduleTheme: { notifications: notificationStyle } } = this.context
    const itemStyle = (item) => {
      let style = {}
      if (!unread) {
        style = {
          ...style,
          ...notificationStyle.list.item.style,
        }
      }
      if (item.id === this.state.openedNotification.id) {
        style = {
          ...style,
          ...notificationStyle.list.selectedItem.style,
        }
      }
      return style
    }
    return notifications.length > 0 ? (
      <List>
        <Subheader style={notificationStyle.list.subHeader.style}>
          <FormattedMessage id={`user.menu.notification.${unread ? 'unread.' : ''}title`} />
          <ShowableAtRender show={unread}>
            <IconButton
              onClick={() => this.props.readAllNotifications(notifications)}
              title="Clear all"
            >
              <ClearAll />
            </IconButton>
          </ShowableAtRender>
        </Subheader>
        {map(notifications, notif => [
          <ListItem
            onClick={() => this.handleOpen(notif)}
            style={itemStyle(notif)}
            key={`notification-${notif.id}`}
            leftAvatar={this.renderAvatar(notif.type)}
            primaryText={
              <div style={notificationStyle.list.item.primaryText}>
                <div style={notificationStyle.list.item.titleStyle}>{notif.title}</div>
                <div style={notificationStyle.list.item.dateStyle}>
                  {this.getFormattedDate(notif.date)}
                </div>
              </div>
            }
          />,
          <Divider
            inset
            style={notificationStyle.list.divider.style}
            key={`divider-${notif.id}`}
          />,
        ])}
      </List>
    ) : null
  }

  /**
   * Renders the notification center dialog
   */
  renderNotificationDialog = () => {
    const { moduleTheme: { notifications: { dialog } } } = this.context

    return this.state.openedNotification ? (
      <PositionedDialog
        modal
        open={!!this.state.openedNotification}
        onRequestClose={this.handleClose}
        bodyStyle={{ height: '100%' }}
        dialogHeightPercent={60}
        dialogWidthPercent={78}
      >
        <div style={dialog.wrapper.style}>
          <div style={dialog.list.style} className="col-xs-35 col-lg-25">
            {this.renderNotificationList(this.props.unreadNotifications, true)}
            {this.renderNotificationList(this.props.readNotifications)}
          </div>
          <div className="col-xs-65 col-lg-75" style={dialog.details.container.style}>
            <div style={dialog.details.header.style}>
              <CardHeader
                title={this.state.openedNotification.title}
                subtitle={this.context.intl.formatMessage(
                  { id: 'user.menu.notification.details.sentby' },
                  { sender: this.state.openedNotification.sender },
                )}
                avatar={this.renderAvatar(this.state.openedNotification.type)}
              />
              <div style={dialog.details.date.style}>
                {this.getFormattedDate(this.state.openedNotification.date)}
              </div>
            </div>
            <CardText style={dialog.details.message.style}>
              <FormattedMessage id="user.menu.notification.details.message" />:<br />
              {this.state.openedNotification.message}
            </CardText>
          </div>
        </div>
        <CardActions style={dialog.details.actions.style}>
          <FlatButton label="Close" key="close" primary onClick={this.handleClose} />
        </CardActions>
      </PositionedDialog>
    ) : null
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: { notifications: notificationStyle, overlay },
    } = this.context

    const unreadCount = this.props.unreadNotifications.length
    const readCount = this.props.readNotifications.length

    // compute label for current count
    const elementsCountLabel =
      unreadCount < NotificationListComponent.MAX_ELEMENTS_COUNT
        ? unreadCount
        : formatMessage(
          { id: 'user.menu.notification.max.count' },
          { maxCount: NotificationListComponent.MAX_ELEMENTS_COUNT },
        )

    // render
    return (
      <div>
        <IconButton
          title={formatMessage(
            { id: 'user.menu.notification.elements.count.tooltip' },
            { elementsCount: unreadCount },
          )}
          style={notificationStyle.iconButton.style}
          iconStyle={notificationStyle.iconButton.iconStyle}
          disabled={!unreadCount && !readCount}
          onClick={() =>
            this.handleOpen(
              unreadCount > 0 ? this.props.unreadNotifications[0] : this.props.readNotifications[0],
            )
          }
        >
          {/*Create a free position chip over the icon */}
          <div>
            <ShowableAtRender show={!!unreadCount}>
              <div style={overlay.style}>
                <Chip labelStyle={overlay.chip.labelStyle} style={overlay.chip.style}>
                  {elementsCountLabel}
                </Chip>
              </div>
            </ShowableAtRender>
            {/* Show the icon */}
            {unreadCount ? (
              <Notification style={notificationStyle.icon.style} />
            ) : (
              <NotificationNone style={notificationStyle.icon.style} />
              )}
          </div>
        </IconButton>
        {this.renderNotificationDialog()}
        <NotificationSystem
          ref={(ref) => {
            this.notificationSystem = ref
          }}
          style={notificationStyle.notificationSystem.style}
        />
      </div>
    )
  }
}
export default NotificationListComponent
