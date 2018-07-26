/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import OrderHistoryComponent from '../../components/user/OrderHistoryComponent'
import orderListClient from '../../client/OrderListClient'
import orderFilesClient from '../../client/OrderFilesClient'
import OrdersNavigationClient from '../../client/OrdersNavigationClient'

/**
 * User module container
 * @author Raphaël Mechali
 */
export class UserModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
  }

  render() {
    return (
      <OrderHistoryComponent
        ordersActions={orderListClient.orderListActions}
        ordersSelectors={orderListClient.orderListSelectors}
        orderFilesActions={orderFilesClient.orderFilesActions}
        orderFilesSelectors={orderFilesClient.orderFilesSelectors}
        navigationActions={OrdersNavigationClient.ordersNavigationActions}
        navigationSelectors={OrdersNavigationClient.ordersNavigationSelectors}
        defaultIconURL={UIDomain.getModuleDefaultIconURL(this.props.type)}
        {...this.props}
      />
    )
  }
}

export default UserModuleContainer
