/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { StorageDomain } from '@regardsoss/domain'
import { allocationStrategyActions, allocationStrategyByPluginIdActions, allocationStrategySelectors } from '../../clients/AllocationStrategyClient'
import AllocationStrategyListComponent from '../../components/allocations/AllocationStrategyListComponent'

const MICROSERVICE = STATIC_CONF.MSERVICES.STORAGE
const ALLOCATION_TYPE = StorageDomain.PluginTypeEnum.ALLOCATION_STRATEGY
/**
* Container to handle allocation strategy plugin configurations
* @author Sébastien Binda
*/
export class AllocationStrategyListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    return {
      entities: allocationStrategySelectors.getOrderedList(state),
      isLoading: allocationStrategySelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, props) {
    return {
      fetch: () => dispatch(allocationStrategyActions.getPluginConfigurationsByType(MICROSERVICE, ALLOCATION_TYPE)),
      update: conf => dispatch(allocationStrategyByPluginIdActions.updateEntity(
        conf.id, conf, { microserviceName: MICROSERVICE, pluginId: conf.pluginId })),
      delete: conf => dispatch(allocationStrategyByPluginIdActions.deleteEntity(conf.id, { microserviceName: MICROSERVICE, pluginId: conf.pluginId })),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }),
    // from mapStateToProps
    entities: CommonShapes.PluginConfigurationArray,
    isLoading: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetch()
  }

  onEdit = (priotitizedDataStorageToEdit) => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/allocations/${priotitizedDataStorageToEdit.id}/edit`)
  }

  onActivateToggle = (entity) => {
    this.props.update(Object.assign({}, entity, {
      active: !entity.active,
    })).then((actionResults) => {
      this.props.fetch()
    })
  }

  onDelete = (conf) => {
    this.props.delete(conf)
  }

  goToCreateForm = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/allocations/create`)
  }

  goToBoard = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  render() {
    return (
      <AllocationStrategyListComponent
        onBack={this.goToBoard}
        onAddNewConf={this.goToCreateForm}
        onEdit={this.onEdit}
        onDuplicate={this.onDuplicate}
        onDelete={this.onDelete}
        onActivateToggle={this.onActivateToggle}
        onRefresh={this.props.fetch}
        entities={this.props.entities}
        isLoading={this.props.isLoading}
      />
    )
  }
}
export default connect(
  AllocationStrategyListContainer.mapStateToProps,
  AllocationStrategyListContainer.mapDispatchToProps)(AllocationStrategyListContainer)
