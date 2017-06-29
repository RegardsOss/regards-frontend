/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogEntity, CatalogEntityTypes } from '@regardsoss/model'
import GraphLevelDisplayer from '../../components/user/GraphLevelDisplayer'
import { SelectionPath } from '../../model/graph/SelectionShape'
import { DatasetAttributesArrayForGraph } from '../../model/DatasetAttributesForGraph'
import FetchGraphCollectionsActions from '../../model/graph/FetchGraphCollectionsActions'
import FetchGraphDatasetsActions from '../../model/graph/FetchGraphDatasetsActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import GraphLevelCollectionActions from '../../model/graph/GraphLevelCollectionActions'
import GraphLevelDatasetActions from '../../model/graph/GraphLevelDatasetActions'
import getLevelPartitionKey from '../../model/graph/PartitionsConstants'
import GraphLevelCollectionSelectors from '../../model/graph/GraphLevelCollectionSelectors'
import GraphLevelDatasetSelectors from '../../model/graph/GraphLevelDatasetSelectors'

/**
* Container for collection content displayer (connects with selection state and level content)
*/
export class GraphLevelDisplayerContainer extends React.Component {

  static mapStateToProps = (state, { levelIndex, isFirstLevel }) => {
    const partitionKey = getLevelPartitionKey(levelIndex)
    // has parent selection, and is it a collectionb?
    const parentSelection = GraphContextSelectors.getSelectionForParentLevel(state, levelIndex)
    const parentIpId = parentSelection && parentSelection.entityType === CatalogEntityTypes.COLLECTION ? parentSelection.ipId : null
    return {
      parentIpId,
      // retrieve level data from partitioned store
      isShowable: isFirstLevel || !!parentIpId, // shown only when in a valid path
      isLoading: GraphLevelCollectionSelectors.isLoading(state, partitionKey) || GraphLevelDatasetSelectors.isLoading(state, partitionKey),
      hasError: GraphLevelCollectionSelectors.hasError(state, partitionKey) || GraphLevelDatasetSelectors.hasError(state, partitionKey),
      collections: GraphLevelCollectionSelectors.getCollections(state, partitionKey),
      datasets: GraphLevelDatasetSelectors.getDatasets(state, partitionKey),
      selectionPath: GraphContextSelectors.getSelectionPath(state),
    }
  }

  /**
   * Dispatch fetch level data (follows promise advancement)
   * @param levelIndex level index
   * @param dispatch dispatch method
   * @param fetchActionBuilder fetcj action builder like () => ()
   * @param partitionStorageActions BasicPartitionActions instance for current data type
   * @return the loading promise
   */
  static dispatchFetchLevelData = (levelIndex, dispatch, partitionDataActions, fetchActionBuilder) => {
    const partitionKey = getLevelPartitionKey(levelIndex)
    // 1 - notify level loading data
    dispatch(partitionDataActions.onDataLoadingStart(partitionKey))
    // 2 - dispatch fetch and resolve promise
    return dispatch(fetchActionBuilder())
      .then((result) => {
        if (result.error) {
          // 3a - Notify error
          // note: errors are not handled in catch, due to ApiError management from redux middleware
          return dispatch(partitionDataActions.onDataLoadingFailed(partitionKey, result.payload.message))
        }
        // 3b - Notify success with result
        return dispatch(partitionDataActions.onDataLoadingDone(partitionKey, result))
      })
  }

