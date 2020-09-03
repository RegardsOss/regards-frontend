/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import noop from 'lodash/noop'
import FlatButton from 'material-ui/FlatButton'
import OrderIcon from 'mdi-material-ui/CartArrowDown'
import { i18nContextType } from '@regardsoss/i18n'
import { Dialog } from 'material-ui'
import TextField from 'material-ui/TextField'

/**
* Order button component, starts current basket order
* @author Raphaël Mechali
*/
class OrderComponent extends React.Component {
  static propTypes = {
    onOrder: PropTypes.func.isRequired, // callback like (orderLabel:string) => Promise
    empty: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Id to use, in i18n, for an unknown server error (other possible errors can be seen in OrderClient.CreateOrderActions) */
  static UNKNOWN_SERVER_ERROR = 'UNKNOWN_SERVER_ERROR'

  state = {
    dialogOpen: false,
    orderLabel: '',
    serverError: null, // key to last  occurred server error when starting the command
    startingOrder: false,
  }

  /** User callback: shows order start dialog */
  onShowDialog = () => this.setState({
    dialogOpen: true,
    orderLabel: '',
    serverError: null,
    startingOrder: false,
  })

  /** User callback: hides order start dialog */
  onHideDialog = (callback = noop) => this.setState({
    dialogOpen: false,
    orderLabel: '',
    serverError: null,
    startingOrder: false,
  }, callback)

  /** onOrder promise failure callback: stores server error to show, mark no longer loading and keep dialog open */
  onStartOrderFailed = (err) => this.setState({ serverError: err.message, startingOrder: false })

  /** User callback: hides order start dialog */
  onConfirmStartOrder = () => {
    const { onOrder } = this.props
    const { orderLabel } = this.state
    this.setState({ startingOrder: true }, // 1. mark loading (feedback)
      () => onOrder(orderLabel) // 2 - start order
        .then(this.onHideDialog) // 3.a - everything went well, hide dialog
        .catch(this.onStartOrderFailed)) // 3.b - something went wrong, show error (see UserModuleContainer#onOrder for possible IDs)
  }

  /**
   * User callback: label input
   * @param {*} text
   */
  onOrderLabelChanged = (text) => this.setState({ orderLabel: text })

  render() {
    const { disabled, empty } = this.props
    const {
      dialogOpen, orderLabel, serverError, startingOrder,
    } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <>
        <FlatButton
          label={formatMessage({ id: 'order-cart.module.order.label' })}
          title={formatMessage({ id: 'order-cart.module.order.tooltip' })}
          icon={<OrderIcon />}
          disabled={disabled || empty}
          onClick={this.onShowDialog}
        />
        <Dialog
          title={formatMessage({ id: 'order-cart.module.order.confirmation.title' })}
          actions={<>
            <FlatButton
              label={formatMessage({ id: 'order-cart.module.order.confirmation.cancel' })}
              onClick={this.onHideDialog}
            />
            <FlatButton
              primary
              label={formatMessage({ id: 'order-cart.module.order.confirmation.confirm' })}
              onClick={this.onConfirmStartOrder}
              disabled={startingOrder}
            />
          </>}
          modal
          open={dialogOpen}
        >
          <div>
            {formatMessage({ id: 'order-cart.module.order.confirmation.message' })}
          </div>
          <TextField
            value={orderLabel}
            onChange={this.onOrderLabelChanged}
            disabled={startingOrder}
            errorText={serverError ? formatMessage({ id: `order-cart.module.order.confirmation.server.error.${serverError}` }) : null}
            floatingLabelText={formatMessage({ id: 'order-cart.module.order.confirmation.label.field' })}
            hintText={formatMessage({ id: 'order-cart.module.order.confirmation.label.hint' })}
          />
        </Dialog>
      </>
    )
  }
}
export default OrderComponent
