/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterContent from './PluginParameter'

const PluginConfigurationContent = PropTypes.shape({
  id: PropTypes.number,
  pluginId: PropTypes.string,
  label: PropTypes.string,
  version: PropTypes.string,
  priorityOrder: PropTypes.number,
  active: PropTypes.bool,
  pluginClassName: PropTypes.string,
  parameters: PropTypes.arrayOf(PluginParameterContent),
})
const PluginConfiguration = PropTypes.shape({
  content: PluginConfigurationContent,
})
const PluginConfigurationList = PropTypes.objectOf(PluginConfiguration)

const PluginConfigurationArray = PropTypes.arrayOf(PluginConfiguration)


export default {
  PluginConfigurationContent,
  PluginConfiguration,
  PluginConfigurationList,
  PluginConfigurationArray,
}
