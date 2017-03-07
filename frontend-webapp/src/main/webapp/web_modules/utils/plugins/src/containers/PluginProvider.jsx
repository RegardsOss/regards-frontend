/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { PluginDefinition } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import PluginActions from '../model/PluginActions'
import PluginSelector from '../model/PluginSelector'
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
   * pluginId: Indetifier of the plugin to provide
   * pluginConf : Props to add to te plugin rendering element,
   * displayPlugin : Display the plugin component. If false the plugin is only passed as a prop to the children of this provider
   *
   * @type {{pluginId: *, pluginConf: *, displayPlugin: *, children: *, loadedPlugin: *, loadPlugin: *, locale: *}}
   */
  static propTypes = {
    /**
     * Id of the plugin configuration instance
     */
    pluginInstanceId: React.PropTypes.string.isRequired,
    /**
     * Id of a plugin definition (plugin type to instanciate)
     */
    pluginId: React.PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pluginConf: React.PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: React.PropTypes.object,
    displayPlugin: React.PropTypes.bool,
    children: React.PropTypes.element,
    // Set by mapstatetoprops
    pluginToLoad: PluginDefinition,
    fetchPlugin: React.PropTypes.func,
  }

  componentWillMount() {
    if (!this.props.pluginToLoad) {
      this.props.fetchPlugin(this.props.pluginId)
    }
  }

  renderPlugin() {
    if (this.props.pluginToLoad) {
      return (
        <PluginLoader
          pluginInstanceId={this.props.pluginInstanceId}
          pluginName={this.props.pluginToLoad.content.name}
          pluginPath={this.props.pluginToLoad.content.sourcesPath}
          displayPlugin={this.props.displayPlugin}
          pluginConf={this.props.pluginConf}
          pluginProps={this.props.pluginProps}
        >
          {this.props.children}
        </PluginLoader>
      )
    }
    return null
  }

  render() {
    return (
      <LoadableContentDisplayDecorator
        isLoading={!this.props.pluginToLoad}
      >
        {this.renderPlugin()}
      </LoadableContentDisplayDecorator>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  pluginToLoad: PluginSelector.getById(state, ownProps.pluginId),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPlugin: pluginId => dispatch(PluginActions.fetchEntity(pluginId)),
})

// Export for tests
const UnconnectedPluginProvider = PluginProvider
export {
  UnconnectedPluginProvider,
}
// Default export
export default connect(mapStateToProps, mapDispatchToProps)(PluginProvider)
