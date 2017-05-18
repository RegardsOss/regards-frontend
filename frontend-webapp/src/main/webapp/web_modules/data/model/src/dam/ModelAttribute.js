import Model from './Model'
import AttributeModel from './AttributeModel'
import PluginConfiguration from './../admin/plugin/PluginConfiguration'

const ModelAttribute = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    mode: PropTypes.string,
    model: Model,
    attribute: AttributeModel,
    computationConf: PluginConfiguration,
  }),
})

export default ModelAttribute
