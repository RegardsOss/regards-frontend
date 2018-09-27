/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import NotificationNone from 'material-ui/svg-icons/social/notifications-none'
import More from 'material-ui/svg-icons/navigation/chevron-right'
import Less from 'material-ui/svg-icons/navigation/expand-more'
import Notification from 'material-ui/svg-icons/social/notifications'
import Info from 'mdi-material-ui/InformationVariant'
import Skull from 'mdi-material-ui/Skull'
import Warning from 'material-ui/svg-icons/alert/warning'
import ClearAll from 'material-ui/svg-icons/communication/clear-all'
import Error from 'material-ui/svg-icons/alert/error'
import Avatar from 'material-ui/Avatar'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PageableInfiniteTableContainer, ShowableAtRender, PositionedDialog, TableColumnBuilder,
  TableLayout,
} from '@regardsoss/components'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import truncate from 'lodash/truncate'
import { FormattedMessage, FormattedDate } from 'react-intl'
import NotificationSystem from 'react-notification-system'
import { AdminShapes } from '@regardsoss/shape'
import FlatButton from 'material-ui/FlatButton'
import { CardHeader, CardText, CardActions } from 'material-ui/Card'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import NotificationItemComponent from './notification/NotificationItemComponent'
import { tableActions } from '../../clients/TableClient'

const MODE = {
  DISPLAY_UNREAD: 'DISPLAY_UNREAD',
  DISPLAY_READ: 'DISPLAY_READ',
}
/**
 * Notification List Component
 * @author Maxime Bouveron
 * @author Léo Mieulet
 */
class NotificationListComponent extends React.Component {
  static propTypes = {
    registerNotify: PropTypes.func,
    readNotification: PropTypes.func,
    readAllNotifications: PropTypes.func,
    notificationActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    notificationSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableActions to retrieve entities from server
    nbNotification: PropTypes.number,
    lastNotification: AdminShapes.Notification,
    nbReadNotification: PropTypes.number,
    lastReadNotification: AdminShapes.Notification,
    isInstance: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static MAX_ELEMENTS_COUNT = 9999

  static PAGE_SIZE = 40

  state = {
    openedNotification: null,
    mode: MODE.DISPLAY_UNREAD,
  }

  componentDidMount() {
    this.props.registerNotify(this.notify)
  }

  getRequestParams = (mode) => {
    const queryParams = {
      sort: 'id,desc',
    }
    if (mode === MODE.DISPLAY_UNREAD) {
      return {
        ...queryParams,
        state: 'UNREAD',
      }
    }
    return {
      ...queryParams,
      state: 'READ',
    }
  }

  /**
   * Gives a formatted date from a notification
   * @param notif notification
   */
  getFormattedDate = (nDate) => {
    const date = new Date()
    const notifDate = new Date(nDate)
    const isSameYear = date.getFullYear() === notifDate.getFullYear()
    return date.getDate() === notifDate.getDate()
      && date.getMonth() === notifDate.getMonth()
      && date.getFullYear() === notifDate.getFullYear() ? (
        <FormattedDate value={nDate} hour="2-digit" minute="2-digit" />
      ) : (
        <FormattedDate
          value={nDate}
          year={isSameYear ? undefined : '2-digit'}
          month="short"
          day="numeric"
        />
      )
  }

  notify = (notif) => {
    const {
      moduleTheme: { notifications: { notificationSystem: notificationSystemStyle } },
    } = this.context
    const levels = (type) => {
      switch (type) {
        case 'FATAL': return 'error'
        case 'ERROR': return 'warning'
        case 'INFO': return 'info'
        case 'WARNING': return 'warning'
        default: return 'info'
      }
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
      level: levels(notif.type),
      position: 'br',
      dismissible: false,
      autoDismiss: 7,
    })
  }

  handleOpen = (notification) => {
    this.notificationSystem.clearNotifications()
    if (this.state.openedNotification && notification.id !== this.state.openedNotification.id && notification.status === 'UNREAD') {
      this.props.readNotification(this.state.openedNotification)
    }
    this.setState({
      openedNotification: notification,
    })
  }

  handleOpenModal = () => {
    const { lastNotification, lastReadNotification } = this.props
    this.notificationSystem.clearNotifications()
    if (lastNotification) {
      this.setState({
        openedNotification: lastNotification.content,
        mode: MODE.DISPLAY_UNREAD,
      })
    } else {
      this.setState({
        openedNotification: lastReadNotification.content,
        mode: MODE.DISPLAY_READ,
      })
    }
  }
  handleSwitchMode = (mode) => {
    if (mode !== this.state.mode) {
      const newState = {
        mode,
      }
      const notif = mode === MODE.DISPLAY_READ ? get(this.props.lastReadNotification, 'content') : get(this.props.lastNotification, 'content')
      if (notif) {
        newState.notif = notif
      }
      this.setState(newState)
    }
  }

