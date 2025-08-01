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
import compose from 'lodash/fp/compose'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient, ProcessingClient } from '@regardsoss/client'
import { BasicPageableSelectors, BasicListSelectors } from '@regardsoss/store-utils'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { ORDER_DISPLAY_MODES } from '../model/OrderDisplayModes'
import { OrdersNavigationActions } from '../model/OrdersNavigationActions'
import { OrdersNavigationSelectors } from '../model/OrdersNavigationSelectors'
import OrderListContainer from './orders/OrderListContainer'
import OrderDatasetsContainer from './datasets/OrderDatasetsContainer'
import DatasetFilesContainer from './files/DatasetFilesContainer'
import messages from '../i18n'
import styles from '../styles'

const NO_NAVIGATION_PATH = []

/**
* Root order display containers (switches sub component based on navigation state )
* @author Raphaël Mechali
* @author Théo Lasserre
*/
export class OrderDisplayContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { processingActions }) {
    return {
      fetchProcessingList: (pathParams, queryParams) => dispatch(processingActions.fetchEntityList(pathParams, queryParams)),
    }
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { navigationSelectors }) {
    return {
      navigationPath: navigationSelectors ? navigationSelectors.getNavigationPath(state) : NO_NAVIGATION_PATH,
    }
  }

  static propTypes = {
    project: PropTypes.string.isRequired,
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    // download order csv
    downloadOrderActions: PropTypes.instanceOf(OrderClient.DownloadOrderSummaryCSVFileActions),
    // parameters appying on the orders list request
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // files actions and selector: if not provided, navigation is disabled
    orderFilesActions: PropTypes.instanceOf(OrderClient.OrderDatasetFilesActions),
    orderFilesSelectors: PropTypes.instanceOf(BasicPageableSelectors),
    // navigation actions and selector: if not provided, navigation is disabled
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions),
    // eslint-disable-next-line react/no-unused-prop-types
    navigationSelectors: PropTypes.instanceOf(OrdersNavigationSelectors), // used in mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    processingActions: PropTypes.instanceOf(ProcessingClient.ProcessingActions).isRequired,
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    isProcessingDependenciesExist: PropTypes.bool,
    // not provided in user mode
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors),
    // from mapDispatchToProps
    fetchProcessingList: PropTypes.func.isRequired,
    // from mapStateToProps
    navigationPath: PropTypes.arrayOf(PropTypes.oneOfType([
      OrderShapes.OrderWithContent, // context level 1
      OrderShapes.DatasetTask, // context level 2
    ])).isRequired,
  }

  static defaultProps = {
    requestParameters: {},
    isProcessingDependenciesExist: false,
  }

  UNSAFE_componentWillMount() {
    const { isProcessingDependenciesExist, fetchProcessingList } = this.props
    if (isProcessingDependenciesExist) {
      fetchProcessingList()
    }
  }

  render() {
    const {
      navigationActions, navigationPath, displayMode, project,
      requestParameters, ordersActions, ordersSelectors, orderFilesActions,
      orderFilesSelectors, processingSelectors, isProcessingDependenciesExist,
      pluginMetaDataSelectors, downloadOrderActions,
    } = this.props
    switch (navigationPath.length) {
      case 0:
        // root level: all commands
        return (
          <OrderListContainer
            project={project}
            displayMode={displayMode}
            ordersRequestParameters={requestParameters}
            downloadOrderActions={downloadOrderActions}
            ordersActions={ordersActions}
            ordersSelectors={ordersSelectors}
            navigationActions={navigationActions}
            processingSelectors={processingSelectors}
            pluginMetaDataSelectors={pluginMetaDataSelectors}
            isProcessingDependenciesExist={isProcessingDependenciesExist}
          />)
      case 1:
        // cannot be shown when navigation is disabled
        // first level: datasets in selected order
        return (
          <OrderDatasetsContainer
            order={navigationPath[0]}
            navigationActions={navigationActions}
            processingSelectors={processingSelectors}
            isProcessingDependenciesExist={isProcessingDependenciesExist}
            displayMode={displayMode}
          />
        )
      case 2:
        // cannot be shown when navigation is disabled
        return (
          <DatasetFilesContainer
            order={navigationPath[0]}
            dataset={navigationPath[1]}
            orderFilesActions={orderFilesActions}
            orderFilesSelectors={orderFilesSelectors}
            displayMode={displayMode}
          />)
      default:
        throw new Error(`Unknown navigation level ${navigationPath.length}`)
    }
  }
}
export default compose(
  connect(OrderDisplayContainer.mapStateToProps, OrderDisplayContainer.mapDispatchToProps),
  withI18n(messages, true), withModuleStyle(styles, true),
)(OrderDisplayContainer)
