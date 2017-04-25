/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AttributeModel, ModelAttribute } from '@regardsoss/model'
import ModelAttributesSelectors from '../model/ModelAttributesSelectors'
import ModelAttributeComponent from '../components/ModelAttributeComponent'
import ModelAttributesActions from '../model/ModelAttributesActions'

export class ModelAttributeContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attribute: AttributeModel,
    // from mapStateToProps
    modelAttribute: ModelAttribute,
    // from mapDispatchToProps
    updateModelAttribute: React.PropTypes.func,
  }

  handleComputationUpdate = (newComputation) => {
    const updatedModelAttribute = Object.assign({}, this.props.modelAttribute.content, {
      mode: newComputation,
    })
    this.props.updateModelAttribute(this.props.modelAttribute.content.id, updatedModelAttribute, updatedModelAttribute.model.id)
  }

  render() {
    const { modelAttribute } = this.props
    if (modelAttribute) {
      return (
        <ModelAttributeComponent
          modelAttribute={modelAttribute}
          handleComputationUpdate={this.handleComputationUpdate}
        />
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  modelAttribute: ModelAttributesSelectors.getByAttributeModelId(state, ownProps.attribute.content.id),
})

const mapDispatchToProps = dispatch => ({
  updateModelAttribute: (id, values, modelId) => dispatch(ModelAttributesActions.updateEntity(id, values, { pModelId: modelId })),
})


export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeContainer)
