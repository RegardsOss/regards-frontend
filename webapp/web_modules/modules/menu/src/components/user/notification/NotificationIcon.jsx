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
import get from 'lodash/get'
import Avatar from 'material-ui/Avatar'
import Info from 'mdi-material-ui/InformationVariant'
import Warning from 'mdi-material-ui/Alert'
import Error from 'mdi-material-ui/AlertCircle'
import Skull from 'mdi-material-ui/Skull'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * A notification icon
 * @author Raphaël Mechali
 */
class NotificationIcon extends React.Component {
  static propTypes = {
    entity: AdminShapes.NotificationWithinContent,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.objectOf(PropTypes.any), // sent by parent component OR MUI card
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { style, entity } = this.props

    const { intl: { formatMessage }, moduleTheme: { notifications: { levelIcon } } } = this.context
    const level = get(entity, 'content.level')
    switch (level) {
      case 'INFO':
        return <Avatar title={formatMessage({ id: 'user.menu.notification.filters.levels.INFO' })} size={30} backgroundColor={levelIcon.infoColor} color={levelIcon.color} icon={<Info />} style={style} />
      case 'ERROR':
        return <Avatar title={formatMessage({ id: 'user.menu.notification.filters.levels.ERROR' })} size={30} backgroundColor={levelIcon.errorColor} color={levelIcon.color} icon={<Error />} style={style} />
      case 'FATAL':
        return <Avatar title={formatMessage({ id: 'user.menu.notification.filters.levels.FATAL' })} size={30} backgroundColor={levelIcon.fatalColor} color={levelIcon.color} icon={<Skull />} style={style} />
      case 'WARNING':
        return <Avatar title={formatMessage({ id: 'user.menu.notification.filters.levels.WARNING' })} size={30} backgroundColor={levelIcon.warningColor} color={levelIcon.color} icon={<Warning />} style={style} />
      default:
        return <Avatar title={formatMessage({ id: 'user.menu.notification.filters.levels.INFO' })} size={30} backgroundColor={levelIcon.infoColor} color={levelIcon.color} icon={<Info />} style={style} />
    }
  }
}
export default NotificationIcon
