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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { StorageShapes } from '@regardsoss/shape'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import {
  storageLocationActions, storageLocationSelectors, storageLocationPriorityDownActions, storageLocationPriorityUpActions,
  storageLocationDeleteFilesActions, storageLocationCopyFilesActions, storageLocationErrorsRetryActions,
  storageLocationMonitoringActions,
} from '../clients/StorageLocationClient'
import { storageRequestActions, storageRequestStopActions } from '../clients/StorageRequestClient'
import StorageLocationListComponent from '../components/StorageLocationListComponent'

/**
* List all the storages Online and nearline
* @author Sébastien Binda
*/
export class StorageLocationListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      entities: storageLocationSelectors.getOrderedList(state),
      isLoading: storageLocationSelectors.isFetching(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
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
      fetch: () => dispatch(storageLocationActions.fetchEntityList({}, { type: props.type })),
      update: (storageLocation) => dispatch(storageLocationActions.updateEntity(storageLocation.id, storageLocation)),
      delete: (name) => dispatch(storageLocationActions.deleteEntity(name)),
      deleteFiles: (name, force) => dispatch(storageLocationDeleteFilesActions.deleteFiles(name, force)),
      copyFiles: (nameSource, pathSource, nameTarget, pathTarget, types) => dispatch(storageLocationCopyFilesActions.copyFiles(nameSource, pathSource, nameTarget, pathTarget, types)),
      upPriority: (name, conf) => dispatch(storageLocationPriorityUpActions.upPriority(name, conf)),
      downPriority: (name, conf) => dispatch(storageLocationPriorityDownActions.downPriority(name, conf)),
      retryErrors: (id, type) => dispatch(storageLocationErrorsRetryActions.retryErrors(id, type)),
      deleteErrors: (storage, type) => dispatch(storageRequestActions.deleteEntity(null, { storage, type })),
      fetchErrors: (storage, type) => dispatch(storageRequestActions.fetchPagedEntityList(0, 100, { storage, type }, { status: 'ERROR' })),
      relaunchMonitoring: (reset) => dispatch(storageLocationMonitoringActions.relaunchMonitoring(reset)),
      onStop: () => dispatch(storageRequestStopActions.stop()),
    }
  }

  static propTypes = {
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    entities: StorageShapes.StorageLocationArray,
    isLoading: PropTypes.bool.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    deleteFiles: PropTypes.func.isRequired,
    copyFiles: PropTypes.func.isRequired,
    upPriority: PropTypes.func.isRequired,
    downPriority: PropTypes.func.isRequired,
    retryErrors: PropTypes.func.isRequired,
    fetchErrors: PropTypes.func.isRequired,
    deleteErrors: PropTypes.func.isRequired,
    relaunchMonitoring: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
  }

  UNSAFE_componentWillMount() {
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

  onActivateToggle = (entity) => {
    const updatedObject = { ...entity }
    updatedObject.configuration.pluginConfiguration = { ...entity.configuration.pluginConfiguration, active: !entity.configuration.pluginConfiguration.active }
    this.props.update(updatedObject)
  }

  onUpPriority = (storageLocation) => {
    this.props.upPriority(storageLocation.name, storageLocation)
      .then(
        (actionResult) => {
          this.props.fetch()
        })
  }

  onDownPriority = (storageLocation) => {
    this.props.downPriority(storageLocation.name, storageLocation)
      .then(
        (actionResult) => {
          this.props.fetch()
        })
  }

  render() {
    return (
      <StorageLocationListComponent
        entities={this.props.entities}
        isLoading={this.props.isLoading}
        availableDependencies={this.props.availableDependencies}
        onEdit={this.onEdit}
        onUpPriority={this.onUpPriority}
        onDownPriority={this.onDownPriority}
        onDuplicate={this.onDuplicate}
        onDelete={this.props.delete}
        onRetryErrors={this.props.retryErrors}
        onDeleteErrors={this.props.deleteErrors}
        onViewErrors={this.props.fetchErrors}
        onDeleteFiles={this.props.deleteFiles}
        onCopyFiles={this.props.copyFiles}
        onActivateToggle={this.onActivateToggle}
        onRefresh={this.props.fetch}
        onStop={this.props.onStop}
        onRelaunchMonitoring={this.props.relaunchMonitoring}
      />
    )
  }
}
export default connect(
  StorageLocationListContainer.mapStateToProps,
  StorageLocationListContainer.mapDispatchToProps)(StorageLocationListContainer)
