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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import DatasetFilesComponent from '../../components/files/DatasetFilesComponent'

/**
* selector order>dataset files container
* @author Raphaël Mechali
*/
export class DatasetFilesContainer extends React.Component {
  static propTypes = {
    // selected order
    // eslint-disable-next-line react/no-unused-prop-types
    order: OrderShapes.OrderWithContent.isRequired, // used in onPropertiesUpdated
    // selected dataset
    // eslint-disable-next-line react/no-unused-prop-types
    dataset: OrderShapes.DatasetTask.isRequired, // used in onPropertiesUpdated
    orderFilesActions: PropTypes.instanceOf(OrderClient.OrderDatasetFilesActions).isRequired,
    orderFilesSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // from mapStateToProps
    isFetching: PropTypes.bool,
    totalFilesCount: PropTypes.number.isRequired,
  }

  static DEFAULT_STATE = {
    /** columns visibility map (no assertion on child columns keys) */
    columnsVisibility: {}, // note: empty by default, when column isn't found it should be considered visible
    pathParams: {},
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { orderFilesSelectors }) {
    return {
      isFetching: orderFilesSelectors.isFetching(state),
      totalFilesCount: orderFilesSelectors.getResultsCount(state),
    }
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const oldState = this.state
    const newState = { ...(isEmpty(oldState) ? DatasetFilesContainer.DEFAULT_STATE : oldState) }
    if (!isEqual(oldProps.order, newProps.order) || !isEqual(oldProps.dataset, newProps.dataset)) {
      // update and pack path parameters for order query
      newState.pathParams = {
        order_id: newProps.order.content.id,
        dataset_id: newProps.dataset.id,
      }
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

  render() {
    const {
      isFetching, totalFilesCount, orderFilesActions, orderFilesSelectors,
    } = this.props
    const { pathParams, columnsVisibility } = this.state
    return (
      <DatasetFilesComponent
        isFetching={isFetching}
        totalFilesCount={totalFilesCount}
        pathParams={pathParams}
        orderFilesActions={orderFilesActions}
        orderFilesSelectors={orderFilesSelectors}
        columnsVisibility={columnsVisibility}
        onChangeColumnsVisibility={this.onChangeColumnsVisibility}
      />
    )
  }
}
export default connect(DatasetFilesContainer.mapStateToProps)(DatasetFilesContainer)
