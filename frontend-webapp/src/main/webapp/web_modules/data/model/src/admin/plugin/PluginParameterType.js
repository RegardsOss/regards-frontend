/**
 * LICENSE_PLACEHOLDER
 **/
import EnumParamType from './EnumParamType'

const PluginParameterType = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  paramType: PropTypes.oneOf(EnumParamType),
})

export default PluginParameterType
