/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { StorageDomain } from '@regardsoss/domain'
import { CommonShapes } from '@regardsoss/shape'
import { pluginConfigurationActions, pluginConfigurationSelectors, pluginConfigurationByPluginIdActions } from '../clients/PluginConfigurationClient'
import PluginStorageConfigurationListComponent from '../components/PluginStorageConfigurationListComponent'

/**
* Container to handle list of data storage plugins from microservice rs-storage.
* This component is specific to handle priority of onlines and nealines plugins.
* @author Sébastien Binda
*/
export class StoragePluginConfigurationListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      pluginConfigurations: pluginConfigurationSelectors.getOrderedList(state),
      isLoading: pluginConfigurationSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchPluginConfiguration: () =>
        dispatch(pluginConfigurationActions.getPluginConfigurationsByType(
          STATIC_CONF.MSERVICES.STORAGE,
          StorageDomain.PluginTypeEnum.STORAGE,
        )),
      updatePluginConfiguration: pluginConf =>
        dispatch(pluginConfigurationByPluginIdActions.updateEntity(
          pluginConf.id, pluginConf, { microserviceName: STATIC_CONF.MSERVICES.STORAGE, pluginId: pluginConf.pluginId })),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    pluginConfigurations: CommonShapes.PluginConfigurationArray,
    isLoading: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchPluginConfiguration: PropTypes.func.isRequired,
    updatePluginConfiguration: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchPluginConfiguration()
  }

  /**
   * @return back URL
   */
  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  /**
   * @return create new configuration URL for navigation
   */
  onAddConf = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/create`)
  }

  onDuplicatePluginConf = (pluginConf) => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${pluginConf.id}/copy`)
  }

  onEditPluginConf = (pluginConf) => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${pluginConf.id}/edit`)
  }

  onUpPluginPriority = (pluginConf) => {
    // TODO ....
  }

  onDownPluginPriority = (pluginConf) => {
    // TODO ....
  }

  onActivateToggle = (plugiConf) => {
    const updatedPluginConfiguration = Object.assign({}, plugiConf, {
      active: !plugiConf.active,
    })
    this.props.updatePluginConfiguration(updatedPluginConfiguration)
  }

  render() {
    return (
      <PluginStorageConfigurationListComponent
        pluginConfigurations={this.props.pluginConfigurations}
        isLoading={this.props.isLoading}
        onBack={this.onBack}
        onNewPluginConf={this.onAddConf}
        onEditPluginConf={this.onEditPluginConf}
        onDuplicatePluginConf={this.onDuplicatePluginConf}
        onUpPluginPriority={this.onUpPluginPriority}
        onDownPluginPriority={this.onDownPluginPriority}
        onActivateToggle={this.onActivateToggle}
      />
    )
  }
}
export default connect(
  StoragePluginConfigurationListContainer.mapStateToProps,
  StoragePluginConfigurationListContainer.mapDispatchToProps)(StoragePluginConfigurationListContainer)
