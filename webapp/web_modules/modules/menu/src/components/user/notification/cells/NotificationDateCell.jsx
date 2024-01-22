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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
/**
 * @author Théo Lasserre
 */
class NotificationDateCell extends React.Component {
  static propTypes = {
    entity: AdminShapes.NotificationWithinContent,
    selectedNotification: AdminShapes.Notification,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { entity, selectedNotification } = this.props
    const { moduleTheme: { notifications: { selectorLineStyle } } } = this.context
    const date = get(entity, 'content.date', '')
    const isNotificationSelected = get(entity, 'content.id', '') === get(selectedNotification, 'id', '')
    return (
      <div style={isNotificationSelected ? selectorLineStyle : null}>
        {date}
      </div>
    )
  }
}
export default NotificationDateCell
