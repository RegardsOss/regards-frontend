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
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { createOrderActions, createOrderSelectors } from '../../client/CreateOrderClient'
import SelectionItemDetailContainer from './detail/SelectionItemDetailContainer'
import OrderCartComponent from '../../components/user/OrderCartComponent'

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
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      basket: orderBasketSelectors.getOrderBasket(state),
      hasError: orderBasketSelectors.hasError(state),
      isFetching: orderBasketSelectors.isFetching(state) || createOrderSelectors.isFetching(state),
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
      dispatchFlushBasket: () => dispatch(orderBasketActions.flushBasket()),
      dispatchClearCart: () => dispatch(orderBasketActions.clearBasket()),
      // after dispatching an order, clear the basket as it is now empty on server side
      dispatchStartOrder: () =>
        dispatch(createOrderActions.order()).then(payload => !payload.error && dispatch(orderBasketActions.flushBasket())),
    }
  }

  static propTypes = {
    // from mapStateToProps
    isAuthenticated: PropTypes.bool, // used only in properties changed
    basket: OrderShapes.Basket,
    hasError: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchGetBasket: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFlushBasket: PropTypes.func.isRequired, // locally clears basket
    dispatchStartOrder: PropTypes.func.isRequired,
    dispatchClearCart: PropTypes.func.isRequired, // clears basket on server side
  }

  /**
   * Lifecycle method: component did mount. Notify properties changed to fetch basket if logged for user
   */
  componentDidMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle method: component will receive props. Notify properties changed to fetch basket if logged for user
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Event handler: component properties changed. If user just logged in, fetch the basket content
   * @param {*} oldProps previous component properties
   * @param {*} newProps new component properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    if (oldProps.isAuthenticated !== newProps.isAuthenticated) {
      if (newProps.isAuthenticated) {
        newProps.dispatchGetBasket()
      } else {
        newProps.dispatchFlushBasket()
      }
    }
  }

  render() {
    const { basket, hasError, isAuthenticated, isFetching, dispatchClearCart, dispatchStartOrder } = this.props
    return (
      <div>
        {/* 1 - Add main view */}
        <OrderCartComponent
          basket={basket}
          hasError={hasError}
          isFetching={isFetching}
          isAuthenticated={isAuthenticated}
          onClearCart={dispatchClearCart}
          onOrder={dispatchStartOrder}
        />
        {/* 2 - Add detail dialog */}
        <SelectionItemDetailContainer />
      </div>
    )
  }
}

export default connect(
  OrderCartContainer.mapStateToProps,
  OrderCartContainer.mapDispatchToProps)(OrderCartContainer)
