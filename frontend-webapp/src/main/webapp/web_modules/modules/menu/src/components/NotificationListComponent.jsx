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

/**
 * Notification List Component
 * @author Maxime Bouveron
 */
class NotificationListComponent extends React.Component {
  static propTypes = {
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

  onNotificationOpen = (event) => {
    this.setState({
      notificationShade: true,
      anchorEl: event.currentTarget,
    })
  }

  onNotificationClose = () => {
    this.setState({
      notificationShade: false,
      showAllNotifications: false,
    })
  }

  onAllNotifications = () => {
    this.setState({
      showAllNotifications: !this.state.showAllNotifications,
    })
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { cart } } = this.context

    const unreadNotifications = filter(this.props.notifications, notif => notif.status === 'UNREAD')
    const readNotifications = filter(this.props.notifications, notif => notif.status === 'READ')
    const unreadCount = unreadNotifications.length

    // compute label for current count
    const elementsCountLabel =
      unreadCount < NotificationListComponent.MAX_ELEMENTS_COUNT
        ? unreadCount
        : formatMessage(
          { id: 'user.menu.cart.max.count' },
          { maxCount: NotificationListComponent.MAX_ELEMENTS_COUNT },
        )

    // compute tooltip for current count
    const elementsCountTooltip = unreadCount
      ? formatMessage(
        { id: 'user.menu.displaycart.elements.count.tooltip' },
        { elementsCount: unreadCount },
      )
      : formatMessage({ id: 'user.menu.displaycart.empty.tooltip' })


    // render
    return (
      <div>
        <IconButton
          title={formatMessage({ id: 'user.menu.displaycart.tooltip' }, { elementsCountTooltip })}
          style={cart.iconButton.style}
          iconStyle={cart.iconButton.iconStyle}
          onClick={this.onNotificationOpen}
        >
          {/*Create a free position chip over the icon */}
          <div>
            <ShowableAtRender show={!!unreadCount}>
              <div style={cart.overlay.style}>
                <Chip labelStyle={cart.overlay.chip.labelStyle} style={cart.overlay.chip.style}>
                  {elementsCountLabel}
                </Chip>
              </div>
            </ShowableAtRender>
            {/* Show the icon */}
            {unreadCount ? (
              <Notification style={cart.icon.style} />
            ) : (
              <NotificationNone style={cart.icon.style} />
            )}
          </div>
        </IconButton>
        <Popover
          open={this.state.notificationShade}
          style={{ width: 325 }}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.onNotificationClose}
        >
          <List>
            <Subheader>Notifications</Subheader>
            {map(unreadNotifications, notif => [
              <ListItem
                key={notif.id}
                primaryText={notif.title}
                rightIconButton={
                  <IconButton>
                    <Close />
                  </IconButton>
                }
                secondaryText={<p>{notif.message}</p>}
                secondaryTextLines={2}
              />,
              <Divider key={notif.id} />,
            ])}
          </List>
          <RaisedButton
            onClick={this.onAllNotifications}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            View all notifications
          </RaisedButton>
          <ShowableAtRender show={this.state.showAllNotifications}>
            <List>
              {map(readNotifications, notif => [
                <ListItem
                  style={{ opacity: 0.5 }}
                  key={notif.id}
                  primaryText={notif.title}
                  secondaryText={<p>{notif.message}</p>}
                  secondaryTextLines={2}
                />,
                <Divider key={notif.id} />,
              ])}
            </List>
          </ShowableAtRender>
        </Popover>
      </div>
    )
  }
}
export default NotificationListComponent
