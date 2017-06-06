/**
 * LICENSE_PLACEHOLDER
 **/
const PluginParameter = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  dynamic: PropTypes.bool,
})

export default PluginParameter
