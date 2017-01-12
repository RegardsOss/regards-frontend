/**
 * LICENSE_PLACEHOLDER
 **/
import PluginProvider from './PluginProvider'


/**
 * This component allow to load a given plugin and display it.
 * Display of the plugin is asynchrone and effective when the plugin is loaded.
 */
class PluginComponent extends React.Component {

  static propTypes = {
    pluginId: React.PropTypes.string.isRequired,
    pluginConf: React.PropTypes.any,
  }

  render() {
    return (
      <PluginProvider
        pluginId={this.props.pluginId}
        pluginConf={this.props.pluginConf}
        displayPlugin
      />
    )
  }
}

export default PluginComponent
