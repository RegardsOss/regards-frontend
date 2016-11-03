/** @module common */

import { connect } from 'react-redux'
import { PluginType, PluginsStore } from '@regardsoss/plugins'
import { intializePlugin } from './PluginsActions'
/*
interface PluginProps {
  plugin: PluginType
  // Properties set bu react redux connection
  plugins?: PluginsStore,
  pluginInitialized?: (action: any) => void
}*/

/**
 * React component to display a given plugin
 *
 * @prop {PluginType} plugin Plugin to display
 */
export class PluginComponent extends React.Component {

  render() {
    const { plugin } = this.props
    // Check if plugin is loaded.
    // If the plugin is loaded the react component
    // associated is in the "loadedComponent" attribute of the plugin
    if (plugin && plugin.loadedComponent) {
      return React.createElement(plugin.loadedComponent, null)
    } else {
      intializePlugin(plugin.paths, plugin.name, this.props.pluginInitialized)
      return <div className="error"> Undefined plugin </div>
    }
  }
}

const mapStateToProps = state => ({
  plugins: state.common.plugins,
})

const mapDispatchToProps = dispatch => ({
  pluginInitialized: action => dispatch(action),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginComponent)
