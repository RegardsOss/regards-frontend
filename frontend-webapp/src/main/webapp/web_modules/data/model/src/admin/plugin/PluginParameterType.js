/**
 * LICENSE_PLACEHOLDER
 **/
import EnumParamType from './EnumParamType'

const PluginParameterType = React.PropTypes.shape({
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  paramType: React.PropTypes.oneOf(EnumParamType),
})

export default PluginParameterType
