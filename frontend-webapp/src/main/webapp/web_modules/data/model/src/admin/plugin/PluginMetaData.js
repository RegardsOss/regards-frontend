/**
 * LICENSE_PLACEHOLDER
 **/
import PluginParameterType from './PluginParameterType'

const PluginMetaData = PropTypes.shape({
  content: PropTypes.shape({
    pluginId: PropTypes.string.isRequired,
    pluginClassName: PropTypes.string.isRequired,
    interfaceNames: PropTypes.arrayOf(PropTypes.string.isRequired),
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    version: PropTypes.string.isRequired,
    parameters: PropTypes.arrayOf(PluginParameterType),
  }),
})

export default PluginMetaData
export const PluginMetaDataList = PropTypes.objectOf(PluginMetaData)
