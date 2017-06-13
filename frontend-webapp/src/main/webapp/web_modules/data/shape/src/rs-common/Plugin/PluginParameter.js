/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterDynamicValue from './PluginParameterDynamicValue'


const PluginParameterContent = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  dynamic: PropTypes.bool,
  dynamicsValues: PropTypes.arrayOf(PluginParameterDynamicValue),
})

export default PluginParameterContent
