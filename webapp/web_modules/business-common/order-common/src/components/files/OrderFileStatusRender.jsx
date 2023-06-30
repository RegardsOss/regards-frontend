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
import { OrderDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

export const UNKNOWN = 'UNKNOWN'

/**
* Status render for order files
* @author Raphaël Mechali
*/
class OrderFileStatusRender extends React.Component {
  static propTypes = {
    value: PropTypes.oneOf(OrderDomain.ORDER_FILE_STATUS),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { value: status } = this.props
    const { intl: { formatMessage } } = this.context
    const { muiTheme } = this.context

    // render status: do not fail on unknwon (may be a null / undefined value)
    const consideredStatus = OrderDomain.ORDER_FILE_STATUS.includes(status) ? status : UNKNOWN

    // compute icon, text and color
    const text = formatMessage({ id: `files.list.cell.status.${consideredStatus}.text` })
    const tooltip = formatMessage({ id: `files.list.cell.status.${consideredStatus}.tooltip` })
    const color = muiTheme.module.orderHistory[`color.file.${consideredStatus}`]

    // compute color (ignore if admin destroyed it in theme conf =)
    const cellStyle = color ? { color } : null
    return (
      <div style={cellStyle} title={tooltip}>
        {text}
      </div>
    )
  }
}
export default OrderFileStatusRender
