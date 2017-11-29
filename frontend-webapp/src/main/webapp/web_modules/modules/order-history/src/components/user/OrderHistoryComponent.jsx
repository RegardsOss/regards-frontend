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
import ModuleIcon from 'material-ui/svg-icons/notification/folder-special'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { DynamicModule } from '@regardsoss/components'
import { ORDER_DISPLAY_MODES, OrderDisplayContainer, OrdersNavigationContainer } from '@regardsoss/order-common'
import { dependencies } from '../../user-dependencies'
import OrdersNavigationClient from '../../client/OrdersNavigationClient'

/**
 * Order history - main module component
 * @author Raphaël Mechali
 */
class OrderHistoryComponent extends React.Component {

  static propTypes = {
    commandsActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    commandsSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    orderFilesActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    orderFilesSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    title: PropTypes.string.isRequired,
    // expanded state management
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,
  }

  render() {
    const { commandsActions, commandsSelectors, orderFilesActions, orderFilesSelectors,
      title, onExpandChange, expanded } = this.props
    return (
      <DynamicModule
        title={
          <OrdersNavigationContainer
            title={title}
            displayMode={ORDER_DISPLAY_MODES.USER}
            RootIconConstructor={ModuleIcon}
            navigationActions={OrdersNavigationClient.ordersNavigationActions}
            navigationSelectors={OrdersNavigationClient.ordersNavigationSelectors}
          />
        }
        onExpandChange={onExpandChange}
        expanded={expanded}
        requiresAuthentication
        requiredDependencies={dependencies}
      >
        <OrderDisplayContainer
          commandsActions={commandsActions}
          commandsSelectors={commandsSelectors}
          orderFilesActions={orderFilesActions}
          orderFilesSelectors={orderFilesSelectors}
          navigationActions={OrdersNavigationClient.ordersNavigationActions}
          navigationSelectors={OrdersNavigationClient.ordersNavigationSelectors}
          displayMode={ORDER_DISPLAY_MODES.USER}
        />
      </DynamicModule>
    )
  }
}
export default OrderHistoryComponent
