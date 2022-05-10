/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'mdi-material-ui/Cog'
import { OrderProcessings } from '../../../model/OrderProcessingsShape'

/**
 * @author Théo Lasserre
 */
class ShowOrderProcessingsComponent extends React.Component {
  static propTypes = {
    orderProcessings: OrderProcessings.isRequired,
    onShowProcessings: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  isOrderProcessingListExist = (orderProcessings) => {
    const orderProcessingList = get(orderProcessings, 'orderProcessingList', null)
    return orderProcessingList !== null && !isEmpty(orderProcessingList)
  }

  render() {
    const { orderProcessings, onShowProcessings } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        disabled={!this.isOrderProcessingListExist(orderProcessings)}
        onClick={() => onShowProcessings(orderProcessings)}
        title={formatMessage({ id: 'order.list.option.cell.show.processing.order.tooltip' })}
      >
        <SettingsIcon />
      </IconButton>
    )
  }
}
export default ShowOrderProcessingsComponent
