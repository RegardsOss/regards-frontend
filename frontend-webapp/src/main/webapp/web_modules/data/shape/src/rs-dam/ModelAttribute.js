import Model from './Model'
import AttributeModel from './AttributeModel'
import PluginConfiguration from './../rs-common/Plugin/PluginConfiguration'

const ModelAttribute = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    mode: PropTypes.string,
    model: Model.isRequired,
    attribute: AttributeModel.isRequired,
    computationConf: PluginConfiguration,
  }),
})

const ModelAttributeList = PropTypes.objectOf(ModelAttribute)

export default {
  ModelAttribute,
  ModelAttributeList,
}
