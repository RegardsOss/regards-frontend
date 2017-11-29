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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import OrderListComponent from '../../components/orders/OrderListComponent'

/**
 * Order list container: It shows all orders in given context (configured using actions and selectors)
 * It provides tools to customize details subscreen.
 * Note: to be used, calling modules must install the model reducer
 * @author Raphaël Mechali
 */
export class OrderListContainer extends React.Component {

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { commandsSelectors }) {
    return {
      isFetching: commandsSelectors.isFetching(state),
      totalOrderCount: commandsSelectors.getResultsCount(state),
    }
  }

  static propTypes = {
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    commandsActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    commandsSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired, // used in mapDispatchToProps
    // from mapStateToProps
    isFetching: PropTypes.bool,
    totalOrderCount: PropTypes.number.isRequired,
  }

  static DEFAULT_STATE = {
    /** columns visibility map (no assertion on child columns keys) */
    columnsVisibility: {}, // note: empty by default, when column isn't found it should be considered visible
  }

  /**
   * Lifecycle method: component will mount. Used here to initialize the state
   */
  componentWillMount = () => this.setState(OrderListContainer.DEFAULT_STATE)

  /**
   * User callbacker: user updated columns visibility (this container considers only columns keys)
   * @param {[{key, visible}]} updatedColumns updated columns
   */
  onChangeColumnsVisibility = (updatedColumns) => {
    this.setState({
      // map: associate each column key with its visible stae
      columnsVisibility: updatedColumns.reduce((acc, { key, visible }) => ({
        ...acc,
        [key]: visible,
      }), {}),
    })
  }

  render() {
    const { displayMode, commandsActions, commandsSelectors, navigationActions, isFetching, totalOrderCount } = this.props
    const { columnsVisibility } = this.state
    return (
      <OrderListComponent
        displayMode={displayMode}
        isFetching={isFetching}
        totalOrderCount={totalOrderCount}
        columnsVisibility={columnsVisibility}
        onChangeColumnsVisibility={this.onChangeColumnsVisibility}
        commandsActions={commandsActions}
        commandsSelectors={commandsSelectors}
        navigationActions={navigationActions}
      />
    )
  }
}

// export connected to module styles (but allow overriding)
export default connect(OrderListContainer.mapStateToProps)(OrderListContainer)
