/**
 * LICENSE_PLACEHOLDER
 **/
import EnumParamType from './EnumParamType'

const PluginParameter = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  paramType: React.PropTypes.oneOf(EnumParamType).isRequired,
})

export default PluginParameter
