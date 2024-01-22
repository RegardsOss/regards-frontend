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
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import NotificationNone from 'mdi-material-ui/BellOutline'
import Notification from 'mdi-material-ui/Bell'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonDomain } from '@regardsoss/domain'
import {
  ShowableAtRender, PositionedDialog,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import NotificationSystem from 'react-notification-system'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import NotificationDetailContainer from '../../../containers/user/notification/NotificationDetailContainer'
import NotificationFloatingMessage from './NotificationFloatingMessage'
import NotificationTableContainer from '../../../containers/user/notification/NotificationTableContainer'
import NotificationHeaderComponent from './NotificationHeaderComponent'
import { NOTIFICATION_FILTERS_I18N } from '../../../domain/filters'

/**
 * Display notification icon chip on main menu.
 * Display notification dialog, render header component (filters & group delete option) and render notification table component
 * @author Maxime Bouveron
 * @author Léo Mieulet
 * @author Théo Lasserre
 */
class NotificationListComponent extends React.Component {
  static propTypes = {
    registerNotify: PropTypes.func,
    readNotification: PropTypes.func,
    deleteNotifications: PropTypes.func,
    notificationActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    notificationSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableActions to retrieve entities from server
    nbNotificationUnreadAndError: PropTypes.number,
    isInstance: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static MAX_ELEMENTS_COUNT = 9999

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
    openedModal: false,
  }

  componentDidMount() {
    this.props.registerNotify(this.notify)
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

  /**
   * Open notification dialog
   */
  handleOpenModal = () => {
    this.notificationSystem.current.clearNotifications()
    this.setState({
      openedModal: true,
    })
  }

  /**
   * Close notification dialog
   */
  handleClose = () => {
    this.setState({
      openedModal: false,
    })
  }

  /**
   * Renders the notification center dialog
   */
  renderNotificationDialog = () => {
    const {
      notificationActions, notificationSelectors, isLoading, readNotification, deleteNotifications,
    } = this.props
    const {
      moduleTheme: { notifications: { dialog: { style } } },
    } = this.context
    const { openedModal } = this.state
    const { isInstance } = this.props
    return openedModal ? (
      <PositionedDialog
        modal
        open={!!this.state.openedModal}
        onRequestClose={this.handleClose}
        bodyStyle={style}
        dialogHeightPercent={75}
        dialogWidthPercent={85}
      >
        <TableFilterSortingAndVisibilityContainer
          pageActions={notificationActions}
          pageSelectors={notificationSelectors}
          isPagePostFetching
          onReadNotification={readNotification}
          onDeleteNotifications={deleteNotifications}
          filtersI18n={NOTIFICATION_FILTERS_I18N}
        >
          <NotificationHeaderComponent
            key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
            onCloseNotificationDialog={this.handleClose}
            isPaneOpened
          />
          <NotificationTableContainer
            key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
            notificationActions={notificationActions}
            notificationSelectors={notificationSelectors}
            isLoading={isLoading}
          />
        </TableFilterSortingAndVisibilityContainer>
        <NotificationDetailContainer isInstance={isInstance} />
      </PositionedDialog>
    ) : null
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: { notifications: notificationStyle, overlay },
    } = this.context
    const { nbNotificationUnreadAndError, isInstance } = this.props

    // compute label for current count
    const elementsCountLabel = nbNotificationUnreadAndError < NotificationListComponent.MAX_ELEMENTS_COUNT
      ? nbNotificationUnreadAndError
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
              { elementsCount: nbNotificationUnreadAndError },
            )}
          style={notificationStyle.iconButton.style}
          iconStyle={notificationStyle.iconButton.iconStyle}
          onClick={this.handleOpenModal}
        >
          {/*Create a free position chip over the icon */}
          <div>
            <ShowableAtRender show={!!nbNotificationUnreadAndError}>
              <div style={overlay.style}>
                <Chip labelStyle={overlay.chip.labelStyle} style={overlay.chip.style}>
                  {elementsCountLabel}
                </Chip>
              </div>
            </ShowableAtRender>
            {/* Show the icon */}
            {nbNotificationUnreadAndError ? (
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
