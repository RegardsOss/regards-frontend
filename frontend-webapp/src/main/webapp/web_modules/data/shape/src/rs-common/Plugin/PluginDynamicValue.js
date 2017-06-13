/**
 * LICENSE_PLACEHOLDER
 **/
const PluginDynamicValue = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }),
})
const PluginDynamicValueList = PropTypes.objectOf(PluginDynamicValue)

export default { PluginDynamicValue, PluginDynamicValueList }
