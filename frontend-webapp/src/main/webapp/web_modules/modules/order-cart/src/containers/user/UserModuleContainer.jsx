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
import keys from 'lodash/keys'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { modulesManager } from '@regardsoss/modules'
import { modulesHelper } from '@regardsoss/modules-api'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'
import { AccessShapes, OrderShapes } from '@regardsoss/shape'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { createOrderActions, createOrderSelectors } from '../../client/CreateOrderClient'
import { ModuleConfigurationShape } from '../../shapes/ModuleConfigurationShape'
import SelectionItemDetailContainer from './detail/SelectionItemDetailContainer'
import OrderCartComponent from '../../components/user/OrderCartComponent'

// get default modules client actions and reducers instances - required to check a basket exists AND is in a dynamic container
const modulesSelectors = AccessProjectClient.ModuleSelectors()

// get an instance of default actions / selectors (the basket state is shared over all modules)
const orderBasketActions = new OrderClient.OrderBasketActions()
const orderBasketSelectors = OrderClient.getOrderBasketSelectors()

/**
 * Order cart content container (fetches cart content related data for the corresponding component)
 * @author Raphaël Mechali
 */
export class UserModuleContainer extends React.Component {
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
      modules: modulesSelectors.getList(state),
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
      dispatchStartOrder: onSucceedOrderURL => dispatch(createOrderActions.order(onSucceedOrderURL)),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // override conf to specify expected shape
    moduleConf: ModuleConfigurationShape.isRequired,
    // from mapStateToProps
    isAuthenticated: PropTypes.bool, // used only in properties changed
    basket: OrderShapes.Basket,
    hasError: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    modules: AccessShapes.ModuleList,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchGetBasket: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFlushBasket: PropTypes.func.isRequired, // locally clears basket
    dispatchStartOrder: PropTypes.func.isRequired,
    dispatchClearCart: PropTypes.func.isRequired, // clears basket on server side
  }

  static MODULE_PROPS = keys(AccessShapes.runtimeDispayModuleFields)

  /**
   * Lifecycle method: component did mount. Notify properties changed to fetch basket if logged for user
   */
  componentDidMount = () => {
    this.onPropertiesChanged({}, this.props)
  }

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

  /**
   * On order callback: dispatches order action then redirects user on order list if it was successful
   */
  onOrder = () => {
    const {
      dispatchStartOrder, dispatchFlushBasket, project, modules,
    } = this.props
    const onSucceedOrderURL = this.getOnSucceedOrderURL()
    // 1 − dispatch start order
    dispatchStartOrder(onSucceedOrderURL).then(({ error }) => {
      if (!error) {
        // 2 - when there is no error, flush basket (without server call)
        dispatchFlushBasket()
        // 3 - redirect user to his orders list if there is an order module
        const orderHistoryModule = modulesManager.findFirstModuleByType(modules, modulesManager.AllDynamicModuleTypes.ORDER_HISTORY)
        if (orderHistoryModule) {
          browserHistory.push(modulesManager.getModuleURL(project, orderHistoryModule.content.id))
        }
      }
    })
  }

  /**
   * Generate the URL that will be used in the mail sent by the server to the user
   */
  getOnSucceedOrderURL = () => {
    const {
      project,
    } = this.props
    return `/user/${project}/redirect?module=order-history`
  }

  render() {
    const {
      basket, hasError, isAuthenticated, isFetching, dispatchClearCart, moduleConf: { showDatasets = true },
    } = this.props
    return (
      <div>
        {/* 1 - Add main view */}
        <OrderCartComponent
          basket={basket}
          showDatasets={showDatasets}
          hasError={hasError}
          isFetching={isFetching}
          isAuthenticated={isAuthenticated}
          onClearCart={dispatchClearCart}
          onOrder={this.onOrder}
          {...modulesHelper.getReportedUserModuleProps(this.props)}
        />
        {/* 2 - Add detail dialog */}
        <SelectionItemDetailContainer showDatasets={showDatasets} />
      </div>
    )
  }
}

export default connect(
  UserModuleContainer.mapStateToProps,
  UserModuleContainer.mapDispatchToProps,
)(UserModuleContainer)
