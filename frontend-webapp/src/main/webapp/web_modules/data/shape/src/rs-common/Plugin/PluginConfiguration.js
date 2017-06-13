/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterContent from './PluginParameter'

const PluginConfiguration = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    pluginId: PropTypes.string,
    label: PropTypes.string,
    version: PropTypes.string,
    priorityOrder: PropTypes.number,
    active: PropTypes.bool,
    pluginClassName: PropTypes.string,
    parameters: PropTypes.arrayOf(PluginParameterContent),
  }),
})
const PluginConfigurationList = PropTypes.objectOf(PluginConfiguration)

export default { PluginConfiguration, PluginConfigurationList }
