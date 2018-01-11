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
import { ShowableAtRender } from '@regardsoss/components'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider/Divider'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { FormattedMessage, FormattedDate } from 'react-intl'
import { AdminShapes } from '@regardsoss/shape'
import ReactMaterialUiNotifications from 'react-materialui-notifications'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { CardHeader, CardText, CardActions } from 'material-ui/Card'

/**
 * Notification List Component
 * @author Maxime Bouveron
 */
class NotificationListComponent extends React.Component {
  static propTypes = {
    notifications: AdminShapes.NotificationList,
    newNotifications: AdminShapes.NotificationArray,
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
    if (this.state.openedNotification) {
      if (notification.id !== this.state.openedNotification.id) {
        this.props.readNotification(this.state.openedNotification)
      }
    }
    this.setState({
      open: true,
      openedNotification: notification,
    })
  }

  handleClose = () => {
    this.props.readNotification(this.state.openedNotification)
    this.setState({ open: false })
  }

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
    return (
      <List>
        <Subheader style={notificationStyle.list.subHeader}>
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
            rightIconButton={
              <div style={notificationStyle.list.item.dateStyle}>
                {this.getFormattedDate(notif)}
              </div>
            }
            primaryText={notif.title}
          />,
          <Divider key={`divider-${notif.id}`} />,
        ])}
      </List>
    )
  }

  renderNotificationDialog = (unreadNotifications, readNotifications) => {
    const { moduleTheme: { notifications: { dialog } } } = this.context

    return this.state.openedNotification ? (
      <Dialog modal open={this.state.open} onRequestClose={this.handleClose}>
        <div style={dialog.wrapper.style}>
          <div style={dialog.list.style}>
            {this.renderNotificationList(unreadNotifications, true)}
            {this.renderNotificationList(readNotifications)}
          </div>
          <div>
            <CardHeader
              title={this.state.openedNotification.title}
              subtitle={this.context.intl.formatMessage(
                { id: 'user.menu.notification.details.sentby' },
                { sender: this.state.openedNotification.sender },
              )}
              avatar={this.renderAvatar(this.state.openedNotification.type)}
            />
            <div style={dialog.details.date.style}>
              {this.getFormattedDate(this.state.openedNotification)}
            </div>
            <CardText>Message: {this.state.openedNotification.message}</CardText>
            <CardActions style={dialog.details.actions.style}>
              <FlatButton label="Close" key="close" primary onClick={this.handleClose} />
            </CardActions>
          </div>
        </div>
      </Dialog>
    ) : null
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: { notifications: notificationStyle, overlay },
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
          onClick={() => this.handleOpen(unreadNotifications[0])}
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
        {this.renderNotificationDialog(unreadNotifications, readNotifications)}
        <ReactMaterialUiNotifications transitionAppear transitionLeave />
      </div>
    )
  }
}
export default NotificationListComponent
