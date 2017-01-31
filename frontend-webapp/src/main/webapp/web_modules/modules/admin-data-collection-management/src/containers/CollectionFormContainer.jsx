/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Collection, Model, ModelAttribute } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
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
    // from mapStateToProps
    currentCollection: Collection,
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    isFetchingCollection: React.PropTypes.bool,
    modelList: React.PropTypes.objectOf(Model),
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
      this.props.fetchCollection(this.props.params.collectionId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isCreating && nextProps.currentCollection && typeof nextProps.modelAttributeList === 'undefined') {
      this.props.fetchModelAttributeList(nextProps.currentCollection.model.id)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collection/list`
  }

  handleUpdate = (values) => {
    const updatedCollection = {}
    Promise.resolve(this.props.updateCollection(this.props.attrModel.content.id, updatedCollection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createCollection({
      toto: 'titi',
    }))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }
  handleUpdateModel = (modelId) => {
    this.props.fetchModelAttributeList(modelId)
  }
  render() {
    const { isFetchingCollection, currentCollection, modelList, modelAttributeList, isFetchingModel, isFetchingModelAttribute } = this.props
    const { isCreating, isEditing, isDuplicating } = this.state
    const isLoading = (isEditing || isDuplicating) && (isFetchingCollection || isFetchingModelAttribute || isFetchingModel) || isFetchingModel
    console.log(isLoading)
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
  fetchModelList: () => dispatch(ModelActions.fetchEntityList({ type: 'COLLECTION' })),
  fetchModelAttributeList: id => dispatch(ModelAttributeActions.fetchEntityList({ id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionFormContainer)
