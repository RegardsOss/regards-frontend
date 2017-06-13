/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParamType from '@regardsoss/domain/common'

const PluginParameterType = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  paramType: PropTypes.oneOf(PluginParamType),
  optional: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
})

export default PluginParameterType
