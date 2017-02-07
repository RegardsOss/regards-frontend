const PluginDynamicValue = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    value: React.PropTypes.string.isRequired,
  }),
})

export default PluginDynamicValue
export const PluginDynamicValueList = React.PropTypes.objectOf(PluginDynamicValue)
