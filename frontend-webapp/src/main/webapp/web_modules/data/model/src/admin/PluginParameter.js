import PluginConfiguration from './PluginConfiguration'
import { PluginDynamicValueList } from './PluginDynamicValue'

const PluginParameter = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    pluginConfiguration: PluginConfiguration.isRequired,
    dynamic: React.PropTypes.bool.isRequired,
    dynamicsValues: PluginDynamicValueList.isRequired,
  }),
})

export default PluginParameter
export const PluginParameterist = React.PropTypes.objectOf(PluginParameter)
