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
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AccessShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import { ShowableAtRender, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import CartSelectorComponent from '../../components/user/CartSelectorComponent'

// get default layout client actions and reducers instances - required to check that containers are or not dynamic
const layoutSelectors = AccessProjectClient.getLayoutSelectors()

// get default modules client actions and reducers instances - required to check a basket exists AND is in a dynamic container
const modulesSelectors = AccessProjectClient.getModuleSelectors()

// get selectors and actions instances on default path (reduced by user module)
const basketSelector = OrderClient.getOrderBasketSelectors()
const basketActions = new OrderClient.OrderBasketActions()

/**
* Cart selector container, shows the number of elements in cart.
* @author Raphaël Mechali
*/
export class CartSelectorContainer extends React.Component {
  static propTypes = {
    // project identifier
    project: PropTypes.string,
    // from mapStateToProps
    objectsCount: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    isAuthenticated: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicContainerId: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList,
    // eslint-disable-next-line react/no-unused-prop-types
    availableEndpoints: PropTypes.arrayOf(PropTypes.string),
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchGetBasket: PropTypes.func.isRequired,
  }

  /** Basket dependencies */
  static BASKET_DEPENDENCIES = basketActions.getDependencies('GET')

  static DEFAULT_STATE = {
    cartModuleId: null,
  }

  static mapStateToProps(state) {
    return {
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      dynamicContainerId: layoutSelectors.getDynamicContainerId(state),
      modules: modulesSelectors.getList(state),
      availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      objectsCount: basketSelector.getObjectsCount(state),
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      dispatchGetBasket: () => dispatch(basketActions.getBasket()),
    }
  }

  /**
   * Computes cart module ID
   * @param {*} properties this component properties
   * @return {number} retrieved ID or null when not found or state not matching
   */
  static getCartModuleId({
    isAuthenticated, modules, dynamicContainerId, availableEndpoints,
  }) {
    // 0 - pre: don't show cart to non logged users or users that do not have enough rights
    if (!isAuthenticated || !allMatchHateoasDisplayLogic(CartSelectorContainer.BASKET_DEPENDENCIES, availableEndpoints)) {
      return null
    }
    // 1 - Is there one or more order cart modules set up in a dynamic container?
    const dynamicOrderCartModules = filter((modules || {}), (module) => {
      const containerId = get(module, 'content.container', '')
      const moduleType = get(module, 'content.type', '')
      const isActiveModule = get(module, 'content.active', false)
      // module is retained when active, of type order cart and set up in the dynamic container
      return isActiveModule && modulesManager.AllDynamicModuleTypes.ORDER_CART === moduleType && dynamicContainerId === containerId
    })
    return dynamicOrderCartModules.length ? dynamicOrderCartModules[0].content.id : null
  }

  UNSAFE_componentWillMount = () => this.setState(CartSelectorContainer.DEFAULT_STATE)

  /**
   * * Lifecycle hook: component did mount, used here to update component state
   */
  componentDidMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle hook: component will receive props, used here to update component state
   * @param nextProps component next properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Updates component state (recompute properties related elements)
   * @param oldProps previous component
   * @param newProps new component props
   */
  onPropertiesChanged = (oldProps, newProps) => {
    const oldState = this.state
    const newState = { ...(oldState || CartSelectorContainer.DEFAULT_STATE) }
    // 1 - Attempt to retrieve the corresponding order cart dynamic module
    if (!isEqual(oldProps.isAuthenticated, newProps.isAuthenticated)
      || !isEqual(oldProps.dynamicContainerId, newProps.dynamicContainerId)
      || !isEqual(oldProps.modules, newProps.modules)
      || !isEqual(oldProps.availableEndpoints, newProps.availableEndpoints)) {
      newState.cartModuleId = CartSelectorContainer.getCartModuleId(newProps)
    }

    // 2 - When a new module ID is found:
    if (!isEqual(oldState, newState)) {
      // A - fetch cart content if the module could be found
      if (newState.cartModuleId) {
        newProps.dispatchGetBasket()
      }
      // B - update state locally to hold module ID
      this.setState(newState)
    }
  }

  /**
  * Callback: on cart click, redirect user to his cart content.
  * pre: cart module ID is defined (granted by render condition)
  */
  onCartClicked = () => {
    const { project } = this.props
    const { cartModuleId } = this.state
    browserHistory.push(UIDomain.getModuleURL(project, cartModuleId))
  }

  render() {
    const { objectsCount } = this.props
    const { cartModuleId } = this.state
    return (
      // Show only when module cart ID has been resolved (user is logged and has rights, module exists)
      <ShowableAtRender show={!!cartModuleId}>
        <CartSelectorComponent objectsCount={objectsCount} onCartClicked={this.onCartClicked} />
      </ShowableAtRender>
    )
  }
}
export default connect(CartSelectorContainer.mapStateToProps, CartSelectorContainer.mapDispatchToProps)(CartSelectorContainer)
