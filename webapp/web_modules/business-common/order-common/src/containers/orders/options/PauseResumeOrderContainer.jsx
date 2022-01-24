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
import { connect } from '@regardsoss/redux'
import { OrderDomain } from '@regardsoss/domain'
import { CommonShapes, OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import some from 'lodash/some'
import PauseResumeOrderComponent from '../../../components/orders/options/PauseResumeOrderComponent'

/**
 * Pause / resume order table option container
 * @author Raphaël Mechali
 */
export class PauseResumeOrderContainer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: OrderShapes.OrderWithContent.isRequired,
    pageSize: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    pathParams: CommonShapes.RequestParameters, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    requestParams: CommonShapes.RequestParameters,
    // eslint-disable-next-line react/no-unused-prop-types
    orderStateActions: PropTypes.instanceOf(OrderClient.OrderStateActions).isRequired, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used in mapStateToProps
    // show request fail callback: requestResponse => ()
    onShowRequestFailedInformation: PropTypes.func.isRequired,
    onShowAsynchronousRequestInformation: PropTypes.func.isRequired,

    // from mapStateToProps
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),

    // from mapDispatchToProps
    sendPause: PropTypes.func.isRequired,
    sendResume: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
  }

  /** States in which order is considered paused */
  static PAUSED_STATES = [OrderDomain.ORDER_STATUS_ENUM.PAUSED]

  /** States in which the order can be updated */
  static UPDATABLE_STATES = [
    'pause',
    'resume',
  ]

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
      sendPause: () => dispatch(orderStateActions.pauseOrder(entity.content.id)),
      sendResume: () => dispatch(orderStateActions.resumeOrder(entity.content.id)),
      fetchOrders: (pageIndex, pageSize) => dispatch(ordersActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, requestParams)),
    }
  }

  /**
   * Lifecycle method: component will mount. used here to initialize the state
   */
  UNSAFE_componentWillMount = () => this.setFetching(false)

  /**
   * @returns true when pause / resume should be active
   */
  canUpdate = () => {
    const { entity } = this.props
    const { isFetching } = this.state
    return !isFetching && some(entity.links, (link) => (
      PauseResumeOrderContainer.UPDATABLE_STATES.includes(link.rel)
    ))
  }

  /**
   * On pause callback: sends pause request then notifies user
   */
  onPause = () => {
    const {
      entity: { content: { id } },
      sendPause, onShowRequestFailedInformation, onShowAsynchronousRequestInformation,
    } = this.props
    this.setFetching(true)
    sendPause(id).then((response) => {
      if (response.error) {
        onShowRequestFailedInformation(response)
      } else {
        // notify user that his operation is successful and is now processing on server side
        onShowAsynchronousRequestInformation()
      }
      this.setFetching(false)
    })
  }

  /**
   * On resume callback: sends resume request and refresh table if successful, or notifies user if it fails
   */
  onResume = () => {
    const { entity: { content: { id } }, sendResume, onShowRequestFailedInformation } = this.props
    this.setFetching(true)
    sendResume(id).then((response) => {
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

  render() {
    const { entity: { content: { status } } } = this.props
    const isPaused = PauseResumeOrderContainer.PAUSED_STATES.includes(status)
    return (
      <PauseResumeOrderComponent
        canUpdate={this.canUpdate()}
        isPaused={isPaused}
        onPause={this.onPause}
        onResume={this.onResume}
      />
    )
  }
}
export default connect(
  PauseResumeOrderContainer.mapStateToProps,
  PauseResumeOrderContainer.mapDispatchToProps,
)(PauseResumeOrderContainer)
