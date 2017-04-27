/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogEntity, CatalogEntityTypes } from '@regardsoss/model'
import GraphLevelDisplayer from '../../components/user/GraphLevelDisplayer'
import { DatasetAttributesArrayForGraph } from '../../model/DatasetAttributesForGraph'
import FetchGraphCollectionsActions from '../../model/graph/FetchGraphCollectionsActions'
import FetchGraphDatasetsActions from '../../model/graph/FetchGraphDatasetsActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import GraphLevelCollectionActions from '../../model/graph/GraphLevelCollectionActions'
import GraphLevelDatasetActions from '../../model/graph/GraphLevelDatasetActions'
import GraphLevelCollectionSelectors from '../../model/graph/GraphLevelCollectionSelectors'
import GraphLevelDatasetSelectors from '../../model/graph/GraphLevelDatasetSelectors'

/**
* Container for collection content displayer (connects with selection state and level content)
*/
export class GraphLevelDisplayerContainer extends React.Component {

  static getLevelPartitionKey = levelIndex => `level-${levelIndex}`

  static mapStateToProps = (state, { levelIndex, isFirstLevel }) => {
    const partitionKey = GraphLevelDisplayerContainer.getLevelPartitionKey(levelIndex)
    // has parent selection, and is it a collectionb?
    const parentSelection = GraphContextSelectors.getSelectionForParentLevel(state, levelIndex)
    const parentIpId = parentSelection && parentSelection.type === CatalogEntityTypes.COLLECTION ? parentSelection.ipId : null
    return {
      parentIpId,
      // retrieve level data from partitioned store
      isShowable: isFirstLevel || !!parentIpId, // shown only when in a valid path
      isLoading: GraphLevelCollectionSelectors.isLoading(state, partitionKey) || GraphLevelDatasetSelectors.isLoading(state, partitionKey),
      hasError: GraphLevelCollectionSelectors.hasError(state, partitionKey) || GraphLevelDatasetSelectors.hasError(state, partitionKey),
      collections: GraphLevelCollectionSelectors.getCollections(state, partitionKey),
      datasets: GraphLevelDatasetSelectors.getDatasets(state, partitionKey),
    }
  }

  /**
   * Returns a closure to dispatch fetch level data, dispatch actions while resolving the promise to follow partition data state
   * @param levelIndex level index
   * @param dispatch dispatch method
   * @param dataFetcher function like parentIpId => re
   * @param partitionStorageActions BasicPartitionActions instance for current data type
   * @return dispatch fetch level method like (parentIpId:string) => void
   */
  static dispatchFetchLevelData = (levelIndex, dispatch, partitionDataActions, dataFetcher) => (parentIpId) => {
    const partitionKey = GraphLevelDisplayerContainer.getLevelPartitionKey(levelIndex)
    // 1 - notify level loading data
    dispatch(partitionDataActions.onDataLoadingStart(partitionKey))
    // 2 - dispatch fetch and resolve promise
    dispatch(dataFetcher(parentIpId))
      .then((result) => {
        if (result.error) {
          // 3a - Notify error
          // note: errors are not handled in catch, due to ApiError management from redux middleware
          dispatch(partitionDataActions.onDataLoadingFailed(partitionKey, result.payload.message))
        } else {
          // 3b - Notify success with result
          dispatch(partitionDataActions.onDataLoadingDone(partitionKey, result))
        }
      })
  }

  static mapDispatchToProps = (dispatch, { levelIndex, levelModelName }) => ({
    // fetch collections and dispatch level partitions update state
    dispatchFetchLevelCollections: GraphLevelDisplayerContainer.dispatchFetchLevelData(levelIndex, dispatch, GraphLevelCollectionActions,
      parentIpId => FetchGraphCollectionsActions.fetchAllCollections(levelIndex, parentIpId, levelModelName)),
    // fetch datasets and dispatch level partitions update state
    dispatchFetchLevelDatasets: GraphLevelDisplayerContainer.dispatchFetchLevelData(levelIndex, dispatch, GraphLevelDatasetActions,
      parentIpId => FetchGraphDatasetsActions.fetchAllDatasets(levelIndex, parentIpId)),
  })

  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    levelIndex: React.PropTypes.number.isRequired, // level index in graph
    isFirstLevel: React.PropTypes.bool.isRequired,
    isLastLevel: React.PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    levelModelName: React.PropTypes.string.isRequired, // model name for this level, used only for dispatch
    // from map state to props
    isShowable: React.PropTypes.bool.isRequired, // is showable in current selection state
    isLoading: React.PropTypes.bool.isRequired, // is loading
    hasError: React.PropTypes.bool.isRequired, // has fetch error
    collections: React.PropTypes.objectOf(CatalogEntity).isRequired,  // level displayed collections
    datasets: React.PropTypes.objectOf(CatalogEntity).isRequired,  // the level displayed dataset
    parentIpId: React.PropTypes.string, // currently selected parent collection IP ID or null

    // from mapDispatchToProps
    dispatchFetchLevelCollections: React.PropTypes.func.isRequired,
    dispatchFetchLevelDatasets: React.PropTypes.func.isRequired,
  }

  /**
   * Lifecycle hook: fetch initial content data (at least for root level, as it has no parent collection)
   */
  componentDidMount = () => {
    const { isShowable, parentIpId } = this.props
    this.updateLevelElements(isShowable, parentIpId)
  }


  /**
   * Lifecycle hook: fetch when parent collection changes (if parent collection is defined)
   * @param {*} nextProps
   */
  componentWillReceiveProps = ({ parentIpId: nextParentIpId, isShowable: nextIsShowable }) => {
    const { parentIpId } = this.props
    if (parentIpId !== nextParentIpId) { // refetch on parent change, if showable
      this.updateLevelElements(nextIsShowable, nextParentIpId)
    }
  }

  /**
   * Updates level elements. Checks that the level has a valid parent (or is root), avoids updating if not
   * @param isShowable is level showable in current state
   * @param parentCollectionIpId: contextual parent collection ip id (null for root)
   */
  updateLevelElements = (isShowable, parentIpId) => {
    // update only when in a showable state
    if (isShowable) {
      const { isFirstLevel, dispatchFetchLevelCollections, dispatchFetchLevelDatasets } = this.props
      const showDatasets = !isFirstLevel // no dataset on root level
      // 1 - Fetch collections
      dispatchFetchLevelCollections(parentIpId)
      // 2 - Fetch datasets
      if (showDatasets) {
        dispatchFetchLevelDatasets(parentIpId)
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
