/** @module common */
import * as React from "react"
import { connect } from "react-redux"
import { PluginType, PluginsStore } from "@regardsoss/plugins"
import { intializePlugin } from "./PluginsActions"

interface PluginProps {
  plugin: PluginType
  // Properties set bu react redux connection
  plugins?: PluginsStore,
  pluginInitialized?: (action: any) => void
}

/**
 * React component to display a given plugin
 *
 * @prop {PluginType} plugin Plugin to display
 */
export class PluginComponent extends React.Component<PluginProps, any> {

  render (): JSX.Element {
    const {plugin} = this.props
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

const mapStateToProps = (state: any) => ({
  plugins: state.common.plugins
})

const mapDispatchToProps = (dispatch: any) => ({
  pluginInitialized: (action: any) => dispatch(action)
})

export default connect<{}, {}, PluginProps>(mapStateToProps, mapDispatchToProps)(PluginComponent)
