/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { connect } from '@regardsoss/redux'
import { CatalogShapes } from '@regardsoss/shape'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { ModuleStyleProvider } from '@regardsoss/theme'
import GraphLevelDisplayer from '../../components/user/GraphLevelDisplayer'
import getLevelPartitionKey from '../../domain/PartitionsConstants'
import { SelectionPath } from '../../shapes/SelectionShape'
import { DatasetAttributesArrayForGraph } from '../../shapes/DatasetAttributesForGraph'
import { DescriptionProperties } from '../../shapes/DescriptionProperties'
import FetchGraphCollectionsActions from '../../model/graph/FetchGraphCollectionsActions'
import FetchGraphDatasetsActions from '../../model/graph/FetchGraphDatasetsActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import GraphLevelCollectionActions from '../../model/graph/GraphLevelCollectionActions'
import GraphLevelDatasetActions from '../../model/graph/GraphLevelDatasetActions'
import GraphLevelCollectionSelectors from '../../model/graph/GraphLevelCollectionSelectors'
import GraphLevelDatasetSelectors, { getTerminalDatasets } from '../../model/graph/GraphLevelDatasetSelectors'
import styles from '../../styles/styles'

const moduleStyles = { styles }

/**
 * Container for collection content displayer (connects with selection state and level content)
 */
export class GraphLevelDisplayerContainer extends React.Component {
  static mapStateToProps = (state, { levelIndex, isFirstLevel }) => {
    const partitionKey = getLevelPartitionKey(levelIndex)
    // has parent selection, and is it a collection?
    const parentSelection = GraphContextSelectors.getSelectionForParentLevel(state, levelIndex)
    const parentId = parentSelection && parentSelection.entityType === ENTITY_TYPES_ENUM.COLLECTION ? parentSelection.id : null
    return {
      parentId,
      // retrieve level data from partitioned store
      isShowable: isFirstLevel || !!parentId, // shown only when in a valid path
      isLoading: GraphLevelCollectionSelectors.isLoading(state, partitionKey) || GraphLevelDatasetSelectors.isLoading(state, partitionKey),
      hasError: GraphLevelCollectionSelectors.hasError(state, partitionKey) || GraphLevelDatasetSelectors.hasError(state, partitionKey),
      collections: GraphLevelCollectionSelectors.getCollections(state, partitionKey),
      datasets: getTerminalDatasets(partitionKey)(state),
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
    dispatchFetchLevelCollections: (parentId) => GraphLevelDisplayerContainer.dispatchFetchLevelData(
      levelIndex, dispatch, GraphLevelCollectionActions,
      () => FetchGraphCollectionsActions.fetchAllCollections(levelIndex, parentId, levelModelName),
    ),
    // fetch datasets and dispatch level partitions update state
    dispatchFetchLevelDatasets: (parentPath) => GraphLevelDisplayerContainer.dispatchFetchLevelData(
      levelIndex, dispatch, GraphLevelDatasetActions,
      () => FetchGraphDatasetsActions.fetchAllDatasets(levelIndex, parentPath),
    ),
  })

  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    descriptionProperties: DescriptionProperties.isRequired, // From description HOC
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
    collections: CatalogShapes.EntityList.isRequired, // level displayed collections
    datasets: CatalogShapes.EntityList.isRequired, // the level displayed dataset
    parentId: PropTypes.string, // currently selected parent collection IP ID or null

    // from mapDispatchToProps
    dispatchFetchLevelCollections: PropTypes.func.isRequired,
    dispatchFetchLevelDatasets: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle hook: fetch initial content data (at least for root level, as it has no parent collection)
   */
  componentDidMount = () => {
    const { isShowable, parentId, selectionPath } = this.props
    this.updateLevelElements(isShowable, parentId, selectionPath)
  }

  /**
   * Lifecycle hook: fetch when parent collection changes (if parent collection is defined)
   * @param {*} nextProps
   */
  UNSAFE_componentWillReceiveProps = ({ parentId: nextparentId, isShowable, selectionPath }) => {
    const { parentId } = this.props
    if (parentId !== nextparentId && nextparentId) { // refetch on parent change, if showable
      this.updateLevelElements(isShowable, nextparentId, selectionPath)
    }
  }

  /**
   * Updates level elements. Checks that the level has a valid parent (or is root), avoids updating if not
   * @param isShowable is level showable in current state
   * @param parentCollectionId: contextual parent collection id (null for root)
   */
  updateLevelElements = (isShowable, parentCollectionId, selectionPath) => {
    // update only when in a showable state
    if (isShowable) {
      const {
        isFirstLevel, isLastLevel, dispatchFetchLevelCollections, dispatchFetchLevelDatasets,
      } = this.props
      const showDatasets = !isFirstLevel // no dataset on root level
      const showCollections = !isLastLevel // no collection on last level (used only to show parent collection's datasets)
      // 1 - Fetch collections
      if (showCollections) {
        dispatchFetchLevelCollections(parentCollectionId)
      }
      // 2 - Fetch datasets
      if (showDatasets) {
        // rebuild parent path (level != 0, there is necessary a selection)
        const parentIndex = selectionPath.findIndex((selectionElement) => selectionElement.id === parentCollectionId)
        if (parentIndex !== -1) {
          // get parent path from selection, map it to IP ID array
          const parentPath = selectionPath.slice(0, parentIndex + 1).map(({ id }) => id)
          dispatchFetchLevelDatasets(parentPath)
        }
      }
    }
  }

  render() {
    const {
      graphDatasetAttributes, descriptionProperties, isLastLevel, levelIndex,
      isShowable, isLoading, hasError, collections, datasets,
    } = this.props
    return (
      <ModuleStyleProvider module={moduleStyles}>
        <GraphLevelDisplayer
          graphDatasetAttributes={graphDatasetAttributes}
          descriptionProperties={descriptionProperties}
          isShowable={isShowable}
          isLoading={isLoading}
          hasError={hasError}
          collections={collections}
          datasets={datasets}
          levelIndex={levelIndex}
          isLastLevel={isLastLevel}
        />
      </ModuleStyleProvider>)
  }
}
export default connect(
  GraphLevelDisplayerContainer.mapStateToProps,
  GraphLevelDisplayerContainer.mapDispatchToProps,
)(GraphLevelDisplayerContainer)
