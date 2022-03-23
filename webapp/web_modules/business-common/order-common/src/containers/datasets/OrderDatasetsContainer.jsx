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
import values from 'lodash/values'
import { OrderShapes } from '@regardsoss/shape'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import OrderDatasetsComponent from '../../components/datasets/OrderDatasetsComponent'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'

/**
 * Order datasets container
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class OrderDatasetsContainer extends React.Component {
  static propTypes = {
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    // currently selected order
    order: OrderShapes.OrderWithContent,
    // orders navigation actions (for sub containers), provided only when navigation is enabled
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired,
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    isProcessingDependenciesExist: PropTypes.bool.isRequired,
  }

  static DEFAULT_STATE = {
    /** columns visibility map (no assertion on child columns keys) */
    columnsVisibility: {}, // note: empty by default, when column isn't found it should be considered visible
  }

  /**
   * Lifecycle method: component will mount. Used here to initialize the state
   */
  UNSAFE_componentWillMount = () => this.setState(OrderDatasetsContainer.DEFAULT_STATE)

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
    const {
      order, navigationActions, processingSelectors, isProcessingDependenciesExist,
      displayMode,
    } = this.props
    const { columnsVisibility } = this.state
    return (
      <OrderDatasetsComponent
        datasets={order.content.datasetTasks}
        navigationActions={navigationActions}
        processingSelectors={processingSelectors}
        isProcessingDependenciesExist={isProcessingDependenciesExist}
        columnsVisibility={columnsVisibility}
        onChangeColumnsVisibility={this.onChangeColumnsVisibility}
        displayMode={displayMode}
      />
    )
  }
}
export default OrderDatasetsContainer
