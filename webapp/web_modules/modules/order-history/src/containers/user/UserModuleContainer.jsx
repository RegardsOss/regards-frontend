/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LoadableContentDisplayDecorator, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
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

  /**
   * Redux: map to dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchProcessingList: (pathParams, queryParams) => dispatch(processingActions.fetchEntityList(pathParams, queryParams)),
  })

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // from mapStateToProps
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // from mapDispatchToProps
    fetchProcessingList: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
    isProcessingDependenciesExist: allMatchHateoasDisplayLogic(processingActions.getDependency(RequestVerbEnum.GET), this.props.availableDependencies),
  }

  UNSAFE_componentWillMount() {
    if (this.state.isProcessingDependenciesExist) {
      this.props.fetchProcessingList()
    }
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { isLoading, isProcessingDependenciesExist } = this.state
    return (
      <LoadableContentDisplayDecorator isLoading={isLoading}>
        <OrderHistoryComponent
          ordersActions={orderListActions}
          ordersSelectors={orderListSelectors}
          orderFilesActions={orderFilesActions}
          orderFilesSelectors={orderFilesSelectors}
          navigationActions={ordersNavigationActions}
          navigationSelectors={ordersNavigationSelectors}
          processingSelectors={processingSelectors}
          isProcessingDependenciesExist={isProcessingDependenciesExist}
          defaultIconURL={UIDomain.getModuleDefaultIconURL(this.props.type)}
          {...this.props}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(UserModuleContainer.mapStateToProps, UserModuleContainer.mapDispatchToProps)(UserModuleContainer)
