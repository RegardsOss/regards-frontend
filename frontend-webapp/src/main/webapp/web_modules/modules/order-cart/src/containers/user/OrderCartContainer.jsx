/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { OrderClient } from '@regardsoss/client'
import { OrderShapes } from '@regardsoss/shape'
import OrderCartComponent from '../../components/user/OrderCartComponent'
import { createOrderActions, createOrderSelectors } from '../../client/CreateOrderClient'

// get an instance of default actions / selectors (the basket state is shared over all modules)
const orderBasketActions = new OrderClient.OrderBasketActions()
const orderBasketSelectors = OrderClient.getOrderBasketSelectors()

/**
 * Order cart content container (fetches cart content related data for the corresponding component)
 * @author Raphaël Mechali
 */
export class OrderCartContainer extends React.Component {

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      basket: orderBasketSelectors.getOrderBasket(state),
      hasError: orderBasketSelectors.hasError(state),
      isFetching: orderBasketSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchGetBasket: () => dispatch(orderBasketActions.getBasket()),
      dispatchClearBasket: () => dispatch(orderBasketActions.clearBasket()), // TODO MOVE INTO LOWER CONTAINER
      // after dispatching an order, clear the basket as it is now empty on server side
      dispatchStartOrder: () =>
        dispatch(createOrderActions.order()).then(payload => !payload.error && dispatch(orderBasketActions.flush())),
    }
  }

  static propTypes = {
    // from mapStateToProps
    basket: OrderShapes.Basket,
    hasError: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    dispatchGetBasket: PropTypes.func.isRequired,
    dispatchClearBasket: PropTypes.func.isRequired,
    dispatchStartOrder: PropTypes.func.isRequired,
  }

  /**
   * On component mount: fetch current basket content for user
   */
  componentDidMount = () => this.props.dispatchGetBasket()

  render() {
    const { basket, hasError, isFetching, dispatchClearBasket, dispatchStartOrder } = this.props
    return (
      <OrderCartComponent
        basket={basket}
        hasError={hasError}
        isFetching={isFetching}
        onClearBasket={dispatchClearBasket}
        onOrder={dispatchStartOrder}
      />
    )
  }
}

export default connect(
  OrderCartContainer.mapStateToProps,
  OrderCartContainer.mapDispatchToProps)(OrderCartContainer)
