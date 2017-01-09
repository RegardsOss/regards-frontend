/**
 * LICENSE_PLACEHOLDER
 **/
import { Plugin } from '@regardsoss/model'

class PluginComponent extends React.Component {

  static propTypes = {
    plugin: Plugin.isRequired,
  }

  render() {
    return (
      <div>Plugin : {this.props.plugin.type}</div>
    )
  }

}

export default PluginComponent
