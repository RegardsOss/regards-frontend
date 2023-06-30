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
import { AccessShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import OrderHistoryComponent from '../../components/user/OrderHistoryComponent'
import { processingActions, processingSelectors } from '../../client/ProcessingClient'
import { orderListActions, orderListSelectors } from '../../client/OrderListClient'
import { orderFilesActions, orderFilesSelectors } from '../../client/OrderFilesClient'
import { ordersNavigationActions, ordersNavigationSelectors } from '../../client/OrdersNavigationClient'

/**
 * User module container
 * @author Raphaël Mechali
 */
export class UserModuleContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
  })

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // from mapStateToProps
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  state = {
    isProcessingDependenciesExist: allMatchHateoasDisplayLogic([processingActions.getDependency(RequestVerbEnum.GET)], this.props.availableDependencies),
  }

  render() {
    const { isProcessingDependenciesExist } = this.state
    return (
      <OrderHistoryComponent
        ordersActions={orderListActions}
        ordersSelectors={orderListSelectors}
        orderFilesActions={orderFilesActions}
        orderFilesSelectors={orderFilesSelectors}
        navigationActions={ordersNavigationActions}
        navigationSelectors={ordersNavigationSelectors}
        processingSelectors={processingSelectors}
        processingActions={processingActions}
        isProcessingDependenciesExist={isProcessingDependenciesExist}
        defaultIconURL={UIDomain.getModuleDefaultIconURL(this.props.type)}
        {...this.props}
      />
    )
  }
}

export default connect(UserModuleContainer.mapStateToProps, null)(UserModuleContainer)
