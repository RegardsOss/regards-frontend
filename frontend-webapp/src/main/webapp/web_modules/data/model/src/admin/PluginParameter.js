import { PluginDynamicValueList } from './PluginDynamicValue'

const PluginParameter = React.PropTypes.shape({
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  value: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.bool]),
  dynamic: React.PropTypes.bool,
  dynamicsValues: PluginDynamicValueList,
})

export default PluginParameter
