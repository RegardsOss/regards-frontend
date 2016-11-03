/** @module common */

import { connect } from 'react-redux'
import { intializePlugin } from './PluginsActions'

/**
 * React component to display a given plugin
 *
 * @prop {PluginType} plugin Plugin to display
 */
export function PluginComponent({ plugin, pluginInitialized }) {
    // Check if plugin is loaded.
    // If the plugin is loaded the react component
    // associated is in the "loadedComponent" attribute of the plugin
  if (plugin && plugin.loadedComponent) {
    return React.createElement(plugin.loadedComponent, null)
  }
  intializePlugin(plugin.paths, plugin.name, pluginInitialized)
  return <div className="error"> Undefined plugin </div>
}

PluginComponent.propTypes = {
  plugin: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  plugins: React.PropTypes.objectOf(React.PropTypes.string),
  pluginInitialized: React.PropTypes.func,
}

const mapStateToProps = state => ({
  plugins: state.common.plugins,
})

const mapDispatchToProps = dispatch => ({
  pluginInitialized: action => dispatch(action),
})


export default connect(mapStateToProps, mapDispatchToProps)(PluginComponent)
