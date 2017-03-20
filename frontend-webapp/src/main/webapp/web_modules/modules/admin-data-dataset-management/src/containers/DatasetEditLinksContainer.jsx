/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Collection, Dataset } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { partition, some, map, find, filter, startsWith, remove } from 'lodash'
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
    collectionList: React.PropTypes.objectOf(Collection),
    // from mapDispatchToProps
    removeTagFromDataset: React.PropTypes.func,
    addTagToDataset: React.PropTypes.func,
    fetchDataset: React.PropTypes.func,
    fetchCollectionList: React.PropTypes.func,
    updateDataset: React.PropTypes.func,
  }

  state = {
    isLoading: true,
    collectionName: '',
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchCollectionList(),
      this.props.fetchDataset(this.props.params.datasetId),
    ]).then((actionResult) => {
      this.setState({
        isLoading: false,
      })
    })
  }

  getBackUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/dataset/${datasetId}/edit`
  }

  getDoneUrl = () => {
    const { params: { project, datasetId } } = this.props
    return `/admin/${project}/data/dataset/${datasetId}/plugins`
  }

  /**
   * Devide the collectionList into 2 sets, one linked to the current dataset
   * and remaining collection can be associated with current dataset
   * @param currentDataset
   * @param collectionList
   * @returns {[*,*]}
   */
  getRemainingCollection = (currentDataset, collectionList) => {
    const { collectionName } = this.state
    const collectionLinkedToCurrentCollection = partition(collectionList, collection =>
      some(currentDataset.content.tags, tag =>
        tag === collection.content.ipId,
      ),
    )
    return filter(collectionLinkedToCurrentCollection[1], remainingCollection =>
      startsWith(remainingCollection.content.label.toLowerCase(), collectionName),
    )
  }


  getCollectionLinked = (collectionIpIdList, collectionList) =>
    map(collectionIpIdList, collectionIpId =>
      find(collectionList, collection =>
        collection.content.ipId === collectionIpId,
      ),
    )

  partitionDatasetLinkedTags = (currentDataset) => {
    const linkedTags = partition(currentDataset.content.tags, tag =>
      tag.match(/URN:.*:COLLECTION.*/),
    )
    return linkedTags
  }


  handleSearch = (event, collectionName) => {
    this.setState({
      collectionName: collectionName.toLowerCase(),
    })
  }

  /**
   * When the user add a new tag
   * @param tag
   */
  handleAdd = (tag, usingUpdate) => {
    if (usingUpdate) {
      this.props.currentDataset.content.tags.push(tag)
      this.props.updateDataset(this.props.currentDataset.content.id, this.props.currentDataset.content)
    } else {
      Promise.resolve(this.props.addTagToDataset(this.props.currentDataset.content.id, [tag]))
        .then((actionResult) => {
          this.props.fetchDataset(this.props.params.datasetId)
        })
    }
  }

  /**
   * When the user remove a tag
   * @param tag
   */
  handleDelete = (tag, usingUpdate) => {
    if (usingUpdate) {
      this.props.currentDataset.content.tags = remove(this.props.currentDataset.content.tags, existingTag =>
        existingTag !== tag,
      )
      this.props.updateDataset(this.props.currentDataset.content.id, this.props.currentDataset.content)
    } else {
      Promise.resolve(this.props.removeTagFromDataset(this.props.currentDataset.content.id, [tag]))
        .then((actionResult) => {
          this.props.fetchDataset(this.props.params.datasetId)
        })
    }
  }

  renderSubComponent = () => {
    const { currentDataset, collectionList } = this.props
    const remainingCollections = this.getRemainingCollection(currentDataset, collectionList)
    const datasetTags = this.partitionDatasetLinkedTags(currentDataset)
    const datasetStringTags = datasetTags[1]
    const linkedCollection = this.getCollectionLinked(datasetTags[0], collectionList)
    return (
      <DatasetEditLinksComponent
        remainingCollections={remainingCollections}
        linkedCollections={linkedCollection}
        datasetStringTags={datasetStringTags}
        handleAdd={this.handleAdd}
        handleDelete={this.handleDelete}
        handleSearch={this.handleSearch}
        backUrl={this.getBackUrl()}
        doneUrl={this.getDoneUrl()}
      />
    )
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.renderSubComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDataset: DatasetSelectors.getById(state, ownProps.params.datasetId),
  collectionList: CollectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(CollectionActions.fetchPagedEntityList(0, 100)),
  fetchDataset: id => dispatch(DatasetActions.fetchEntity(id)),
  updateDataset: (id, dataset) => dispatch(DatasetActions.updateEntity(id, dataset)),
  addTagToDataset: (datasetId, tags) => dispatch(DatasetLinkActions.sendSignal('PUT', tags, { dataset_id: datasetId, operation: 'associate' })),
  removeTagFromDataset: (datasetId, tags) => dispatch(DatasetLinkActions.sendSignal('PUT', tags, { dataset_id: datasetId, operation: 'dissociate' })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetEditLinksContainer)
