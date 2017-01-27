import PluginParameter from './PluginParameter'

const PluginConfiguration = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    pluginId: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired,
    priorityOrder: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired,
    pluginClassName: React.PropTypes.string.isRequired,
    parameters: React.PropTypes.arrayOf(PluginParameter).isRequired,
  }),
})

export default PluginConfiguration
export const PluginConfigurationList = React.PropTypes.objectOf(PluginConfiguration)
