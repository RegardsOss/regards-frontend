/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { map, find, forEach, keys } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Collection, Model, ModelAttribute } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import CollectionSelectors from './../model/CollectionSelectors'
import CollectionActions from './../model/CollectionActions'
import CollectionFormComponent from '../components/CollectionFormComponent'
import ModelSelectors from '../model/ModelSelectors'
import ModelActions from '../model/ModelActions'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'


/**
 * Show the collection form
 */
export class CollectionFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      collectionId: React.PropTypes.string,
      mode: React.PropTypes.string,
    }),
    // from redux-form
    unregisterField: React.PropTypes.func,
    // from mapStateToProps
    currentCollection: Collection,
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    isFetchingCollection: React.PropTypes.bool,
    modelList: React.PropTypes.objectOf(Model),
    isFetchingModelAttribute: React.PropTypes.bool,
    isFetchingModel: React.PropTypes.bool,
    // from mapDispatchToProps
    createCollection: React.PropTypes.func,
    updateCollection: React.PropTypes.func,
    fetchCollection: React.PropTypes.func,
    fetchModelList: React.PropTypes.func,
    fetchModelAttributeList: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.params.collectionId === undefined,
      isEditing: props.params.collectionId !== undefined && props.params.mode === 'edit',
      isDuplicating: props.params.collectionId !== undefined && props.params.mode === 'duplicate',
    }
  }

  componentDidMount() {
    this.props.fetchModelList()
    if (this.state.isCreating === false) {
      Promise.resolve(this.props.fetchCollection(this.props.params.collectionId))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            // We extract the collection id from the action
            const collection = this.extractCollectionFromActionResult(actionResult)
            this.props.fetchModelAttributeList(collection.model.id)
          }
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collection/list`
  }

  redirectToLinksPage = (collectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collection/${collectionId}/links`
    browserHistory.push(url)
  }

  handleUpdate = (values) => {
    const model = this.props.modelList[values.model].content
    const attributes = this.extractAttributesFromValues(values)
    const updatedCollection = Object.assign({}, {
      id: this.props.currentCollection.content.id,
      tags: this.props.currentCollection.content.tags,
      type: this.props.currentCollection.content.type,
    }, {
      label: values.label,
      model,
      attributes,
    })
    Promise.resolve(this.props.updateCollection(this.props.currentCollection.content.id, updatedCollection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToLinksPage(this.props.params.collectionId)
        }
      })
  }

  /**
   * Retrieve model attributes values from form values
   * and returns the value of collection "attributes" sendeable to the API
   * @param values
   * @returns {{}}
   */
  extractAttributesFromValues = (values) => {
    const result = {}
    map(values.attributes, (attrValue, attrName) => {
      const modelAttr = find(this.props.modelAttributeList, modelAttribute => modelAttribute.content.attribute.name === attrName)
      const fragment = modelAttr.content.attribute.fragment
      if (fragment.id !== 1) {
        if (!result[fragment.name]) {
          result[fragment.name] = {}
        }
        result[fragment.name][attrName] = attrValue
      } else {
        result[attrName] = attrValue
      }
    })
    return result
  }

  extractCollectionFromActionResult = actionResult => actionResult.payload.entities.collection[keys(actionResult.payload.entities.collection)[0]].content

  /**
   * Handle form submission on duplication / creation
   * Create a new collection
   * @param values
   */
  handleCreate = (values) => {
    const model = this.props.modelList[values.model].content
    const attributes = this.extractAttributesFromValues(values)
    const defaultValues = {}
    if (this.state.isDuplicating) {
      defaultValues.tags = this.props.currentCollection.content.tags
    }
    const newCollection = Object.assign({}, defaultValues, {
      label: values.label,
      model,
      attributes,
      type: 'COLLECTION',
    })
    Promise.resolve(this.props.createCollection(newCollection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // We extract the collection id from the action
          const collectionId = actionResult.payload.result
          this.redirectToLinksPage(collectionId)
        }
      })
  }

  /**
   * Used when the user change the value of the model selected
   * In charge to fetch new list of model attributes
   * @param modelId
   */
  handleUpdateModel = (modelId) => {
    // Remove any value defined in the current form if modelAttributeList existed
    forEach(this.props.modelAttributeList, (modelAttribute) => {
      this.props.unregisterField('collection-form', `attributes.${modelAttribute.content.attribute.name}`)
    })
    this.props.fetchModelAttributeList(modelId)
  }

  render() {
    const { isFetchingCollection, currentCollection, modelList, modelAttributeList, isFetchingModel, isFetchingModelAttribute } = this.props
    const { isEditing, isDuplicating } = this.state
    const isLoading = ((isEditing || isDuplicating) && (isFetchingCollection || (isFetchingModelAttribute && Object.keys(modelAttributeList).length === 0) || isFetchingModel)) || isFetchingModel
    return (
      <I18nProvider messageDir="modules/admin-data-collection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<CollectionFormComponent
            modelList={modelList}
            modelAttributeList={modelAttributeList}
            currentCollection={currentCollection}
            isDuplicating={isDuplicating}
            onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
            handleUpdateModel={this.handleUpdateModel}
            backUrl={this.getBackUrl()}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentCollection: ownProps.params.collectionId ? CollectionSelectors.getById(state, ownProps.params.collectionId) : null,
  isFetchingCollection: CollectionSelectors.isFetching(state),
  modelAttributeList: ModelAttributeSelectors.getList(state),
  modelList: ModelSelectors.getList(state),
  isFetchingModel: ModelSelectors.isFetching(state),
  isFetchingModelAttribute: ModelAttributeSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => dispatch(CollectionActions.fetchEntity(id)),
  createCollection: values => dispatch(CollectionActions.createEntity(values)),
  updateCollection: (id, values) => dispatch(CollectionActions.updateEntity(id, values)),
  fetchModelList: () => dispatch(ModelActions.fetchEntityList({}, { type: 'COLLECTION' })),
  fetchModelAttributeList: id => dispatch(ModelAttributeActions.fetchEntityList({ id })),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionFormContainer)
