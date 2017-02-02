/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Collection } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { partition, some, pull, filter } from 'lodash'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import CollectionSelectors from './../model/CollectionSelectors'
import CollectionActions from './../model/CollectionActions'
import CollectionEditLinksComponent from '../components/CollectionEditLinksComponent'
import CollectionLinkActions from '../model/CollectionLinkActions'
/**
 * Show the collection form
 */
export class CollectionEditLinksContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      collectionId: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentCollection: Collection,
    collectionList: React.PropTypes.objectOf(Collection),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    removeTagFromCollection: React.PropTypes.func,
    addTagToCollection: React.PropTypes.func,
    fetchCollection: React.PropTypes.func,
    fetchCollectionList: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchCollectionList()
  }

  getBackUrl = () => {
    const { params: { project, collectionId } } = this.props
    return `/admin/${project}/data/collection/${collectionId}/edit`
  }

  getDoneUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collection/list`
  }
  /**
   * When the user add a new tag
   * @param tag
   */
  handleAdd = (tag) => {
    Promise.resolve(this.props.addTagToCollection(this.props.currentCollection.content.id, [tag]))
      .then((actionResult) => {
        this.props.fetchCollection(this.props.params.collectionId)
      })
  }
  /**
   * When the user remove a tag
   * @param tag
   */
  handleDelete = (tag) => {
    Promise.resolve(this.props.removeTagFromCollection(this.props.currentCollection.content.id, [tag]))
      .then((actionResult) => {
        this.props.fetchCollection(this.props.params.collectionId)
      })
  }

  /**
   * Devide the collectionList into 2 sets, one linked to the current collection
   * and remaining collection can be associated with current collection
   * @param currentCollection
   * @param collectionList
   * @returns {[*,*]}
   */
  getRemainingCollection = (currentCollection, collectionList) => {
    const collectionLinkedToCurrentCollection = partition(collectionList, collection => some(currentCollection.content.tags, tag => tag === collection.content.ipId,
      ))
    return [
      collectionLinkedToCurrentCollection[0],
      // Remove the currentCollection from collectionList
      filter(collectionLinkedToCurrentCollection[1], collection => collection.content.id !== currentCollection.content.id),
    ]
  }

  render() {
    const { isFetching, currentCollection, collectionList } = this.props
    const collectionLinkedToCurrentCollection = this.getRemainingCollection(currentCollection, collectionList)
    const isLoading = isFetching && typeof currentCollection === 'undefined'
    return (
      <I18nProvider messageDir="modules/admin-data-collection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (
            <CollectionEditLinksComponent
              currentCollection={currentCollection}
              linkedCollections={collectionLinkedToCurrentCollection[0]}
              remainingCollections={collectionLinkedToCurrentCollection[1]}
              handleAdd={this.handleAdd}
              handleDelete={this.handleDelete}
              backUrl={this.getBackUrl()}
              doneUrl={this.getDoneUrl()}
            />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentCollection: CollectionSelectors.getById(state, ownProps.params.collectionId),
  collectionList: CollectionSelectors.getList(state),
  isFetching: CollectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(CollectionActions.fetchPagedEntityList(0, 100)),
  fetchCollection: id => dispatch(CollectionActions.fetchEntity(id)),
  addTagToCollection: (collectionId, tags) => dispatch(CollectionLinkActions.sendSignal('PUT', tags, { collection_id: collectionId, operation: 'associate' })),
  removeTagFromCollection: (collectionId, tags) => dispatch(CollectionLinkActions.sendSignal('PUT', tags, { collection_id: collectionId, operation: 'dissociate' })),
})
export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditLinksContainer)
