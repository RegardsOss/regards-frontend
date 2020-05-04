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
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { PluginConfiguration } from '@regardsoss/api'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'
import { pluginDefPartitionsActions, pluginDefPartitionsSelectors } from '../clients/PluginsDefinitionPartitionsClient'
import PluginLoader from './PluginLoader'

/**
 * This component allow to load a given plugin definition and render it with the given configuration
 * when the plugin definition is successfully fetched.
 * Display of the plugin is asynchronous and effective when the plugin definition is loaded. Loaded definitions
 * are stored in the corresponding partition to be shared across PluginProvider instances
 *
 * This class do not load the plugin but only the plugin definition form the server.
 * @see PluginProvider for more information about Plugin loading.
 * @author Sébastien Binda
 */
export class PluginProvider extends React.Component {
  /**
   * Builds plugin partition key from plugin ID
   * @param {number} pluginId -
   * @return {string} plugin partition key
   */
  static getPartitionKey(pluginId) {
    return `plugin-definition-${pluginId}`
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginId }) {
    return {
      pluginPartition: pluginDefPartitionsSelectors.getPartition(state, PluginProvider.getPartitionKey(pluginId)),
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
      fetchPlugin: pluginId => dispatch(uiPluginDefinitionActions.fetchEntity(pluginId)),
      onPluginLoadingStarted: pluginId => dispatch(pluginDefPartitionsActions.onDataLoadingStart(
        PluginProvider.getPartitionKey(pluginId))),
      onPluginLoadingDone: (pluginId, pluginDefinition) => dispatch(pluginDefPartitionsActions.onDataLoadingDone(
        PluginProvider.getPartitionKey(pluginId), pluginDefinition)),
      onPluginLoadingFailed: (pluginId, errorMessage) => dispatch(pluginDefPartitionsActions.onDataLoadingFailed(
        PluginProvider.getPartitionKey(pluginId), errorMessage)),
    }
  }

  /**
   * pluginConf : Props to add to te plugin rendering element,
   * displayPlugin : Display the plugin component. If false the plugin is only passed as a prop to the children of this provider
   */
  static propTypes = {
    /**
     * pluginInstanceId: An unique identifier of the plugin to provide, in  case you're loading multiple plugins on the same page
     */
    pluginInstanceId: PropTypes.string.isRequired,
    /**
     * Id of a plugin definition (plugin type to instantiate)
     */
    pluginId: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pluginConf: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    displayPlugin: PropTypes.bool,
    onErrorCallback: PropTypes.func,
    loadingComponent: PropTypes.element,
    errorComponent: PropTypes.element,
    children: PropTypes.element,
    // From mapStateToProps
    pluginPartition: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      hasError: PropTypes.bool.isRequired,
      data: AccessShapes.UIPluginDefinition,
    }).isRequired,
    // From mapDispatchToProps
    fetchPlugin: PropTypes.func,
    onPluginLoadingStarted: PropTypes.func.isRequired,
    onPluginLoadingDone: PropTypes.func.isRequired,
    onPluginLoadingFailed: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loadingComponent: <LoadableContentDisplayDecorator isLoading />,
  }

  /**
   * React life cycle method: component will mount. Used here to catch the first component mounting and initializing partition
   * definition for all components working with that partition (Nota: component did mount will not work here, as all components
   * receive the same properties, captured just before redux store can update)
   */
  componentWillMount() {
    const {
      pluginPartition, pluginId,
      fetchPlugin, onPluginLoadingStarted,
      onPluginLoadingDone, onPluginLoadingFailed,
    } = this.props
    // when partition state is not initialized, nor initializing (not loading, no data and not in error)
    if (!pluginPartition.loading && !pluginPartition.hasError && !pluginPartition.data) {
      onPluginLoadingStarted(pluginId) // mark loading started
      // start loading
      fetchPlugin(pluginId)
        .then(({ payload }) => {
          const loadedDefinition = get(payload, `entities.${PluginConfiguration.normalizrKey}[${pluginId}]`)
          if (payload.error || !loadedDefinition) {
            throw new Error('Loading failure')
          }
          onPluginLoadingDone(pluginId, loadedDefinition)
        })
        .catch(error => onPluginLoadingFailed(pluginId, `Failed resolving plugin definition with id ${pluginId}`))
    }
  }

  render() {
    const {
      pluginInstanceId, pluginProps, pluginConf,
      pluginPartition: { loading, hasError, data }, displayPlugin,
      onErrorCallback, loadingComponent, errorComponent,
    } = this.props
    // return loading component while retrieving configuration,
    // plugin loader, using configuration otherwise
    if (hasError) {
      return errorComponent || null
    }
    if (loading || !data) {
      return loadingComponent || null
    }

    return (
      <PluginLoader
        pluginInstanceId={pluginInstanceId}
        pluginName={data.content.name}
        pluginPath={data.content.sourcePath}
        displayPlugin={displayPlugin}
        pluginConf={pluginConf}
        pluginProps={pluginProps}
        onErrorCallback={onErrorCallback}
        loadingComponent={loadingComponent}
        errorComponent={errorComponent}
      >
        {this.props.children}
      </PluginLoader>)
  }
}

export default connect(
  PluginProvider.mapStateToProps,
  PluginProvider.mapDispatchToProps)(PluginProvider)
