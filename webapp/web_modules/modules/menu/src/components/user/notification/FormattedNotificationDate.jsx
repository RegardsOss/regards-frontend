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
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Formatted date for notifications
 * @author Raphaël Mechali
 */
class FormattedNotificationDate extends React.Component {
  static propTypes = {
    notification: AdminShapes.Notification.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatDate } } = this.context

    const { notification: { date } } = this.props
    const notificationDate = new Date(date)
    const todayDate = new Date()

    const isSameYear = todayDate.getFullYear() === notificationDate.getFullYear()
    const isToday = todayDate.getDate() === notificationDate.getDate()
      && todayDate.getMonth() === notificationDate.getMonth() && isSameYear
    return isToday
      ? formatDate(notificationDate, { hour: '2-digit', minute: '2-digit', timeZone: 'utc' })
      : formatDate(notificationDate, {
        year: isSameYear ? undefined : '2-digit', month: 'short', day: 'numeric', timeZone: 'utc',
      })
  }
}
export default FormattedNotificationDate
