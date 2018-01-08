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
import Check from 'material-ui/svg-icons/navigation/check'
import Info from 'mdi-material-ui/InformationVariant'
import Warning from 'material-ui/svg-icons/alert/warning'
import Avatar from 'material-ui/Avatar'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { Popover } from 'material-ui/Popover'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider/Divider'
import map from 'lodash/map'
import filter from 'lodash/filter'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage, FormattedDate } from 'react-intl'
import { AdminShapes } from '@regardsoss/shape'
import ReactMaterialUiNotifications from 'react-materialui-notifications'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { CardHeader } from 'material-ui/Card'

/**
 * Notification List Component
 * @author Maxime Bouveron
 */
class NotificationListComponent extends React.Component {
  static propTypes = {
    notifications: AdminShapes.NotificationList,
    newNotifications: AdminShapes.NotificationArray,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static MAX_ELEMENTS_COUNT = 9999

  constructor(props) {
    super(props)
    this.state = {
      notificationShade: false,
      showAllNotifications: false,
    }
  }

  componentWillUpdate = () => {
    if (this.props.newNotifications) {
      this.props.newNotifications.forEach((notif) => {
        ReactMaterialUiNotifications.showNotification({
          title: notif.title,
          additionalText: notif.message,
          icon: this.renderAvatar(notif.type),
          onClick: () => this.handleOpen(notif),
          timestamp: this.getFormattedDate(notif),
        })
      })
    }
  }

  onNotificationOpen = (event) => {
    this.setState({
      notificationShade: true,
      showAllNotifications: false,
      anchorEl: event.currentTarget,
    })
  }

  onNotificationClose = () => {
    this.setState({
      notificationShade: false,
    })
  }

  onAllNotifications = () => {
    this.setState({
      showAllNotifications: !this.state.showAllNotifications,
    })
  }

  getFormattedDate = (notif) => {
    const date = new Date()
    const notifDate = new Date(notif.date)
    const isSameYear = date.getFullYear() === notifDate.getFullYear()
    return date.getDate() === notifDate.getDate() &&
      date.getMonth() === notifDate.getMonth() &&
      date.getFullYear() === notifDate.getFullYear() ? (
        <FormattedDate value={notif.date} hour="2-digit" minute="2-digit" />
      ) : (
        <FormattedDate
          value={notif.date}
          year={isSameYear ? undefined : '2-digit'}
          month="short"
          day="numeric"
          hour="2-digit"
          minute="2-digit"
        />
      )
  }

  handleOpen = (notification) => {
    this.setState({
      open: true,
      openedNotification: notification,
      notificationShade: false,
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  renderAvatar = (type) => {
    const { moduleTheme: { notifications: { popover: { icons } } } } = this.context
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

  renderUnreadNotificationList = (unreadNotifications) => {
    const { moduleTheme: { notifications: notificationStyle } } = this.context

    return (
      <List style={notificationStyle.popover.unreadList.style}>
        <Subheader>
          <FormattedMessage id="user.menu.notification.title" />
        </Subheader>
        {map(unreadNotifications, notif => [
          <ListItem
            onClick={() => this.handleOpen(notif)}
            key={`notification-${notif.id}`}
            primaryText={notif.title}
            leftAvatar={this.renderAvatar(notif.type)}
            rightIconButton={
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8em' }}>
                {this.getFormattedDate(notif)}
                <IconButton>
                  <Check />
                </IconButton>
              </div>
            }
            secondaryText={<p>{notif.message}</p>}
            secondaryTextLines={2}
          />,
          <Divider key={`divider-${notif.id}`} />,
        ])}
      </List>
    )
  }

  renderReadNotificationList = (readNotifications) => {
    const { moduleTheme: { notifications: notificationStyle } } = this.context
    return (
      <List style={notificationStyle.popover.readList.style}>
        {map(readNotifications, notif => [
          <ListItem
            onClick={() => this.handleOpen(notif)}
            style={notificationStyle.popover.readList.item.style}
            key={`notification-${notif.id}`}
            leftAvatar={this.renderAvatar(notif.type)}
            rightIconButton={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.8em',
                  paddingTop: 16,
                  paddingRight: 16,
                }}
              >
                {this.getFormattedDate(notif)}
              </div>
            }
            primaryText={notif.title}
            secondaryText={<p>{notif.message}</p>}
            secondaryTextLines={2}
          />,
          <Divider key={`divider-${notif.id}`} />,
        ])}
      </List>
    )
  }

  renderNotificationDialog = (notification) => {
    const actions = [
      <FlatButton label="Mark as read" key="read" primary onClick={this.handleClose} />,
      <FlatButton label="Delete" key="delete" primary onClick={this.handleClose} />,
      <FlatButton label="Cancel" key="cancel" onClick={this.handleClose} />,
    ]
    return notification ? (
      <Dialog
        title={
          <CardHeader title={notification.title} avatar={this.renderAvatar(notification.type)} />
        }
        actions={actions}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        id: {notification.id}
        <br />
        Sender: {notification.sender}
        <br />
        Message: {notification.message}
        <br />
      </Dialog>
    ) : null
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: { notifications: notificationStyle },
    } = this.context

    const unreadNotifications = filter(this.props.notifications, notif => notif.status === 'UNREAD')
    const readNotifications = filter(this.props.notifications, notif => notif.status === 'READ')
    const unreadCount = unreadNotifications.length

    // compute label for current count
    const elementsCountLabel =
      unreadCount < NotificationListComponent.MAX_ELEMENTS_COUNT
        ? unreadCount
        : formatMessage(
          { id: 'user.menu.notification.max.count' },
          { maxCount: NotificationListComponent.MAX_ELEMENTS_COUNT },
        )

    const anchorOrigin = { horizontal: 'right', vertical: 'bottom' }
    const targetOrigin = { horizontal: 'right', vertical: 'top' }

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
          onClick={this.onNotificationOpen}
        >
          {/*Create a free position chip over the icon */}
          <div>
            <ShowableAtRender show={!!unreadCount}>
              <div style={notificationStyle.overlay.style}>
                <Chip
                  labelStyle={notificationStyle.overlay.chip.labelStyle}
                  style={notificationStyle.overlay.chip.style}
                >
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
        <Popover
          open={this.state.notificationShade}
          style={notificationStyle.popover.style}
          anchorEl={this.state.anchorEl}
          anchorOrigin={anchorOrigin}
          targetOrigin={targetOrigin}
          onRequestClose={this.onNotificationClose}
        >
          <div style={notificationStyle.popover.wrapperDiv.style}>
            {unreadNotifications.length === 0 ? (
              <div style={notificationStyle.popover.noNewNotifications.style}>
                <NotificationNone style={notificationStyle.popover.noNewNotifications.iconStyle} />
                <FormattedMessage id="user.menu.notification.empty" />
              </div>
            ) : (
              this.renderUnreadNotificationList(unreadNotifications)
            )}
            <ShowableAtRender show={readNotifications.length !== 0}>
              <RaisedButton
                onClick={this.onAllNotifications}
                style={notificationStyle.popover.showNotificationsButton.style}
                label={formatMessage({
                  id: this.state.showAllNotifications
                    ? 'user.menu.notification.hide.button'
                    : 'user.menu.notification.view.button',
                })}
              />
            </ShowableAtRender>
            <ShowableAtRender show={this.state.showAllNotifications}>
              {this.renderReadNotificationList(readNotifications)}
            </ShowableAtRender>
          </div>
        </Popover>
        {this.renderNotificationDialog(this.state.openedNotification)}
        <ReactMaterialUiNotifications transitionAppear transitionLeave />
      </div>
    )
  }
}
export default NotificationListComponent
