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
import { browserHistory } from 'react-router'
import { modulesManager } from '@regardsoss/modules'
import CartSelectorComponent from '../components/CartSelectorComponent'

// get selectors and actions instances on default path (reduced by user module)
const basketSelector = OrderClient.getOrderBasketSelectors()
const basketActions = new OrderClient.OrderBasketActions()

/**
* Cart selector container, shows the number of elements in cart. This component lifecycle (mount/unmount) MUST BE
* RELATED WITH logged user (unmounted while no user is logged, mounted when one is). It is required as basket is
* never provided to non logged users
* @author Raphaël Mechali
*/
export class CartSelectorContainer extends React.Component {

  static mapStateToProps(state) {
    return {
      objectsCount: basketSelector.getObjectsCount(state),
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      dispatchGetBasket: () => dispatch(basketActions.getBasket()),
    }
  }

  static propTypes = {
    // project identifier
    project: PropTypes.string.isRequired,
    // dynamic cart module ID, to be used for module link
    cartModuleId: PropTypes.number.isRequired,
    // from mapStateToProps
    objectsCount: PropTypes.number.isRequired,
    // from mapDispatchToProps
    dispatchGetBasket: PropTypes.func.isRequired,
  }

  /**
   * On component mount: fetch current basket content for user
   */
  componentDidMount = () => this.props.dispatchGetBasket()

  /**
   * Callback: on cart click, redirect user to his cart content
   */
  onCartClicked = () => {
    const { project, cartModuleId } = this.props
    browserHistory.push(modulesManager.getModuleURL(project, cartModuleId))
  }

  render() {
    const { objectsCount } = this.props
    return (
      <CartSelectorComponent notifications={objectsCount} onCartClicked={this.onCartClicked} />
    )
  }
}
export default connect(CartSelectorContainer.mapStateToProps, CartSelectorContainer.mapDispatchToProps)(CartSelectorContainer)