  handleClose = () => {
    this.props.readNotification(this.state.openedNotification)
    this.setState({
      openedNotification: null,
    })
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
        return <Avatar backgroundColor={icons.errorColor} color={icons.color} icon={<Error />} />
      case 'FATAL':
        return <Avatar backgroundColor={icons.fatalColor} color={icons.color} icon={<Skull />} />
      case 'WARNING':
        return <Avatar backgroundColor={icons.warningColor} color={icons.color} icon={<Warning />} />
      default:
        return <Avatar backgroundColor={icons.infoColor} color={icons.color} icon={<Info />} />
    }
  }

  handleReadAllNotifications = () => {
    this.props.readAllNotifications()
      .then(() => {
        this.handleSwitchMode(MODE.DISPLAY_READ)
      })
  }


  /**
   * Renders a notification list
   * @param mode display mode
   */
  renderNotificationList = (mode) => {
    const { moduleTheme: { notifications: notificationStyle } } = this.context
    const column = [
      new TableColumnBuilder('label-notif').rowCellDefinition({
        Constructor: NotificationItemComponent,
        props: {
          currentActiveEntity: this.state.openedNotification,
          handleOpenNotif: this.handleOpen,
          refetchData: this.refetchData,
        },
      }).build(),
    ]
    return [
      <List key={`title-${mode}`}>
        <Subheader
          style={notificationStyle.list.subHeader.style}
          onClick={() => { this.handleSwitchMode(mode) }}
        >
          <div style={notificationStyle.list.subHeader.titleWrapper}>
            {mode === this.state.mode ? <Less /> : <More />}
            <FormattedMessage id={`user.menu.notification.${mode === MODE.DISPLAY_UNREAD ? 'unread.' : ''}title`} />
          </div>
          {mode === MODE.DISPLAY_UNREAD
            ? <IconButton
              onClick={this.handleReadAllNotifications}
              title="Clear all"
            >
              <ClearAll />
            </IconButton>
            : null}
        </Subheader>
      </List>,
      mode === this.state.mode ? <TableLayout key="table">
        <PageableInfiniteTableContainer
          name="notif-management-table"
          pageActions={this.props.notificationActions}
          pageSelectors={this.props.notificationSelectors}
          tableActions={tableActions}
          queryPageSize={NotificationListComponent.PAGE_SIZE}
          displayColumnsHeader={false}
          columns={column}
          lineHeight={72}
          requestParams={this.getRequestParams(mode)}
        />
      </TableLayout> : null,
    ]
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
        bodyStyle={dialog.style}
        dialogHeightPercent={75}
        dialogWidthPercent={78}
      >
        <div style={dialog.wrapper.style}>
          <div style={dialog.list.style} className="col-xs-35 col-lg-25">
            {this.renderNotificationList(MODE.DISPLAY_UNREAD)}
            {this.renderNotificationList(MODE.DISPLAY_READ)}
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
              <FormattedMessage id="user.menu.notification.details.message" />
              :
              <br />
              <pre>
                {this.state.openedNotification.message}
              </pre>
            </CardText>
          </div>
        </div>
        <CardActions style={dialog.details.actions.style}>
          <FlatButton
            label={
              <FormattedMessage id="user.menu.notification.action.close" />
            }
            key="close"
            primary
            onClick={this.handleClose}
          />
        </CardActions>
      </PositionedDialog>
    ) : null
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: { notifications: notificationStyle, overlay },
    } = this.context
    const { nbNotification, nbReadNotification, isInstance } = this.props
    const unreadCount = nbNotification
    const readCount = nbReadNotification

    // compute label for current count
    const elementsCountLabel = unreadCount < NotificationListComponent.MAX_ELEMENTS_COUNT
      ? unreadCount
      : formatMessage(
        { id: 'user.menu.notification.max.count' },
        { maxCount: NotificationListComponent.MAX_ELEMENTS_COUNT },
      )

    // render
    return (
      <div>
        <IconButton
          title={isInstance ? formatMessage({ id: 'user.menu.notification.no-notification-for-instance' }) : 
            formatMessage(
              { id: 'user.menu.notification.elements.count.tooltip' },
              { elementsCount: unreadCount },
            )
          }
          style={notificationStyle.iconButton.style}
          iconStyle={notificationStyle.iconButton.iconStyle}
          disabled={unreadCount === 0 && readCount === 0}
          onClick={this.handleOpenModal}
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
