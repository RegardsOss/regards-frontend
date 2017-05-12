/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Collection } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { partition, some, filter, startsWith } from 'lodash'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { collectionActions, collectionSelectors } from '../client/CollectionClient'
import CollectionEditLinksComponent from '../components/CollectionEditLinksComponent'
import { collectionLinkActions } from '../client/CollectionLinkClient'
/**
 * Show the collection form
 */
export class CollectionEditLinksContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      collectionId: PropTypes.string,
    }),
    // from mapStateToProps
    currentCollection: Collection,
    collectionList: PropTypes.objectOf(Collection),
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    removeTagFromCollection: PropTypes.func,
    addTagToCollection: PropTypes.func,
    fetchCollection: PropTypes.func,
    fetchCollectionList: PropTypes.func,
  }

  state = {
    collectionName: '',
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
   * Devide the collectionList into 2 sets, one linked to the current collection
   * and remaining collection can be associated with current collection
   * @param currentCollection
   * @param collectionList
   * @returns {[*,*]}
   */
  getRemainingCollection = (currentCollection, collectionList) => {
    const { collectionName } = this.state
    const collectionLinkedToCurrentCollection = partition(collectionList, collection => some(currentCollection.content.tags, tag => tag === collection.content.ipId,
      ))
    return [
      collectionLinkedToCurrentCollection[0],
      // Remove the currentCollection from collectionList
      filter(collectionLinkedToCurrentCollection[1], collection =>
        collection.content.id !== currentCollection.content.id && startsWith(collection.content.label.toLowerCase(), collectionName),
      ),
    ]
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

  handleSearch = (event, collectionName) => {
    this.setState({
      collectionName: collectionName.toLowerCase(),
    })
  }

  render() {
    const { isFetching, currentCollection, collectionList } = this.props
    const collectionLinkedToCurrentCollection = this.getRemainingCollection(currentCollection, collectionList)
    const isLoading = isFetching && typeof currentCollection === 'undefined'
    return (
      <I18nProvider messageDir="business-modules/admin-data-collection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (
            <CollectionEditLinksComponent
              linkedCollections={collectionLinkedToCurrentCollection[0]}
              remainingCollections={collectionLinkedToCurrentCollection[1]}
              handleAdd={this.handleAdd}
              handleDelete={this.handleDelete}
              handleSearch={this.handleSearch}
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
  currentCollection: collectionSelectors.getById(state, ownProps.params.collectionId),
  collectionList: collectionSelectors.getList(state),
  isFetching: collectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(collectionActions.fetchEntityList()),
  fetchCollection: id => dispatch(collectionActions.fetchEntity(id)),
  addTagToCollection: (collectionId, tags) => dispatch(collectionLinkActions.sendSignal('PUT', tags, { collection_id: collectionId, operation: 'associate' })),
  removeTagFromCollection: (collectionId, tags) => dispatch(collectionLinkActions.sendSignal('PUT', tags, { collection_id: collectionId, operation: 'dissociate' })),
})
export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditLinksContainer)
