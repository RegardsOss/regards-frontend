import Model from './Model'
import AttributeModel from './AttributeModel'

export default React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    mode: React.PropTypes.string,
    model: Model,
    attribute: AttributeModel,
  }),
})
