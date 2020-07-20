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
import { connect } from '@regardsoss/redux'
import { OrderDomain } from '@regardsoss/domain'
import { CommonShapes, OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import DeleteOrderComponent from '../../../components/orders/options/DeleteOrderComponent'

/**
 * Delete order table option container.
 * @author Raphaël Mechali
 */
export class DeleteOrderContainer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: OrderShapes.OrderWithContent.isRequired,
    pageSize: PropTypes.number.isRequired,
    hasDeleteSuperficially: PropTypes.bool.isRequired,
    hasDeleteCompletely: PropTypes.bool.isRequired,
    // eslint-disable-next-line
    pathParams: PropTypes.object, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    requestParams: CommonShapes.RequestParameters, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    orderStateActions: PropTypes.instanceOf(OrderClient.OrderStateActions).isRequired, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used in mapStateToProps
    // show request fail callback: requestResponse => ()
    onShowRequestFailedInformation: PropTypes.func.isRequired,
    onShowDeleteConfirmation: PropTypes.func.isRequired,

    // from mapStateToProps
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),

    // from mapDispatchToProps
    sendDeleteSuperficially: PropTypes.func.isRequired,
    sendDeleteCompletely: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
  }

  /** States in which the order can be superficially deleted */
  static SUPERFICIALLY_DELETABLE_STATES = [
    OrderDomain.ORDER_STATUS_ENUM.PAUSED,
  ]

  /** States that can be completely deleted */
  static COMPLETELY_DELETABLE_STATES = [
    OrderDomain.ORDER_STATUS_ENUM.EXPIRED,
    OrderDomain.ORDER_STATUS_ENUM.FAILED,
    OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING,
    OrderDomain.ORDER_STATUS_ENUM.DONE,
    OrderDomain.ORDER_STATUS_ENUM.DELETED,
  ]

  static DEFAULT_STATE = { isFetching: false }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { ordersSelectors }) {
    return {
      pageMetadata: ordersSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, {
    ordersActions, orderStateActions, entity, pathParams, requestParams,
  }) {
    return {
      sendDeleteSuperficially: () => dispatch(orderStateActions.deleteSuperficiallyOrder(entity.content.id)),
      sendDeleteCompletely: () => dispatch(orderStateActions.deleteCompletelyOrder(entity.content.id)),
      fetchOrders: (pageIndex, pageSize) => dispatch(ordersActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, requestParams)),
    }
  }

  /**
   * Lifecycle method: component will mount. used here to initialize the state
   */
  UNSAFE_componentWillMount = () => this.setFetching(false)

  /**
   * User asked for delete: show confirmation dialog, process only when confirmed
   * On delete superficially callback. Fetches delete superficially and shows error if any
   */
  onDeleteRequest = () => {
    const { onShowDeleteConfirmation } = this.props
    onShowDeleteConfirmation(this.canDeleteCompletely(), this.onDeleteConfirmed)
  }

  /**
   * User confirmed delete operation: perform it, notify if there is any problem
   */
  onDeleteConfirmed = () => {
    const {
      entity: { content: { id } }, sendDeleteSuperficially, sendDeleteCompletely, onShowRequestFailedInformation,
    } = this.props
    this.setFetching(true)
    const sendMethod = this.canDeleteCompletely() ? sendDeleteCompletely : sendDeleteSuperficially
    sendMethod(id).then((response) => {
      if (response.error) {
        onShowRequestFailedInformation(response)
      } else {
        // refresh table on success
        this.refreshTable()
      }
      this.setFetching(false)
    })
  }

  /**
   * Sets fetching state
   * @param {boolean} isFetching is fetching?
   */
  setFetching = (isFetching) => this.setState({ isFetching })

  /**
   * Refreshes table up to the current last page
   */
  refreshTable = () => {
    const { pageSize, pageMetadata, fetchOrders } = this.props
    const lastPage = (pageMetadata && pageMetadata.number) || 0
    fetchOrders(0, pageSize * (lastPage + 1))
  }

  /**
   * Can perform a complete delete opetarion? Note: never true when delete superficially is possible
   * @return true if user can perfor a complete delete operation on order
   */
  canDeleteCompletely = () => {
    const { entity: { content: { status } }, hasDeleteCompletely } = this.props
    return DeleteOrderContainer.COMPLETELY_DELETABLE_STATES.includes(status) && hasDeleteCompletely
  }

  /**
   * Can perform a superficial delete opetarion? Note: never true when delete completely is possible
   * @return true if user can perfor a complete delete operation on order
   */
  canDeleteSuperficially = () => {
    const { entity: { content: { status } }, hasDeleteSuperficially } = this.props
    return DeleteOrderContainer.SUPERFICIALLY_DELETABLE_STATES.includes(status) && hasDeleteSuperficially
  }

  render() {
    const { isFetching } = this.state
    return (
      <DeleteOrderComponent
        isCompleteDelete={this.canDeleteCompletely()}
        canDelete={!isFetching && (this.canDeleteSuperficially() || this.canDeleteCompletely())}
        onDelete={this.onDeleteRequest}
      />
    )
  }
}
export default connect(
  DeleteOrderContainer.mapStateToProps,
  DeleteOrderContainer.mapDispatchToProps,
)(DeleteOrderContainer)
