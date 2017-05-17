const PluginDynamicValue = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
  }),
})

export default PluginDynamicValue
export const PluginDynamicValueList = PropTypes.objectOf(PluginDynamicValue)
