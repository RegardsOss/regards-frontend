/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { PluginDefinition } from '@regardsoss/model'
import PluginActions from '../model/PluginActions'
import PluginSelector from '../model/PluginSelector'
import PluginLoader from './PluginLoader'

/**
 * This component allow to load a given plugin and display it.
 * Display of the plugin is asynchrone and effective when the plugin is loaded.
 *
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
    pluginId: React.PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pluginConf: React.PropTypes.object,
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

  render() {
    if (this.props.pluginToLoad) {
      return (
        <PluginLoader
          pluginPath={this.props.pluginToLoad.content.sourcesPath}
          displayPlugin={this.props.displayPlugin}
          pluginConf={this.props.pluginConf}
        >
          {this.props.children}
        </PluginLoader>
      )
    }

    return <div>Plugin loading ... </div>
  }

}

const mapStateToProps = (state, ownProps) => ({
  pluginToLoad: PluginSelector.getById(state, ownProps.pluginId),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPlugin: pluginId => dispatch(PluginActions.fetchEntity(pluginId, dispatch, [''])),
})

// Export for tests
const UnconnectedPluginProvider = PluginProvider
export {
  UnconnectedPluginProvider,
}
// Default export
export default connect(mapStateToProps, mapDispatchToProps)(PluginProvider)
