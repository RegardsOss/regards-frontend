/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { modelAttributesSelectors, modelAttributesActions } from '../clients/ModelAttributesClient'
import ModelAttributeComponent from '../components/ModelAttributeComponent'
import { modelAttributeComputationTypesSelectors } from '../clients/ModelAttributeComputationTypesClient'

export class ModelAttributeContainer extends React.Component {
  static propTypes = {
    shouldDisplayHeader: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    attribute: DataManagementShapes.AttributeModel,
    // from mapStateToProps
    modelAttribute: DataManagementShapes.ModelAttribute,
    modelAttributeComputationType: DataManagementShapes.ModelAttributeComputationTypes,
    // from mapDispatchToProps
    updateModelAttribute: PropTypes.func,
  }

  handleComputationUpdate = (computationConfId) => {
    let updatedModelAttribute
    if (computationConfId) {
      const computationPluginConf = find(this.props.modelAttributeComputationType.content.pluginConfigurations, pluginConfiguration => (
        pluginConfiguration.content.id === computationConfId
      ))
      updatedModelAttribute = Object.assign({}, this.props.modelAttribute.content, {
        computationConf: computationPluginConf.content,
      })
    } else {
      updatedModelAttribute = Object.assign({}, this.props.modelAttribute.content, {
        computationConf: null,
      })
    }
    return this.props.updateModelAttribute(this.props.modelAttribute.content.id, updatedModelAttribute, updatedModelAttribute.model.id)
  }

  render() {
    const { modelAttribute, modelAttributeComputationType, shouldDisplayHeader } = this.props
    if (modelAttribute) {
      return (
        <ModelAttributeComponent
          pluginConfigurationList={modelAttributeComputationType.content.pluginConfigurations}
          pluginMetaDataList={modelAttributeComputationType.content.pluginMetaDatas}
          modelAttribute={modelAttribute}
          handleComputationUpdate={this.handleComputationUpdate}
          shouldDisplayHeader={shouldDisplayHeader}
        />
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  modelAttribute: modelAttributesSelectors.getByAttributeModelId(state, ownProps.attribute.content.id),
  modelAttributeComputationType: modelAttributeComputationTypesSelectors.getById(state, ownProps.attribute.content.type),
})

const mapDispatchToProps = dispatch => ({
  updateModelAttribute: (id, values, modelId) => dispatch(modelAttributesActions.updateEntity(id, values, { pModelId: modelId })),
})


export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeContainer)
