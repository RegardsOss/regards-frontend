import Model from './Model'
import AttributeModel from './AttributeModel'

const ModelAttribute = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    mode: PropTypes.string,
    model: Model,
    attribute: AttributeModel,
  }),
})

export default ModelAttribute
