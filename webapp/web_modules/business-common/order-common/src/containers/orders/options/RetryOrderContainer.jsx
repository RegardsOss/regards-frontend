/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import RetryOrderComponent from '../../../components/orders/options/RetryOrderComponent'
import RetryOrderSelectionModeComponent from '../../../components/orders/dialog/RetryOrderSelectionModeComponent'

export class RetryOrderContainer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: OrderShapes.OrderWithContent.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    orderStateActions: PropTypes.instanceOf(OrderClient.OrderStateActions).isRequired, // used in mapDispatchToProps
    onShowRetryMode: PropTypes.func.isRequired,
    // from mapstateToProps
    onRetryErrors: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { ordersSelectors }) {
    return {
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { entity, orderStateActions }) {
    return {
      onRetryErrors: () => dispatch(orderStateActions.retryOrder(entity.content.id)),
      onRestart: (label, onSuccessFullUrl) => dispatch(orderStateActions.restartOrder(entity.content.id, label, onSuccessFullUrl)),
    }
  }

  canRetry = () => this.props.entity.links.some( (link) => link.rel === 'retry')

  canRestart = () => this.props.entity.links.some( (link) => link.rel === 'restart')

  onRetryOrder = () => {
    const { onShowRetryMode, entity } = this.props
    onShowRetryMode(get(entity, 'content.label', ' - '), this.canRetry(), this.canRestart(), this.onRetryModeSelected)
  }

  onRetryModeSelected = (mode, label, onSuccessFullUrl) => {
    switch (mode) {
      case RetryOrderSelectionModeComponent.RESTART_MODE:
        return this.canRestart() ? this.props.onRestart(label, onSuccessFullUrl) : null
      case RetryOrderSelectionModeComponent.RETRY_ERRORS_MODE:
        return this.canRetry() ? this.props.onRetryErrors(label, onSuccessFullUrl) : null
      default:
        return null
    }
  }

  render() {
    return (
      <RetryOrderComponent canRetry={this.canRetry() || this.canRestart()} onRetry={this.onRetryOrder} />
    )
  }
}

export default connect(
  RetryOrderContainer.mapStateToProps,
  RetryOrderContainer.mapDispatchToProps,
)(RetryOrderContainer)
