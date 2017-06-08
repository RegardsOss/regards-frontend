import PluginParameterDynamicValue from './PluginParameterDynamicValue'

/**
 * LICENSE_PLACEHOLDER
 **/
const PluginParameter = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  dynamic: PropTypes.bool,
  dynamicsValues: PropTypes.arrayOf(PluginParameterDynamicValue),
})

export default PluginParameter
