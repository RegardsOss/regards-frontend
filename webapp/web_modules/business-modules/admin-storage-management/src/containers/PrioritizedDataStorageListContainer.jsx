/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { StorageShapes } from '@regardsoss/shape'
import { StorageDomain } from '@regardsoss/domain'
import {
  getActions, getSelectors, prioritizedDataStorageDownActions, prioritizedDataStorageUpActions,
} from '../clients/PrioritizedDataStorageClient'
import PrioritizedDataStorageListComponent from '../components/PrioritizedDataStorageListComponent'

/**
*Comment Here
* @author Sébastien Binda
*/
export class PrioritizedDataStorageListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, props) {
    return {
      entities: getSelectors(props.type).getOrderedList(state),
      isLoading: getSelectors(props.type).isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, props) {
    return {
      fetch: () => dispatch(getActions(props.type).fetchEntityList({}, { type: props.type })),
      update: prioritizedDataStorage => dispatch(getActions(props.type).updateEntity(prioritizedDataStorage.id, prioritizedDataStorage)),
      delete: id => dispatch(getActions(props.type).deleteEntity(id)),
      upPriority: (id, conf) => dispatch(prioritizedDataStorageUpActions.upPriority(id, conf)),
      downPriority: (id, conf) => dispatch(prioritizedDataStorageDownActions.downPriority(id, conf)),
    }
  }

  static propTypes = {
    project: PropTypes.string.isRequired,
    // Used only on mapStateToProps and mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    type: PropTypes.oneOf(StorageDomain.DataStorageTypeEnumValues).isRequired,
    // from mapStateToProps
    entities: StorageShapes.PrioritizedDataStorageArray,
    isLoading: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    upPriority: PropTypes.func.isRequired,
    downPriority: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetch()
  }

  onDuplicate = (priotitizedDataStorageToDuplicate) => {
    const { project, type } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${type}/${priotitizedDataStorageToDuplicate.id}/copy`)
  }

  onEdit = (priotitizedDataStorageToEdit) => {
    const { project, type } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${type}/${priotitizedDataStorageToEdit.id}/edit`)
  }

  onActivateToggle = (entity) => {
    const updatedObject = Object.assign({}, entity)
    updatedObject.storageConfiguration = Object.assign({}, entity.storageConfiguration, {
      active: !entity.storageConfiguration.active,
    })
    this.props.update(updatedObject)
  }

  onDelete = (entity) => {
    this.props.delete(entity.id)
  }

  onUpPriority = (prioritizedDataStorage) => {
    this.props.upPriority(prioritizedDataStorage.id, prioritizedDataStorage)
      .then(
        (actionResult) => {
          this.props.fetch()
        })
  }

  onDownPriority = (prioritizedDataStorage) => {
    this.props.downPriority(prioritizedDataStorage.id, prioritizedDataStorage)
      .then(
        (actionResult) => {
          this.props.fetch()
        })
  }

  goToCreateForm = () => {
    const { project, type } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${type}/create`)
  }

  render() {
    return (
      <PrioritizedDataStorageListComponent
        onEdit={this.onEdit}
        onUpPriority={this.onUpPriority}
        onDownPriority={this.onDownPriority}
        onDuplicate={this.onDuplicate}
        onDelete={this.onDelete}
        onActivateToggle={this.onActivateToggle}
        onRefresh={this.props.fetch}
        entities={this.props.entities}
        isLoading={this.props.isLoading}
        goToCreateForm={this.goToCreateForm}
      />
    )
  }
}
export default connect(
  PrioritizedDataStorageListContainer.mapStateToProps,
  PrioritizedDataStorageListContainer.mapDispatchToProps)(PrioritizedDataStorageListContainer)
