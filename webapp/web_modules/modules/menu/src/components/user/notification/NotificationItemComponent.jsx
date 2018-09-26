
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
import Info from 'mdi-material-ui/InformationVariant'
import Skull from 'mdi-material-ui/Skull'
import Warning from 'material-ui/svg-icons/alert/warning'
import Error from 'material-ui/svg-icons/alert/error'
import Avatar from 'material-ui/Avatar'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FormattedDate } from 'react-intl'
import { AdminShapes } from '@regardsoss/shape'

/**
 * Notification List Component
 * @author Léo Mieulet
 */
export default class NotificationItemComponent extends React.Component {
  static propTypes = {
    entity: AdminShapes.Notification,
    currentActiveEntity: AdminShapes.Notification,
    handleOpenNotif: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Gives a formatted date from a notification
   * @param notif notification
   */
  getFormattedDate = () => {
    const { entity } = this.props
    const nDate = entity.content.date
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

  /**
   * Renders an avatar based on a notification's type
   */
  renderAvatar = () => {
    const { moduleTheme: { notifications: { list: { icons } } } } = this.context
    const { entity } = this.props
    const styleIcon = {
      position: 'absolute',
      top: '14px',
      left: '16px',
    }
    switch (entity.content.type) {
      case 'INFO':
        return <Avatar style={styleIcon} backgroundColor={icons.infoColor} color={icons.color} icon={<Info />} />
      case 'ERROR':
        return <Avatar style={styleIcon} backgroundColor={icons.errorColor} color={icons.color} icon={<Error />} />
      case 'FATAL':
        return <Avatar style={styleIcon} backgroundColor={icons.fatalColor} color={icons.color} icon={<Skull />} />
      case 'WARNING':
        return <Avatar style={styleIcon} backgroundColor={icons.warningColor} color={icons.color} icon={<Warning />} />
      default:
        return <Avatar style={styleIcon} backgroundColor={icons.infoColor} color={icons.color} icon={<Info />} />
    }
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
   * Renders a notification list
   * @param notifications Array containing the notifications to show
   * @param unread Is the array containing unread notifications ?
   */
  render = () => {
    const { moduleTheme: { notifications: notificationStyle } } = this.context
    const { entity } = this.props
    const styleContentWrapper = this.itemStyle()
    return (
      <div
        style={styleContentWrapper}
        onClick={() => this.props.handleOpenNotif(entity.content)}
      >
        {this.renderAvatar()}
        <div style={notificationStyle.list.item.primaryText}>
          <div
            title={entity.content.title}
            style={notificationStyle.list.item.titleStyle}
          >
            {entity.content.title}
          </div>
          <div style={notificationStyle.list.item.dateStyle}>
            {this.getFormattedDate()}
          </div>
        </div>
      </div>
    )
  }
}
