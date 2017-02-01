/**
 * LICENSE_PLACEHOLDER
 **/
import EnumParamType from './EnumParamType'

const PluginParameter = React.PropTypes.shape({
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  paramType: React.PropTypes.oneOf(EnumParamType),
})

export default PluginParameter
