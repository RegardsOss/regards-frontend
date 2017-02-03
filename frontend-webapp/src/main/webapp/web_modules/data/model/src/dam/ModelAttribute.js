import Model from './Model'
import AttributeModel from './AttributeModel'

const ModelAttribute = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    mode: React.PropTypes.string,
    model: Model,
    attribute: AttributeModel,
  }),
})

export default ModelAttribute
