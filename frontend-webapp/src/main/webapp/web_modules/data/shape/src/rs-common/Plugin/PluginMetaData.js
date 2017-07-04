/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterType from './PluginParameterType'

const PluginMetaDataContent = PropTypes.shape({
  pluginId: PropTypes.string.isRequired,
  pluginClassName: PropTypes.string.isRequired,
  interfaceNames: PropTypes.arrayOf(PropTypes.string.isRequired),
  author: PropTypes.string.isRequired,
  description: PropTypes.string,
  version: PropTypes.string.isRequired,
  parameters: PropTypes.arrayOf(PluginParameterType),
})

const PluginMetaData = PropTypes.shape({
  content: PluginMetaDataContent,
})
const PluginMetaDataList = PropTypes.objectOf(PluginMetaData)
const PluginMetaDataArray = PropTypes.arrayOf(PluginMetaData)
export default {
  PluginMetaDataContent,
  PluginMetaData,
  PluginMetaDataList,
  PluginMetaDataArray,
}
