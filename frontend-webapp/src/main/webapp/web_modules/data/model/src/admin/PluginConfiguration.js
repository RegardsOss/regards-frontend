const PluginConfiguration = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    version: React.PropTypes.string,
    priorityOrder: React.PropTypes.number,
    active: React.PropTypes.bool,
    pluginClassName: React.PropTypes.string,
  }),
})

export default PluginConfiguration
export const PluginConfigurationList = React.PropTypes.objectOf(PluginConfiguration)
