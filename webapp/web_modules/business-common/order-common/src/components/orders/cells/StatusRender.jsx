/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { OrderDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/** User status for status render cell: one of OrderDomain.ORDER_STATUS,
 * WAITING_USER_DOWNLOAD (blocked order case) or UNKNOWN */
export const ORDER_USER_STATUS = {
  ...(OrderDomain.ORDER_STATUS_ENUM),
  WAITING_USER_DOWNLOAD: 'WAITING_USER_DOWNLOAD',
  UNKNOWN: 'UNKNOWN',
}

/**
* Status render
* @author Raphaël Mechali
*/
class StatusRender extends React.Component {
  static propTypes = {
    value: PropTypes.oneOf(values(ORDER_USER_STATUS)).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Returns an order status
   * @param {*} order order
   * @return {ORDER_STATUS} status or undefined if unknown
   */
  static getStatus(order) {
    // return waiting status when waitingForUser is true, return backend status otherwise
    return get(order, 'content.waitingForUser', false)
      ? ORDER_USER_STATUS.WAITING_USER_DOWNLOAD
      : get(order, 'content.status', ORDER_USER_STATUS.UNKNOWN)
  }

  render() {
    const { value: status } = this.props
    const { intl: { formatMessage } } = this.context
    const { muiTheme } = this.context

    // compute icon, text and color
    const text = formatMessage({ id: `order.list.cell.status.${status}.text` })
    const tooltip = formatMessage({ id: `order.list.cell.status.${status}.tooltip` })
    const theme = muiTheme.module.orderHistory
    const color = theme[`color.${status}`]
    // compute color (ignore if admin destroyed it in theme conf =)
    const cellStyle = { color }
    return (
      <div style={cellStyle} title={tooltip}>
        {text}
      </div>
    )
  }
}
export default StatusRender