  static mapDispatchToProps = (dispatch, { levelIndex, levelModelName }) => ({
    // fetch collections and dispatch level partitions update state
    dispatchFetchLevelCollections: parentIpId =>
      GraphLevelDisplayerContainer.dispatchFetchLevelData(levelIndex, dispatch, GraphLevelCollectionActions,
        () => FetchGraphCollectionsActions.fetchAllCollections(levelIndex, parentIpId, levelModelName)),
    // fetch datasets and dispatch level partitions update state
    dispatchFetchLevelDatasets: parentPath =>
      GraphLevelDisplayerContainer.dispatchFetchLevelData(levelIndex, dispatch, GraphLevelDatasetActions,
        () => FetchGraphDatasetsActions.fetchAllDatasets(levelIndex, parentPath)),
  })

  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    levelIndex: PropTypes.number.isRequired, // level index in graph
    isFirstLevel: PropTypes.bool.isRequired,
    isLastLevel: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    levelModelName: PropTypes.string, // model name for this level, used only for dispatch, null allowed for last level
    // from map state to props
    selectionPath: SelectionPath.isRequired,
    isShowable: PropTypes.bool.isRequired, // is showable in current selection state
    isLoading: PropTypes.bool.isRequired, // is loading
    hasError: PropTypes.bool.isRequired, // has fetch error
    collections: PropTypes.objectOf(CatalogEntity).isRequired,  // level displayed collections
    datasets: PropTypes.objectOf(CatalogEntity).isRequired,  // the level displayed dataset
    parentIpId: PropTypes.string, // currently selected parent collection IP ID or null

    // from mapDispatchToProps
    dispatchFetchLevelCollections: PropTypes.func.isRequired,
    dispatchFetchLevelDatasets: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle hook: fetch initial content data (at least for root level, as it has no parent collection)
   */
  componentDidMount = () => {
    const { isShowable, parentIpId, selectionPath } = this.props
    this.updateLevelElements(isShowable, parentIpId, selectionPath)
  }


  /**
   * Lifecycle hook: fetch when parent collection changes (if parent collection is defined)
   * @param {*} nextProps
   */
  componentWillReceiveProps = ({ parentIpId: nextParentIpId, isShowable, selectionPath }) => {
    const { parentIpId } = this.props
    if (parentIpId !== nextParentIpId) { // refetch on parent change, if showable
      this.updateLevelElements(isShowable, nextParentIpId, selectionPath)
    }
  }

  /**
   * Updates level elements. Checks that the level has a valid parent (or is root), avoids updating if not
   * @param isShowable is level showable in current state
   * @param parentCollectionIpId: contextual parent collection ip id (null for root)
   */
  updateLevelElements = (isShowable, parentIpId, selectionPath) => {
    // update only when in a showable state
    if (isShowable) {
      const { isFirstLevel, isLastLevel, dispatchFetchLevelCollections, dispatchFetchLevelDatasets } = this.props
      const showDatasets = !isFirstLevel // no dataset on root level
      const showCollections = !isLastLevel // no collection on last level (used only to show parent collection's datasets)
      // 1 - Fetch collections
      if (showCollections) {
        dispatchFetchLevelCollections(parentIpId)
      }
      // 2 - Fetch datasets
      if (showDatasets) {
        // rebuild parent path (level != 0, there is necessary a selection)
        const parentIndex = selectionPath.findIndex(selectionElement => selectionElement.ipId === parentIpId)
        console.error('---> I DO SUCK ', parentIndex, selectionPath)
        if (parentIndex !== -1) {
          const parentPath = selectionPath.slice(0, parentIndex + 1)
          console.error('--> Ill be requiring the damned ', parentPath)
          dispatchFetchLevelDatasets([parentIpId])
        }
      }
    }
  }

  render() {
    const {
      graphDatasetAttributes,
      isLastLevel,
      levelIndex,
      isShowable,
      isLoading,
      hasError,
      collections,
      datasets,
    } = this.props
    return (
      <GraphLevelDisplayer
        graphDatasetAttributes={graphDatasetAttributes}
        isShowable={isShowable}
        isLoading={isLoading}
        hasError={hasError}
        collections={collections}
        datasets={datasets}
        levelIndex={levelIndex}
        isLastLevel={isLastLevel}
      />)
  }

}
export default connect(
  GraphLevelDisplayerContainer.mapStateToProps,
  GraphLevelDisplayerContainer.mapDispatchToProps)(GraphLevelDisplayerContainer)
