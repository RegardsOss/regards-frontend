/**
 * LICENSE_PLACEHOLDER
 **/
import { PluginConfiguration } from './../rs-common/Plugin/PluginConfiguration'
import { PluginMetaData } from './../rs-common/Plugin/PluginMetaData'

const ModelAttributeComputationTypes = PropTypes.shape({
  content: PropTypes.shape({
    attrType: PropTypes.string,
    pluginMetaDatas: PropTypes.arrayOf(PluginMetaData),
    pluginConfigurations: PropTypes.arrayOf(PluginConfiguration),
  }),
})
const ModelAttributeComputationTypesList = PropTypes.objectOf(ModelAttributeComputationTypes)

export default {
  ModelAttributeComputationTypes,
  ModelAttributeComputationTypesList,
}
