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
import keys from 'lodash/keys'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { modulesManager } from '@regardsoss/modules'
import { UIDomain } from '@regardsoss/domain'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { modulesHelper } from '@regardsoss/modules-api'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'
import { AccessShapes, OrderShapes } from '@regardsoss/shape'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { Error } from 'window-or-global'
import { createOrderActions, createOrderSelectors } from '../../client/CreateOrderClient'
import { processingActions, processingSelectors } from '../../client/ProcessingClient'
import { fileFiltersActions } from '../../client/FileFiltersClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../../client/PluginMetaDataClient'
import { linkProcessingDatasetActions } from '../../client/LinkProcessingDatasetClient'
import { ModuleConfigurationShape } from '../../shapes/ModuleConfigurationShape'
import OrderCartComponent from '../../components/user/OrderCartComponent'
import OrderComponent from '../../components/user/options/OrderComponent'

// get default modules client actions and reducers instances - required to check a basket exists AND is in a dynamic container
const modulesSelectors = AccessProjectClient.getModuleSelectors()

// get an instance of default actions / selectors (the basket state is shared over all modules)
const orderBasketActions = new OrderClient.OrderBasketActions()
const orderBasketSelectors = OrderClient.getOrderBasketSelectors()

/**
 * Order cart content container (fetches cart content related data for the corresponding component)
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class UserModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // override conf to specify expected shape
    moduleConf: ModuleConfigurationShape.isRequired,
    // from mapStateToProps
    isAuthenticated: PropTypes.bool, // used only in properties changed
    basket: OrderShapes.Basket,
    hasError: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    modules: AccessShapes.ModuleList,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchGetBasket: PropTypes.func.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFlushBasket: PropTypes.func.isRequired, // locally clears basket
    dispatchStartOrder: PropTypes.func.isRequired,
    dispatchClearCart: PropTypes.func.isRequired, // clears basket on server side
    fetchProcessingConfigurationList: PropTypes.func.isRequired,
    fetchProcessingMetadataList: PropTypes.func.isRequired,
  }

  static MODULE_PROPS = keys(AccessShapes.runtimeDispayModuleFields)

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      basket: orderBasketSelectors.getOrderBasket(state),
      hasError: orderBasketSelectors.hasError(state),
      isFetching: orderBasketSelectors.isFetching(state) || createOrderSelectors.isFetching(state),
      modules: modulesSelectors.getList(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchGetBasket: () => dispatch(orderBasketActions.getBasket()),
      dispatchFlushBasket: () => dispatch(orderBasketActions.flushBasket()),
      dispatchClearCart: () => dispatch(orderBasketActions.clearBasket()),
      dispatchStartOrder: (label, onSucceedOrderURL) => dispatch(createOrderActions.order(label, onSucceedOrderURL)),
      fetchProcessingConfigurationList: () => dispatch(processingActions.fetchEntityList()),
      fetchProcessingMetadataList: () => dispatch(pluginMetaDataActions.fetchEntityList({
        microserviceName: 'rs-processing',
      }, {
        pluginType: 'fr.cnes.regards.modules.processing.plugins.IProcessDefinition',
      })),
    }
  }

  state = {
    isProcessingDependenciesExist: allMatchHateoasDisplayLogic([processingActions.getDependency(RequestVerbEnum.GET)], this.props.availableDependencies),
    isFileFilterDependenciesExist: allMatchHateoasDisplayLogic([fileFiltersActions.getDependency(RequestVerbEnum.PUT)], this.props.availableDependencies),
  }

  UNSAFE_componentWillMount() {
    if (this.state.isProcessingDependenciesExist) {
      this.retrieveProcessingInfos()
    }
  }

  /**
   * Lifecycle method: component did mount. Notify properties changed to fetch basket if logged for user
   */
  componentDidMount() {
    this.onPropertiesChanged({}, this.props)
  }

  /**
   * Lifecycle method: component will receive props. Notify properties changed to fetch basket if logged for user
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesChanged(this.props, nextProps)
  }

  /**
   * Event handler: component properties changed. If user just logged in, fetch the basket content
   * @param {*} oldProps previous component properties
   * @param {*} newProps new component properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    if (oldProps.isAuthenticated !== newProps.isAuthenticated) {
      if (newProps.isAuthenticated) {
        newProps.dispatchGetBasket()
      } else {
        newProps.dispatchFlushBasket()
      }
    }
    if (!isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      const isProcessingDependenciesExist = allMatchHateoasDisplayLogic([processingActions.getDependency(RequestVerbEnum.GET)], newProps.availableDependencies)
      this.setState({
        isProcessingDependenciesExist,
      })
      if (isProcessingDependenciesExist) {
        this.retrieveProcessingInfos()
      }
    }
  }

  retrieveProcessingInfos = () => {
    this.props.fetchProcessingConfigurationList()
    this.props.fetchProcessingMetadataList()
  }

  /**
   * On order callback: dispatches order action then redirects user on order list if it was successful
   * @param {string} orderLabel (optional)
   */
  onOrder = (orderLabel) => {
    const {
      dispatchStartOrder, dispatchFlushBasket, project, modules,
    } = this.props
    const onSucceedOrderURL = this.getOnSucceedOrderURL()
    // 1 − dispatch start order
    return dispatchStartOrder(orderLabel, onSucceedOrderURL).then(({ error, payload, ...otherFields }) => {
      if (error) {
        // 1.A - error: return through promise catch an error holding the error key
        throw new Error(get(payload, 'response.messages[0]', OrderComponent.UNKNOWN_SERVER_ERROR))
      } else {
        // 2 - when there is no error, flush basket (without server call)
        dispatchFlushBasket()
        // 3 - redirect user to his orders list if there is an order module
        const orderHistoryModule = modulesManager.findFirstModuleByType(modules, modulesManager.AllDynamicModuleTypes.ORDER_HISTORY)
        if (orderHistoryModule) {
          browserHistory.push(UIDomain.getModuleURL(project, orderHistoryModule.content.id))
        }
      }
    }).catch((err) => {
      // 1.B - when the error has been produced by then, propage it unchanged. Otherwise propagate an unknown error
      if (OrderClient.CreateOrderActions.SERVER_ERRORS.includes(err.message) || err.message === OrderComponent.UNKNOWN_SERVER_ERROR) {
        throw err
      }
      // 1.C - any other type of error
      throw new Error(OrderComponent.UNKNOWN_SERVER_ERROR)
    })
  }

  /**
   * Generate the URL that will be used in the mail sent by the server to the user
   */
  getOnSucceedOrderURL = () => {
    const {
      project,
    } = this.props
    return `/user/${project}/redirect?module=order-history`
  }

  render() {
    const {
      basket, hasError, isAuthenticated, isFetching, dispatchClearCart, moduleConf: { showDatasets = true }, dispatchGetBasket,
    } = this.props
    const { isProcessingDependenciesExist, isFileFilterDependenciesExist } = this.state
    return (
      /* main view */
      <OrderCartComponent
        basket={basket}
        refreshBasket={dispatchGetBasket}
        showDatasets={showDatasets}
        hasError={hasError}
        isFetching={isFetching}
        isAuthenticated={isAuthenticated}
        onClearCart={dispatchClearCart}
        onOrder={this.onOrder}
        isProcessingDependenciesExist={isProcessingDependenciesExist}
        processingSelectors={processingSelectors}
        pluginMetaDataSelectors={pluginMetaDataSelectors}
        linkProcessingDatasetActions={linkProcessingDatasetActions}
        isFileFilterDependenciesExist={isFileFilterDependenciesExist}
        {...modulesHelper.getReportedUserModuleProps(this.props)}
      />
    )
  }
}

export default connect(
  UserModuleContainer.mapStateToProps,
  UserModuleContainer.mapDispatchToProps,
)(UserModuleContainer)
