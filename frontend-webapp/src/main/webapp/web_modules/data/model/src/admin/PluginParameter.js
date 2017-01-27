import { PluginDynamicValueList } from './PluginDynamicValue'

const PluginParameter = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  dynamic: React.PropTypes.bool.isRequired,
  dynamicsValues: PluginDynamicValueList,
})

export default PluginParameter
