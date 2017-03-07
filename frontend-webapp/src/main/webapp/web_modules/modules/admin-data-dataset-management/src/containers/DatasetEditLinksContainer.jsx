/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Dataset } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { partition, some } from 'lodash'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasetSelectors from './../model/DatasetSelectors'
import DatasetActions from './../model/DatasetActions'
import DatasetEditLinksComponent from '../components/DatasetEditLinksComponent'
import DatasetLinkActions from '../model/DatasetLinkActions'
import CollectionSelectors from '../model/CollectionSelectors'
import CollectionActions from '../model/CollectionActions'

/**
 * Show the dataset form
 */
export class DatasetEditLinksContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      datasetId: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentDataset: Dataset,
    collectionList: React.PropTypes.objectOf(Dataset),
    isFetchingDataset: React.PropTypes.bool,
    isFetchingCollection: React.PropTypes.bool,
    // from mapDispatchToProps
    removeTagFromDataset: React.PropTypes.func,
    addTagToDataset: React.PropTypes.func,
    fetchDataset: React.PropTypes.func,
    fetchCollectionList: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchCollectionList()
    this.props.fetchDataset(this.props.params.datasetId)
  }

  getBackUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/dataset/${datasetId}/edit`
  }

  getDoneUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/dataset/list`
  }

  /**
   * Devide the collectionList into 2 sets, one linked to the current dataset
   * and remaining collection can be associated with current dataset
   * @param currentDataset
   * @param collectionList
   * @returns {[*,*]}
   */
  getRemainingCollection = (currentDataset, collectionList) => {
    const collectionLinkedToCurrentCollection = partition(collectionList, collection =>
      some(currentDataset.content.tags, tag =>
        tag === collection.content.ipId,
      ),
    )
    return [
      collectionLinkedToCurrentCollection[0],
      collectionLinkedToCurrentCollection[1],
    ]
  }

  /**
   * When the user add a new tag
   * @param tag
   */
  handleAdd = (tag) => {
    Promise.resolve(this.props.addTagToDataset(this.props.currentDataset.content.id, [tag]))
      .then((actionResult) => {
        this.props.fetchDataset(this.props.params.datasetId)
      })
  }

  /**
   * When the user remove a tag
   * @param tag
   */
  handleDelete = (tag) => {
    Promise.resolve(this.props.removeTagFromDataset(this.props.currentDataset.content.id, [tag]))
      .then((actionResult) => {
        this.props.fetchDataset(this.props.params.datasetId)
      })
  }

  render() {
    const { isFetchingDataset, isFetchingCollection, currentDataset, collectionList } = this.props
    const collectionLinkedToCurrentDataset = this.getRemainingCollection(currentDataset, collectionList)
    const isLoading = (isFetchingDataset && typeof currentDataset === 'undefined') || isFetchingCollection
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (
            <DatasetEditLinksComponent
              linkedCollections={collectionLinkedToCurrentDataset[0]}
              remainingCollections={collectionLinkedToCurrentDataset[1]}
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
  currentDataset: DatasetSelectors.getById(state, ownProps.params.datasetId),
  isFetchingDataset: DatasetSelectors.isFetching(state),
  collectionList: CollectionSelectors.getList(state),
  isFetchingCollection: CollectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(CollectionActions.fetchPagedEntityList(0, 100)),
  fetchDataset: id => dispatch(DatasetActions.fetchEntity(id)),
  addTagToDataset: (datasetId, tags) => dispatch(DatasetLinkActions.sendSignal('PUT', tags, { dataset_id: datasetId, operation: 'associate' })),
  removeTagFromDataset: (datasetId, tags) => dispatch(DatasetLinkActions.sendSignal('PUT', tags, { dataset_id: datasetId, operation: 'dissociate' })),
})
export default connect(mapStateToProps, mapDispatchToProps)(DatasetEditLinksContainer)
