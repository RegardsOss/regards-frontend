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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import noop from 'lodash/noop'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { OrderClient } from '@regardsoss/client'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic, HOCUtils } from '@regardsoss/display-control'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import OrderListComponent from '../../components/orders/OrderListComponent'
import AsynchronousRequestInformationComponent from '../../components/orders/dialog/AsynchronousRequestInformationComponent'
import RequestFailedInformationComponent from '../../components/orders/dialog/RequestFailedInformationComponent'
import DeleteOrderConfirmationComponent from '../../components/orders/dialog/DeleteOrderConfirmationComponent'

// create a local instance of order state actions (we don't use the reducer / selector for
// those as they are used though promises)
const orderStateActions = new OrderClient.OrderStateActions('')
// store dependencies for runtime resolution
const pauseResumeDependencies = [orderStateActions.getPauseDependency(), orderStateActions.getResumeDependency()]
const deleteSuperficiallyDependencies = [orderStateActions.getDeleteSuperficiallyDependency()]
const deleteCompletelyDependencies = [orderStateActions.getDeleteCompletelyDependency()]

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
  static mapStateToProps(state, { ordersSelectors }) {
    return {
      isFetching: ordersSelectors.isFetching(state),
      totalOrderCount: ordersSelectors.getResultsCount(state),
      availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  static propTypes = {
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    ordersRequestParameters: PropTypes.objectOf(PropTypes.string),
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // not provided when navigation is disabled
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions), // used in mapDispatchToProps
    // optional children, can be used to add rows into orders table header
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // from mapStateToProps
    isFetching: PropTypes.bool,
    totalOrderCount: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    availableEndpoints: PropTypes.arrayOf(PropTypes.string), // used in onPropertiesUpdated
  }

  /** Page size for this component queries */
  static PAGE_SIZE = 20

  /** Default component state */
  static DEFAULT_STATE = {
    /** columns visibility, not initialized to be matched againts display mode at initialization */
    columnsVisibility: null,
    // enpoints rights management
    hasPauseResume: false,
    hasDeleteSuperficially: false,
    hasDeleteCompletely: false,
    // current failure query response (null when hidden)
    currentFailureResponse: null,
    // async request notification information
    asynchRequestInformation: false,
    // current delete operation like {completeDelete: boolean, onDelete: function}, null when none
    deleteConfirmation: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const oldState = this.state
    const newState = { ...(isEmpty(oldState) ? OrderListContainer.DEFAULT_STATE : oldState) }
    // select default visible columns on display mode (mainly initialization)
    if (oldProps.displayMode !== newProps.displayMode) {
      if (newProps.displayMode === ORDER_DISPLAY_MODES.USER) {
        newState.columnsVisibility = OrderListComponent.DEFAULT_USER_COLUMNS_VISIBILITY
      } else {
        newState.columnsVisibility = OrderListComponent.DEFAULT_ADMIN_COLUMNS_VISIBILITY
      }
    }

    // update options state
    if (!isEqual(oldProps.availableEndpoints, newProps.availableEndpoints)) {
      newState.hasPauseResume = allMatchHateoasDisplayLogic(pauseResumeDependencies, newProps.availableEndpoints)
      newState.hasDeleteSuperficially = allMatchHateoasDisplayLogic(deleteSuperficiallyDependencies, newProps.availableEndpoints)
      newState.hasDeleteCompletely = allMatchHateoasDisplayLogic(deleteCompletelyDependencies, newProps.availableEndpoints)
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

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

  /** Request callback: show a request failure to user */
  onShowRequestFailedInformation = requestResponse => this.setState({ currentFailureResponse: requestResponse })

  /** User callback: hide request failure */
  onHideRequestFailedInformation = () => this.setState({ currentFailureResponse: null })

  /** Request callback: everythink went fine, notify user of an asynchronous treatment in progres */
  onShowAsynchronousRequestInformation = () => this.setState({ asynchRequestInformation: true })

  /** User callback: hide aynchronous information */
  onHideAsynchronousRequestInformation = () => this.setState({ asynchRequestInformation: false })

  /** On delete user request: shows confirmation dialog */
  onShowDeleteConfirmation = (completeDelete, onDelete) => this.setState({ deleteConfirmation: { completeDelete, onDelete } })

  /** User callback: hide aynchronous information */
  onHideDeleteConfirmation = () => this.setState({ deleteConfirmation: null })

  render() {
    const {
      children, displayMode, isFetching, totalOrderCount, navigationActions,
      ordersRequestParameters, ordersActions, ordersSelectors,
    } = this.props
    const {
      columnsVisibility, hasDeleteCompletely, hasDeleteSuperficially, hasPauseResume,
      currentFailureResponse, asynchRequestInformation, deleteConfirmation,
    } = this.state
    return (
      <React.Fragment>
        { /* request fail information component, on demand */ }
        <RequestFailedInformationComponent
          visible={!!currentFailureResponse}
          requestResponse={currentFailureResponse}
          onClose={this.onHideRequestFailedInformation}
        />
        { /* asynchronous request information component, on demand */ }
        <AsynchronousRequestInformationComponent
          visible={asynchRequestInformation}
          onClose={this.onHideAsynchronousRequestInformation}
        />
        { /* delete confirmation component, on demand */ }
        <DeleteOrderConfirmationComponent
          visible={!!deleteConfirmation}
          isCompleteDelete={get(deleteConfirmation, 'completeDelete', false)}
          onClose={this.onHideDeleteConfirmation}
          onDelete={get(deleteConfirmation, 'onDelete', noop)}
        />
        { /* Order list component */}
        <OrderListComponent
          displayMode={displayMode}
          pageSize={OrderListContainer.PAGE_SIZE}
          isFetching={isFetching}
          totalOrderCount={totalOrderCount}
          columnsVisibility={columnsVisibility}
          hasDeleteCompletely={hasDeleteCompletely}
          hasDeleteSuperficially={hasDeleteSuperficially}
          hasPauseResume={hasPauseResume}
          onChangeColumnsVisibility={this.onChangeColumnsVisibility}
          ordersRequestParameters={ordersRequestParameters}
          ordersActions={ordersActions}
          ordersSelectors={ordersSelectors}
          orderStateActions={orderStateActions}
          navigationActions={navigationActions}
          onShowRequestFailedInformation={this.onShowRequestFailedInformation}
          onShowAsynchronousRequestInformation={this.onShowAsynchronousRequestInformation}
          onShowDeleteConfirmation={this.onShowDeleteConfirmation}
        >
          {HOCUtils.renderChildren(children)}
        </OrderListComponent>
      </React.Fragment>)
  }
}

// export connected to module styles (but allow overriding)
export default connect(OrderListContainer.mapStateToProps)(OrderListContainer)
