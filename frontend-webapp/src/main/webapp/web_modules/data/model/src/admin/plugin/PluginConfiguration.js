import PluginParameter from './PluginParameter'

const PluginConfiguration = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    pluginId: PropTypes.string,
    label: PropTypes.string,
    version: PropTypes.string,
    priorityOrder: PropTypes.number,
    active: PropTypes.bool,
    pluginClassName: PropTypes.string,
    parameters: PropTypes.arrayOf(PluginParameter),
  }),
})

export default PluginConfiguration
export const PluginConfigurationList = PropTypes.objectOf(PluginConfiguration)
