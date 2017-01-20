/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { map, find, partition, includes, indexOf, some } from 'lodash'
import { RequestErrorShape } from '@regardsoss/store-utils'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { AttributeModel, Fragment, Model, ModelAttribute } from '@regardsoss/model'
import AttributeModelActions from '../model/AttributeModelActions'
import ModelActions from '../model/ModelActions'
import ModelAttributeFormComponent from '../components/ModelAttributeFormComponent'
import AttributeModelSelectors from '../model/AttributeModelSelectors'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'
import ModelSelectors from '../model/ModelSelectors'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeFragmentActions from '../model/ModelAttributeFragmentActions'

export class ModelAttributeFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      model_id: React.PropTypes.string,
    }),
    // from mapDispatchToProps
    createModelAttribute: React.PropTypes.func,
    fetchAttributeModelList: React.PropTypes.func,
    fetchModelAttributeList: React.PropTypes.func,
    deleteModelAttribute: React.PropTypes.func,
    fetchModel: React.PropTypes.func,
    bindFragment: React.PropTypes.func,
    unbindFragment: React.PropTypes.func,
    // from mapStateToProps
    model: Model,
    attributeModelList: React.PropTypes.objectOf(AttributeModel),
    isAttributeModelFetching: React.PropTypes.bool,
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    isModelAttributeFetching: React.PropTypes.bool,
    isModelFetching: React.PropTypes.bool,
  }

  componentDidMount() {
    this.props.fetchAttributeModelList()
    this.props.fetchModelAttributeList(this.props.params.model_id)
    this.props.fetchModel(this.props.params.model_id)
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/model/list`
  }

  handleCreateFragment = (fragment) => {
    Promise.resolve(this.props.bindFragment(fragment, [this.props.model.content.id]))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        this.props.fetchModelAttributeList()
      }
    })
  }

  handleDeleteFragment = (fragment) => {
    Promise.resolve(this.props.unbindFragment(fragment.id, [this.props.model.content.id]))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.props.fetchModelAttributeList()
        }
      })
  }

  handleCreateAttributeModel = (attributeModel) => {
    this.props.createModelAttribute({
      attribute: attributeModel,
      model: this.props.model,
    }, this.props.model.content.id)
  }

  handleDeleteAttributeModel = (attributeModel) => {
    this.props.deleteModelAttribute(attributeModel.content.id, this.props.model.content.id)
  }

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
    const partitionAttributeHavingFragment = partition(attributeList, attribute => attribute.content.fragment.id !== 1)
    // Store attributeModel that are on the default fragment
    result.attrs = partitionAttributeHavingFragment[1]

    // Store fragment and corresponding attributeModel
    map(partitionAttributeHavingFragment[0], (attribute) => {
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


  getFormComponent = () => {
    const { attributeModelList, model, modelAttributeList } = this.props
    const { isAttributeModelFetching, isModelFetching, isModelAttributeFetching } = this.props
    if ((isAttributeModelFetching || isModelFetching || isModelAttributeFetching) && (!model && !attributeModelList)) {
      return (<FormLoadingComponent />)
    }

    if (model) {
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
    return (<FormEntityNotFoundComponent />)
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-data-modelattribute-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  attributeModelList: AttributeModelSelectors.getList(state),
  isAttributeModelFetching: AttributeModelSelectors.isFetching(state),

  modelAttributeList: ModelAttributeSelectors.getList(state),
  isModelAttributeFetching: ModelAttributeSelectors.isFetching(state),

  model: ModelSelectors.getById(state, ownProps.params.model_id),
  isModelFetching: ModelSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttributeModelList: () => dispatch(AttributeModelActions.fetchEntityList(dispatch)),
  fetchModelAttributeList: modelId => dispatch(ModelAttributeActions.fetchEntityList(dispatch, [modelId])),
  createModelAttribute: (modelAttribute, modelId) => dispatch(ModelAttributeActions.createEntity(modelAttribute, dispatch, [modelId])),
  deleteModelAttribute: (id, modelId) => dispatch(ModelAttributeActions.deleteEntity(id, dispatch, [modelId])),
  fetchModel: id => dispatch(ModelActions.fetchEntity(id, dispatch)),

  bindFragment: (fragment, modelId) => dispatch(ModelAttributeFragmentActions.createEntity(fragment, dispatch, [modelId])),
  unbindFragment: (fragmentId, modelId) => dispatch(ModelAttributeFragmentActions.deleteEntity(fragmentId, dispatch, [modelId])),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeFormContainer)
