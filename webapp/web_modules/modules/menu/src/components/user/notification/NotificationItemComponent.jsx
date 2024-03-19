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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import FormattedNotificationDate from './FormattedNotificationDate'
import NotificationIcon from './NotificationIcon'

/**
 * Notification List item Component
 * @author Léo Mieulet
 */
export default class NotificationItemComponent extends React.Component {
  static propTypes = {
    entity: AdminShapes.NotificationWithinContent,
    currentActiveEntity: AdminShapes.Notification,
    handleOpenNotif: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  itemStyle = () => {
    const { entity, currentActiveEntity } = this.props
    const { moduleTheme: { notifications: notificationStyle } } = this.context

    if (entity.content.id === currentActiveEntity.id) {
      return {
        ...notificationStyle.list.item.style,
        ...notificationStyle.list.selectedItem.style,
      }
    }
    if (entity.content.status === 'READ') {
      return {
        ...notificationStyle.list.item.style,
        ...notificationStyle.list.readItem.style,
      }
    }
    return notificationStyle.list.item.style
  }

  /**
   * User callback: open notification
   */
  onOpenNotification = () => {
    const { entity: { content }, handleOpenNotif } = this.props
    handleOpenNotif(content)
  }

  /**
   * Renders a notification list
   * @param notifications Array containing the notifications to show
   * @param unread Is the array containing unread notifications ?
   */
  render() {
    const { moduleTheme: { notifications: { list: { item } } } } = this.context
    const { entity } = this.props
    const styleContentWrapper = this.itemStyle()
    return (
      <div
        style={styleContentWrapper}
        onClick={this.onOpenNotification}
      >
        <NotificationIcon
          entity={entity}
          style={item.iconStyle}
        />
        <div style={item.primaryText}>
          <div
            title={entity.content.title}
            style={item.titleStyle}
          >
            {entity.content.title}
          </div>
          <div style={item.dateStyle}>
            <FormattedNotificationDate notification={entity.content} />
          </div>
        </div>
      </div>
    )
  }
}
