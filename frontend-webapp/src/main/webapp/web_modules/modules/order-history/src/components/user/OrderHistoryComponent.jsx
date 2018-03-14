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
import { OrderClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { DynamicModulePane, ModuleIcon, ModuleTitleText } from '@regardsoss/components'
import {
  ORDER_DISPLAY_MODES, OrdersNavigationActions, OrdersNavigationSelectors,
  OrderDisplayContainer, OrdersNavigationContainer,
} from '@regardsoss/order-common'
import { dependencies } from '../../user-dependencies'

/**
 * Order history - main module component
 * @author Raphaël Mechali
 */
class OrderHistoryComponent extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    orderFilesActions: PropTypes.instanceOf(OrderClient.OrderDatasetFilesActions).isRequired,
    orderFilesSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired,
    navigationSelectors: PropTypes.instanceOf(OrdersNavigationSelectors).isRequired,
    defaultIconURL: PropTypes.string.isRequired,
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
  }

  render() {
    const {
      locale, description, page, defaultIconURL,
      ordersActions, ordersSelectors, orderFilesActions,
      orderFilesSelectors, navigationActions, navigationSelectors,
    } = this.props
    return (
      <DynamicModulePane
        titleComponent={/* custom title component: breadcrumb */
          <OrdersNavigationContainer
            title={ModuleTitleText.selectTitle(page && page.title, description, locale)}
            displayMode={ORDER_DISPLAY_MODES.USER}
            rootIcon={
              <ModuleIcon
                iconDisplayMode={page && page.iconType}
                defaultIconURL={defaultIconURL}
                customIconURL={page && page.customIconURL}
              />}
            navigationActions={navigationActions}
            navigationSelectors={navigationSelectors}
          />
        }
        requiresAuthentication
        requiredDependencies={dependencies}
        {...this.props}
      >
        <OrderDisplayContainer
          ordersActions={ordersActions}
          ordersSelectors={ordersSelectors}
          orderFilesActions={orderFilesActions}
          orderFilesSelectors={orderFilesSelectors}
          navigationActions={navigationActions}
          navigationSelectors={navigationSelectors}
          displayMode={ORDER_DISPLAY_MODES.USER}
        />
      </DynamicModulePane>
    )
  }
}
export default OrderHistoryComponent
