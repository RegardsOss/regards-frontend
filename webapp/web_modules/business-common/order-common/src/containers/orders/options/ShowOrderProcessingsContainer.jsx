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
import { connect } from '@regardsoss/redux'
import { OrderShapes, ProcessingShapes, CommonShapes } from '@regardsoss/shape'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { ProcessingDomain } from '@regardsoss/domain'
import ShowOrderProcessingsComponent from '../../../components/orders/options/ShowOrderProcessingsComponent'

/**
 * @author Théo Lasserre
 */
export class ShowOrderProcessingsContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: OrderShapes.OrderWithContent.isRequired,
    onShowProcessings: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    processingList: ProcessingShapes.ProcessingList.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { processingSelectors, pluginMetaDataSelectors }) {
    return {
      processingList: processingSelectors.getList(state),
      pluginMetaDataList: pluginMetaDataSelectors.getList(state),
    }
  }

  state = {
    orderProcessings: null,
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
    const { entity, processingList, pluginMetaDataList } = newProps
    if (oldProps.processingList !== processingList) {
      this.setState({
        orderProcessings: ProcessingDomain.ProcessingUtils.getOrderProcessings(entity, processingList, pluginMetaDataList),
      })
    }
  }

  render() {
    const { onShowProcessings } = this.props
    const { orderProcessings } = this.state
    return (
      <ShowOrderProcessingsComponent
        orderProcessings={orderProcessings}
        onShowProcessings={onShowProcessings}
      />
    )
  }
}
export default connect(
  ShowOrderProcessingsContainer.mapStateToProps, null)(ShowOrderProcessingsContainer)
