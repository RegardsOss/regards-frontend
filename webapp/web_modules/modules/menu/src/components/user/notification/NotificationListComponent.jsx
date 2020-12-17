/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import NotificationNone from 'mdi-material-ui/BellOutline'
import More from 'mdi-material-ui/ChevronRight'
import Less from 'mdi-material-ui/ChevronDown'
import Notification from 'mdi-material-ui/Bell'
import ClearAll from 'mdi-material-ui/NotificationClearAll'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PageableInfiniteTableContainer, ShowableAtRender, PositionedDialog, TableColumnBuilder,
  TableLayout,
} from '@regardsoss/components'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import NotificationSystem from 'react-notification-system'
import { AdminShapes } from '@regardsoss/shape'
import FlatButton from 'material-ui/FlatButton'
import { CardActions } from 'material-ui/Card'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { tableActions } from '../../../clients/TableClient'
import NotificationItemComponent from './NotificationItemComponent'
import NotificationDetailContainer from '../../../containers/user/notification/NotificationDetailContainer'
import NotificationFloatingMessage from './NotificationFloatingMessage'

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
    deleteReadNotifications: PropTypes.func,
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

  /** Conversion map: notiication level to floating message level */
  static NOTIFICATION_TO_MESSAGE_LEVEL = {
    FATAL: 'error',
    ERROR: 'warning',
    WARNING: 'warning',
    INFO: 'info',
    DEFAULT: 'info',
  }

  /** Constants to display the notification as a floating message on screen */
  static NOTIFICATION_MESSAGE_CONSTANTS = {
    dismissible: true,
    autoDismiss: 5,
    position: 'br',
  }

  /** Notification system component reference */
  notificationSystem = React.createRef()

  state = {
    openedNotification: null,
    mode: MODE.DISPLAY_UNREAD,
  }

  componentDidMount() {
    this.props.registerNotify(this.notify)
  }

  getRequestParams = (mode) => {
    if (mode === MODE.DISPLAY_UNREAD) {
      return {
        state: 'UNREAD',
      }
    }
    return {
      state: 'READ',
    }
  }

  /**
   * Sends notification to floating messages handler
   * @param {*} notification Notification as AdminShapes.Notification
   */
  notify = (notification) => this.notificationSystem.current.addNotification({
    message: <NotificationFloatingMessage notification={notification} />,
    level: NotificationListComponent.NOTIFICATION_TO_MESSAGE_LEVEL[notification.level]
      || NotificationListComponent.NOTIFICATION_TO_MESSAGE_LEVEL.DEFAULT,
    ...NotificationListComponent.NOTIFICATION_MESSAGE_CONSTANTS,
  })

  handleOpen = (notification) => {
    this.notificationSystem.current.clearNotifications()
    if (this.state.openedNotification && notification.id !== this.state.openedNotification.id && notification.status === 'UNREAD') {
      this.props.readNotification(this.state.openedNotification)
    }
    this.setState({
      openedNotification: notification,
    })
  }

  handleOpenModal = () => {
    const { lastNotification, lastReadNotification } = this.props
    this.notificationSystem.current.clearNotifications()
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
  renderNotificationList = (mode, nbNotif) => { // TODO: EXTRACT A COMPONENT
    const { moduleTheme: { notifications: notificationStyle } } = this.context
    return [
      <List key={`title-${mode}`}>
        <Subheader
          style={notificationStyle.list.subHeader.style}
          onClick={() => { this.handleSwitchMode(mode) }}
        >
          <div style={notificationStyle.list.subHeader.titleWrapper}>
            {mode === this.state.mode ? <Less /> : <More />}
            <FormattedMessage id={`user.menu.notification.${mode === MODE.DISPLAY_UNREAD ? 'unread.' : ''}title`} values={{ count: nbNotif }} />
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
          // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
          columns={[ // eslint wont fix: infinite table API issue, requires API refactor
            new TableColumnBuilder('label-notif').rowCellDefinition({
              Constructor: NotificationItemComponent,
              props: {
                currentActiveEntity: this.state.openedNotification,
                handleOpenNotif: this.handleOpen,
                refetchData: this.refetchData,
              },
            }).build(),
          ]}
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
    const { openedNotification } = this.state
    const { isInstance } = this.props
    return openedNotification ? (
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
            {this.renderNotificationList(MODE.DISPLAY_UNREAD, this.props.nbNotification)}
            {this.renderNotificationList(MODE.DISPLAY_READ, this.props.nbReadNotification)}
          </div>
          <div className="col-xs-65 col-lg-75" style={dialog.details.container.style}>
            <NotificationDetailContainer isInstance={isInstance} notificationId={openedNotification ? openedNotification.id : -1} />
          </div>
        </div>
        <CardActions style={dialog.details.actions.style}>
          <FlatButton
            label={
              <FormattedMessage id="user.menu.notification.action.delete.read" />
            }
            key="delete"
            primary
            onClick={this.props.deleteReadNotifications}
          />
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
          title={isInstance ? formatMessage({ id: 'user.menu.notification.no-notification-for-instance' })
            : formatMessage(
              { id: 'user.menu.notification.elements.count.tooltip' },
              { elementsCount: unreadCount },
            )}
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
          ref={this.notificationSystem}
          style={notificationStyle.notificationSystem.style}
        />
      </div>
    )
  }
}
export default NotificationListComponent
