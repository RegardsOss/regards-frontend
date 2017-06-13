import { ModelContent } from './Model'
import { AttributeModelContent } from './AttributeModel'
import { PluginConfigurationContent } from './../rs-common/Plugin/PluginConfiguration'

const ModelAttribute = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    mode: PropTypes.string,
    model: ModelContent.isRequired,
    attribute: AttributeModelContent.isRequired,
    computationConf: PluginConfigurationContent,
  }),
})

const ModelAttributeList = PropTypes.objectOf(ModelAttribute)

export default {
  ModelAttribute,
  ModelAttributeList,
}
