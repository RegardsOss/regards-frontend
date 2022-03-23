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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { withI18n } from '@regardsoss/i18n'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { withModuleStyle } from '@regardsoss/theme'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import messages from '../i18n'
import styles from '../styles'
import { processingActions, processingSelectors } from '../clients/ProcessingClient'
import { ordersNavigationActions, ordersNavigationSelectors } from '../clients/OrdersNavigationClient'
import { orderFilesActions, orderFilesSelectors } from '../clients/OrderFilesClient'
import { orderListActions, orderListSelectors } from '../clients/OrderListClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetaDataClient'
import OrderListComponent from '../components/OrderListComponent'

/**
* Orders list container
* @author Raphaël Mechali
*/
export class OrderListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // from mapDispatchToProps
    dispatchResetToLevel: PropTypes.func.isRequired,
    fetchPluginMetaDataList: PropTypes.func.isRequired,
  }

  static mapStateToProps(state) {
    return {
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      dispatchResetToLevel: (level) => dispatch(ordersNavigationActions.resetToLevel(level)),
      fetchPluginMetaDataList: (microserviceName) => dispatch(pluginMetaDataActions.fetchEntityList({
        microserviceName,
      })),
    }
  }

  state = {
    isProcessingDependenciesExist: allMatchHateoasDisplayLogic([processingActions.getDependency(RequestVerbEnum.GET)], this.props.availableDependencies),
  }

  UNSAFE_componentWillMount() {
    const { fetchPluginMetaDataList } = this.props
    fetchPluginMetaDataList(STATIC_CONF.MSERVICES.PROCESSING)
  }

  componentWillUnmount() {
    const { dispatchResetToLevel } = this.props
    dispatchResetToLevel(0)
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/commands/board`
  }

  renderComponent = (filterSortingAndVisibilityProps) => {
    const { params: { project } } = this.props
    const { isProcessingDependenciesExist } = this.state
    return (
      <OrderListComponent
        {...filterSortingAndVisibilityProps}
        project={project}
        backUrl={this.getBackURL()}
        ordersActions={orderListActions}
        ordersSelectors={orderListSelectors}
        ordersNavigationActions={ordersNavigationActions}
        ordersNavigationSelectors={ordersNavigationSelectors}
        orderFilesActions={orderFilesActions}
        orderFilesSelectors={orderFilesSelectors}
        isProcessingDependenciesExist={isProcessingDependenciesExist}
        processingActions={processingActions}
        processingSelectors={processingSelectors}
        pluginMetaDataSelectors={pluginMetaDataSelectors}
      />
    )
  }

  render() {
    return (
      <TableFilterSortingAndVisibilityContainer
        pageActions={orderListActions}
        pageSelectors={orderListSelectors}
        defaultFiltersState={OrderListComponent.DEFAULT_FILTERS_STATE}
      >
        {this.renderComponent}
      </TableFilterSortingAndVisibilityContainer>
    )
  }
}

export default compose(
  connect(OrderListContainer.mapStateToProps, OrderListContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(OrderListContainer)
