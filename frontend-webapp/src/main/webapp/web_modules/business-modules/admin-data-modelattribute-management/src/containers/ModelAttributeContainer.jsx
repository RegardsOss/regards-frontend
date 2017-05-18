/**
 * LICENSE_PLACEHOLDER
 **/
import { find } from 'lodash'
import { connect } from '@regardsoss/redux'
import { AttributeModel, ModelAttribute, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { modelAttributesSelectors, modelAttributesActions } from '../client/ModelAttributesClient'
import ModelAttributeComponent from '../components/ModelAttributeComponent'

export class ModelAttributeContainer extends React.Component {
  static propTypes = {
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
    shouldDisplayHeader: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    attribute: AttributeModel,
    // from mapStateToProps
    modelAttribute: ModelAttribute,
    // from mapDispatchToProps
    updateModelAttribute: PropTypes.func,
  }

  handleComputationUpdate = (computationConfId) => {
    let updatedModelAttribute
    if (computationConfId) {
      const computationPluginConf = find(this.props.pluginConfigurationList, pluginConfiguration => (
        pluginConfiguration.content.id === computationConfId
      ))
      updatedModelAttribute = Object.assign({}, this.props.modelAttribute.content, {
        computationConf: computationPluginConf.content,
        mode: 'COMPUTED',
      })
    } else {
      updatedModelAttribute = Object.assign({}, this.props.modelAttribute.content, {
        mode: 'GIVEN',
        computationConf: null,
      })
    }
    this.props.updateModelAttribute(this.props.modelAttribute.content.id, updatedModelAttribute, updatedModelAttribute.model.id)
  }

  render() {
    const { modelAttribute, pluginConfigurationList, pluginMetaDataList, shouldDisplayHeader } = this.props
    if (modelAttribute) {
      return (
        <ModelAttributeComponent
          pluginConfigurationList={pluginConfigurationList}
          pluginMetaDataList={pluginMetaDataList}
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
})

const mapDispatchToProps = dispatch => ({
  updateModelAttribute: (id, values, modelId) => dispatch(modelAttributesActions.updateEntity(id, values, { pModelId: modelId })),
})


export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeContainer)
