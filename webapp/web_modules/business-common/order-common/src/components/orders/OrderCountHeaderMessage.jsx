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
import values from 'lodash/values'
import { TableHeaderText } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'

/**
 * Order count display message for orders list header
 * @author Raphaël Mechali
 */
class OrderCountHeaderMessage extends React.Component {
  static propTypes = {
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    totalOrderCount: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { displayMode, totalOrderCount } = this.props
    const { intl: { formatMessage } } = this.context
    // compute header message
    let headerCountMessage
    if (displayMode === ORDER_DISPLAY_MODES.USER) {
      // user messages
      headerCountMessage = totalOrderCount
        ? formatMessage({ id: 'order.list.user.commands.header.message' }, { count: totalOrderCount })
        : formatMessage({ id: 'order.list.user.no.command.header.message' })
    } else {
      // admin messages
      headerCountMessage = totalOrderCount
        ? formatMessage({ id: 'order.list.admin.commands.header.message' }, { count: totalOrderCount })
        : formatMessage({ id: 'order.list.admin.no.command.header.message' })
    }
    return (
      <TableHeaderText text={headerCountMessage} />
    )
  }
}
export default OrderCountHeaderMessage
