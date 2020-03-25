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
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { uiPluginDefinitionActions, uiPluginDefinitionSelectors } from '../clients/UIPluginDefinitionClient'
import PluginLoader from './PluginLoader'

/**
 * This component allow to load a given plugin definition and render it with the given configuration
 * when the plugin definition is successfully fetched.
 * Display of the plugin is asynchronous and effective when the plugin definition is loaded.
 *
 * This class do not load the plugin but only the plugin definition form the server.
 * @see PluginProvider for more information about Plugin loading.
 * @author Sébastien Binda
 */
class PluginProvider extends React.Component {
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
     * Id of a plugin definition (plugin type to instanciate)
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
    // Set by mapstatetoprops
    pluginToLoad: AccessShapes.UIPluginDefinition,
    fetchPlugin: PropTypes.func,
  }

  static defaultProps = {
    loadingComponent: <LoadableContentDisplayDecorator isLoading />,
  }

  componentWillMount() {
    if (!this.props.pluginToLoad) {
      this.props.fetchPlugin(this.props.pluginId)
    }
  }

  render() {
    const {
      pluginInstanceId, pluginProps,
      pluginToLoad, pluginConf, displayPlugin,
      onErrorCallback, loadingComponent, errorComponent,
    } = this.props
    // return loading component while retrieving configuration,
    // plugin loader, using configuration otherwise
    return pluginToLoad ? (
      <PluginLoader
        pluginInstanceId={pluginInstanceId}
        pluginName={pluginToLoad.content.name}
        pluginPath={pluginToLoad.content.sourcePath}
        displayPlugin={displayPlugin}
        pluginConf={pluginConf}
        pluginProps={pluginProps}
        onErrorCallback={onErrorCallback}
        loadingComponent={loadingComponent}
        errorComponent={errorComponent}
      >
        {this.props.children}
      </PluginLoader>) : loadingComponent
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginToLoad: uiPluginDefinitionSelectors.getById(state, ownProps.pluginId),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPlugin: pluginId => dispatch(uiPluginDefinitionActions.fetchEntity(pluginId)),
})

// Export for tests
const UnconnectedPluginProvider = PluginProvider
export { UnconnectedPluginProvider }
// Default export
export default connect(mapStateToProps, mapDispatchToProps)(PluginProvider)
