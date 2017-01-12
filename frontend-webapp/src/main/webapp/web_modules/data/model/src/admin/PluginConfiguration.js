const PluginConfiguration = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    pluginId: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired,
    priorityOrder: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired,
    pluginClassName: React.PropTypes.string.isRequired,
  }),
})

export default PluginConfiguration
export const PluginConfigurationList = React.PropTypes.objectOf(PluginConfiguration)
