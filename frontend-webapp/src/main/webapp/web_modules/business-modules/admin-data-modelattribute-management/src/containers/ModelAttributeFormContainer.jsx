/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import forEach from 'lodash/forEach'
import partition from 'lodash/partition'
import some from 'lodash/some'
import find from 'lodash/find'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DataManagementShapes } from '@regardsoss/shape'
import { attributeModelActions, attributeModelSelectors } from '../clients/AttributeModelClient'
import ModelAttributeFormComponent from '../components/ModelAttributeFormComponent'
import { modelAttributesSelectors, modelAttributesActions } from '../clients/ModelAttributesClient'
import { modelSelectors, modelActions } from '../clients/ModelClient'
import { modelAttributesFragmentActions } from '../clients/ModelAttributesFragmentClient'
import { fragmentSelectors } from '../clients/FragmentClient'
import { modelAttributeComputationTypesActions } from '../clients/ModelAttributeComputationTypesClient'

export class ModelAttributeFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      model_id: PropTypes.string,
    }),
    // from mapStateToProps
    model: DataManagementShapes.Model,
    attributeModelList: DataManagementShapes.AttributeModelList,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    // from mapDispatchToProps
    createModelAttribute: PropTypes.func,
    fetchAttributeModelList: PropTypes.func,
    fetchModelAttributeList: PropTypes.func,
    deleteModelAttribute: PropTypes.func,
    fetchModel: PropTypes.func,
    bindFragment: PropTypes.func,
    unbindFragment: PropTypes.func,
    fetchModelAttributeComputationTypesList: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchAttributeModelList(),
      this.props.fetchModelAttributeList(this.props.params.model_id),
      this.props.fetchModel(this.props.params.model_id),
      this.props.fetchModelAttributeComputationTypesList(),
    ]).then(() => {
      this.setState({
        isLoading: false,
      })
    })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/model/list`
  }

  getFormComponent = () => {
    const { attributeModelList, model, modelAttributeList } = this.props
    return (<ModelAttributeFormComponent
      onCreateFragment={this.handleCreateFragment}
      onDeleteFragment={this.handleDeleteFragment}
      onCreateAttributeModel={this.handleCreateAttributeModel}
      onDeleteAttributeModel={this.handleDeleteAttributeModel}
      backUrl={this.getBackUrl()}
      currentModel={model}
      distributedAttrModels={this.distributeAttrModel(attributeModelList, model, modelAttributeList)}
    />)
  }

  handleCreateFragment = (fragment) => {
    Promise.resolve(this.props.bindFragment(fragment, [this.props.model.content.id]))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        this.props.fetchModelAttributeList(this.props.params.model_id)
      }
    })
  }

  handleDeleteFragment = (fragment) => {
    Promise.resolve(this.props.unbindFragment(fragment.id, [this.props.model.content.id]))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        this.props.fetchModelAttributeList(this.props.params.model_id)
      }
    })
  }

  handleCreateAttributeModel = (attributeModel) => {
    this.props.createModelAttribute({
      attribute: attributeModel.content,
      model: this.props.model.content,
    }, this.props.model.content.id)
  }

  handleDeleteAttributeModel = (attributeModel) => {
    const modelAttributeToDelete = find(this.props.modelAttributeList, modelAttribute => (modelAttribute.content.attribute.id === attributeModel.content.id))
    this.props.deleteModelAttribute(modelAttributeToDelete.content.id, this.props.model.content.id)
  }

  isNotInFragment = attribute => (
    attribute.content.fragment.name !== fragmentSelectors.noneFragmentName
  )

  /**
   * Regroup together attributes that are on the same fragment, and store in another key remaining attributes
   * @param attributeList
   * @returns {{fragments: {}, attrs: Array}}
   */
  extractFragmentFromAttributeList = (attributeList) => {
    const result = {
      fragments: {},
      attrs: [],
    }
    const partitionAttributeHavingFragment = partition(attributeList, attribute => this.isNotInFragment(attribute))
    // Store attributeModel that are on the default fragment
    result.attrs = partitionAttributeHavingFragment[1]

    // Store fragment and corresponding attributeModel
    forEach(partitionAttributeHavingFragment[0], (attribute) => {
      // Add the fragment if not existing
      if (!result.fragments[attribute.content.fragment.id]) {
        result.fragments[attribute.content.fragment.id] = []
      }
      result.fragments[attribute.content.fragment.id].push(attribute)
    })
    return result
  }

  /**
   * Distribute attribute model list into 4 categories: remaining attribute inside fragment, remaining attribute not in a fragment
   * and the same thing for associated attributes to the current model
   * @param attributeModelList
   * @param fragmentList
   * @param model
   * @param modelAttributeList
   */
  distributeAttrModel = (attributeModelList, model, modelAttributeList) => {
    const result = {
      ATTR_REMAINING: {
        fragments: {},
        attrs: [],
      },
      ATTR_ASSOCIATED: {
        fragments: {},
        attrs: [],
      },
    }
    // Extract all attributes that are associated to the current model
    const partitionAttributeModel = partition(attributeModelList, attributeModel => some(modelAttributeList, modelAttribute => modelAttribute.content.attribute.id === attributeModel.content.id))
    result.ATTR_ASSOCIATED = this.extractFragmentFromAttributeList(partitionAttributeModel[0])
    result.ATTR_REMAINING = this.extractFragmentFromAttributeList(partitionAttributeModel[1])
    return result
  }


  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-modelattribute-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getFormComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  attributeModelList: attributeModelSelectors.getList(state),
  modelAttributeList: modelAttributesSelectors.getList(state),
  model: modelSelectors.getById(state, ownProps.params.model_id),
})

const mapDispatchToProps = dispatch => ({
  fetchAttributeModelList: () => dispatch(attributeModelActions.fetchEntityList()),
  fetchModelAttributeList: modelId => dispatch(modelAttributesActions.fetchEntityList({ pModelId: modelId })),
  createModelAttribute: (modelAttribute, modelId) => dispatch(modelAttributesActions.createEntity(modelAttribute, { pModelId: modelId })),
  deleteModelAttribute: (id, modelId) => dispatch(modelAttributesActions.deleteEntity(id, { pModelId: modelId })),
  fetchModel: id => dispatch(modelActions.fetchEntity(id)),

  bindFragment: (fragment, modelId) => dispatch(modelAttributesFragmentActions.createEntities(fragment, { pModelId: modelId })),
  unbindFragment: (fragmentId, modelId) => dispatch(modelAttributesFragmentActions.deleteEntity(fragmentId, { pModelId: modelId })),
  fetchModelAttributeComputationTypesList: () => dispatch(modelAttributeComputationTypesActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeFormContainer)
