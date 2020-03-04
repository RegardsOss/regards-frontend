/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import OrderIcon from 'mdi-material-ui/CartArrowDown'
import { i18nContextType } from '@regardsoss/i18n'
import { withConfirmDialog } from '@regardsoss/components'

export const ButtonWithConfirmDialog = withConfirmDialog(FlatButton)

/**
* Order button component, starts current basket order
* @author Raphaël Mechali
*/
class OrderComponent extends React.Component {
  static propTypes = {
    onOrder: PropTypes.func.isRequired,
    empty: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }


  render() {
    const { disabled, empty, onOrder } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <ButtonWithConfirmDialog
        onClick={onOrder}
        dialogTitle={formatMessage({ id: 'order-cart.module.order.confirmation.title' })}
        dialogMessage={formatMessage({ id: 'order-cart.module.order.confirmation.message' })}

        label={formatMessage({ id: 'order-cart.module.order.label' })} // button properties
        title={formatMessage({ id: 'order-cart.module.order.tooltip' })}
        icon={<OrderIcon />}
        disabled={disabled || empty}
      />
    )
  }
}
export default OrderComponent
