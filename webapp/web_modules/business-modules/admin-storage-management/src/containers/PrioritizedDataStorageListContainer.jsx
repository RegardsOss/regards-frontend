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
import {
  storagesPluginActions, storagesPluginSelectors, storagesPluginDownActions, storagesPluginUpActions, storagesPluginDeleteFilesActions,
} from '../clients/StoragesPluginClient'
import PrioritizedDataStorageListComponent from '../components/PrioritizedDataStorageListComponent'

/**
* List all the storages Online and nearline
* @author Sébastien Binda
*/
export class PrioritizedDataStorageListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      entities: storagesPluginSelectors.getOrderedList(state),
      isLoading: storagesPluginSelectors.isFetching(state),
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
      fetch: () => dispatch(storagesPluginActions.fetchEntityList({}, { type: props.type })),
      update: prioritizedDataStorage => dispatch(storagesPluginActions.updateEntity(prioritizedDataStorage.id, prioritizedDataStorage)),
      delete: name => dispatch(storagesPluginActions.deleteEntity(name)),
      deleteFiles: (name, force) => dispatch(storagesPluginDeleteFilesActions.deleteFiles(name, force)),
      upPriority: (name, conf) => dispatch(storagesPluginUpActions.upPriority(name, conf)),
      downPriority: (name, conf) => dispatch(storagesPluginDownActions.downPriority(name, conf)),
    }
  }

  static propTypes = {
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    entities: StorageShapes.PrioritizedDataStorageArray,
    isLoading: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    deleteFiles: PropTypes.func.isRequired,
    upPriority: PropTypes.func.isRequired,
    downPriority: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetch()
  }

  onDuplicate = (priotitizedDataStorageToDuplicate) => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${priotitizedDataStorageToDuplicate.name}/copy`)
  }

  onEdit = (priotitizedDataStorageToEdit) => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${priotitizedDataStorageToEdit.name}/edit`)
  }

  onDeleteFiles = (storageName) => {
    const { deleteFiles } = this.props
    deleteFiles(storageName).then((actionResult) => {
      this.props.fetch()
    })
  }

  onCopyFiles = (storageName) => {
    // const { copyFiles } = this.props
    // copyFiles(storageName).then((actionResult) => {
    //   this.props.fetch()
    // })
  }

  onDelete = (name) => {
    this.props.delete(name)
  }

  onActivateToggle = (entity) => {
    const updatedObject = Object.assign({}, entity)
    updatedObject.configuration.pluginConfiguration = Object.assign({}, entity.configuration.pluginConfiguration, {
      active: !entity.configuration.pluginConfiguration.active,
    })
    this.props.update(updatedObject)
  }

  onUpPriority = (prioritizedDataStorage) => {
    this.props.upPriority(prioritizedDataStorage.name, prioritizedDataStorage)
      .then(
        (actionResult) => {
          this.props.fetch()
        })
  }

  onDownPriority = (prioritizedDataStorage) => {
    this.props.downPriority(prioritizedDataStorage.name, prioritizedDataStorage)
      .then(
        (actionResult) => {
          this.props.fetch()
        })
  }

  goToCreateForm = () => {
    const { project, type } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${type}/create`)
  }

  onRelaunchDeletionsErrors = () => {
    //
  }

  onRelaunchStoragesErrors = () => {
    //
  }

  render() {
    return (
      <PrioritizedDataStorageListComponent
        onEdit={this.onEdit}
        onUpPriority={this.onUpPriority}
        onDownPriority={this.onDownPriority}
        onDuplicate={this.onDuplicate}
        onDelete={this.onDelete}
        onDeleteFiles={this.onDeleteFiles}
        onCopyFiles={this.onCopyFiles}
        onActivateToggle={this.onActivateToggle}
        onRefresh={this.props.fetch}
        entities={this.props.entities}
        isLoading={this.props.isLoading}
        goToCreateForm={this.goToCreateForm}
        onRelaunchDeletionsErrors={this.onRelaunchDeletionsErrors}
        onRelaunchStoragesErrors={this.onRelaunchStoragesErrors}
      />
    )
  }
}
export default connect(
  PrioritizedDataStorageListContainer.mapStateToProps,
  PrioritizedDataStorageListContainer.mapDispatchToProps)(PrioritizedDataStorageListContainer)
