/**
 * LICENSE_PLACEHOLDER
 **/
import EnumParamType from './EnumParamType'

const PluginParameterType = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  paramType: PropTypes.oneOf(EnumParamType),
  optional: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
})

export default PluginParameterType
