/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import find from 'lodash/find'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-utils'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { UIClient, DataManagementClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { modulesManager } from '@regardsoss/modules'
import { modulesHelper } from '@regardsoss/modules-api'
import { getTypeRender } from '@regardsoss/attributes-common'
import { withValueRenderContext } from '@regardsoss/components'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import { SelectionPath } from '../../shapes/SelectionShape'
import graphContextActions from '../../model/graph/GraphContextActions'
import fetchGraphCollectionsActions from '../../model/graph/FetchGraphCollectionsActions'
import fetchGraphDatasetsActions from '../../model/graph/FetchGraphDatasetsActions'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import graphLevelCollectionActions from '../../model/graph/GraphLevelCollectionActions'
import graphLevelDatasetActions from '../../model/graph/GraphLevelDatasetActions'
import getLevelPartitionKey from '../../domain/PartitionsConstants'
import DescriptionProviderContainer from './DescriptionProviderContainer'
import NavigableSearchResultsContainer from './NavigableSearchResultsContainer'
import SearchGraph from '../../components/user/SearchGraph'

// default pane state selectors
const moduleExpandedStateSelectors = UIClient.getModuleExpandedStateSelectors()
// default attribute model selectors
const attributeModelSelectors = DataManagementClient.AttributeModelSelectors()

/**
 * Module container for user interface. It resolves description control for sub elemenets (to avoid resolving it at items level)
 * @author Raphaël Mechali
 **/
export class UserModuleContainer extends React.Component {
  static mapStateToProps = (state, { type, id }) => {
    const searchGraphPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_GRAPH, id)
    return {
      presentationState: moduleExpandedStateSelectors.getPresentationState(state, searchGraphPaneKey),
      selectionPath: graphContextSelectors.getSelectionPath(state),
      attributeModels: attributeModelSelectors.getList(state),
      // authentication, to refresh content on login / logout
      authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
    }
  }

  static mapDispatchToProps = (dispatch) => ({
    fetchCollections: (levelIndex, parentEntityId, levelModelName) => dispatch(fetchGraphCollectionsActions.fetchAllCollections(levelIndex, parentEntityId, levelModelName)),
    fetchDatasets: (levelIndex, parentPath) => dispatch(fetchGraphDatasetsActions.fetchAllDatasets(levelIndex, parentPath)),
    dispatchClearLevelSelection: (levelIndex) => dispatch(graphContextActions.selectEntity(levelIndex, null)),
    dispatchLevelDataLoaded: (levelIndex, results, patitionTypeActions) => {
      if (results.error) {
        dispatch(patitionTypeActions.onDataLoadingFailed(getLevelPartitionKey(levelIndex), results.payload.message))
      } else if (results.payload) {
        dispatch(patitionTypeActions.onDataLoadingDone(getLevelPartitionKey(levelIndex), results))
      } // ignore empty objects, due to initilization case
    },
  })

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // from map state to props
    presentationState: PropTypes.oneOf(UIDomain.PRESENTATION_STATE),
    // eslint-disable-next-line react/no-unused-prop-types
    selectionPath: SelectionPath.isRequired,
    attributeModels: DataManagementShapes.AttributeModelList,
    authentication: AuthenticateShape,
    // from map dispatch to props
    // eslint-disable-next-line react/no-unused-prop-types
    fetchCollections: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchDatasets: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchClearLevelSelection: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchLevelDataLoaded: PropTypes.func.isRequired,
  }

  static defaultProps = {
    presentationState: UIDomain.PRESENTATION_STATE_ENUM.NORMAL, // default for admin or when not initialized
  }

  static contextTypes = {
    ...i18nContextType,
  }

  UNSAFE_componentWillMount = () => {
    this.onPropertiesChanged(undefined, this.props)
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  onPropertiesChanged = (oldProps, nextProps) => {
    const { moduleConf: { graphDatasetAttributes }, attributeModels, authentication } = (oldProps || { moduleConf: { attributeModels: [], graphLevels: [] } })
    const {
      moduleConf: { graphDatasetAttributes: nextGraphDatasetAttributes },
      attributeModels: nextAttributesModels, authentication: nextAuthentication,
    } = nextProps
    // update graph attributes if required (store it in state)
    if (!isEqual(graphDatasetAttributes, nextGraphDatasetAttributes) || !isEqual(attributeModels, nextAttributesModels)) {
      const attributesConfiguration = nextGraphDatasetAttributes || []
      const fetchedAtributesModels = nextAttributesModels || {}
      // resolve attributes from model (ignore the non resolved attributes, as they come from model changes)
      // Note: by configuration, each graphDatasetAttributes element has one and only one attribute
      const resolvedGraphDatasetAttributes = attributesConfiguration.reduce((resolvedAcc, attributeElement) => {
        const attrConfiguration = attributeElement.attributes[0]
        const foundModel = DamDomain.AttributeModelController
          .findModelFromAttributeFullyQualifiedName(attrConfiguration.name, fetchedAtributesModels)
        if (foundModel) {
          const {
            content: {
              jsonPath, type, precision, unit,
            },
          } = foundModel
          return [...resolvedAcc, {
            label: attributeElement.label,
            attributePath: jsonPath, // fragment attribute
            render: getTypeRender(type, attrConfiguration.renderer),
            precision, // optional (double {array / range / single} attributes only)
            unit, // optional (numeric {array / range / single} attributes only)
          }]
        }
        // else : not found, ignore it
        return resolvedAcc
      }, [])
      this.setState({ graphDatasetAttributes: resolvedGraphDatasetAttributes })
    }

    // login state changed: we need to refresh every level while selection is still valid and delete the selected elements where it isn't
    if (authentication !== nextAuthentication && oldProps) { // do not refresh on mount
      this.refreshCompleteGraph(nextProps)
    }
  }

  /**
   * Refreshes the complete graph, computes recursively the new visible content by level, tries to restore each level
   * selection and content or reset selection at the level where selected element is no longer available
   * @param props component properties, providing data to reset content
   */
  refreshCompleteGraph = ({
    selectionPath, moduleConf: { graphLevels }, fetchCollections,
    fetchDatasets, dispatchClearLevelSelection, dispatchLevelDataLoaded,
  }) => {
    // recursive handler builder: it returns a callback for Promise.all like (collections, datasets) => void
    function getRecursiveUpdater(selection, level) {
      // promise callback, receives parent collections and datasets
      return function onCollectionsFetch([collectionsFetchResult, datasetFetchResults]) {
        // 1 - publish parent partitions results
        dispatchLevelDataLoaded(level - 1, collectionsFetchResult, graphLevelCollectionActions)
        dispatchLevelDataLoaded(level - 1, datasetFetchResults, graphLevelDatasetActions)

        // 2 - Verify if the selection is still valid
        const collections = get(collectionsFetchResult, 'payload.entities.entities', {})
        const datasets = get(datasetFetchResults, 'payload.entities.entities', {})
        if (selection.length) {
          const [{ id: selectedParentId, entityType: selectedParentType }, ...nextSelectedElements] = selection
          const retrievedParentSelection = find({ ...collections, ...datasets }, ({ content: { id } }) => selectedParentId === id)
          if (!retrievedParentSelection) {
            // (break case) the parent level selection could not be restored: remove it from selection then stop
            dispatchClearLevelSelection(level - 1)
          } else if (selectedParentType !== DamDomain.ENTITY_TYPES_ENUM.DATASET) {
            // loop case: resolve next
            const parentPath = selectionPath.slice(0, level).map(({ id }) => id) // prepare parent path for datasets
            Promise.all([
              fetchCollections(level, selectedParentId, graphLevels[level]),
              fetchDatasets(level, parentPath)]).then(getRecursiveUpdater(nextSelectedElements, level + 1))
          }
        }
        // (break case) else, no level selection, done
      }
    }

    // Refetch level 0 collections (fake datasets), then recursively update content and sublevels
    Promise.all([fetchCollections(0, null, graphLevels[0]), Promise.resolve({})])
      .then(getRecursiveUpdater(selectionPath, 1))
  }

  render() {
    const { id, presentationState } = this.props
    const { graphDatasetAttributes } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <>
        <DescriptionProviderContainer id={id}>
          <SearchGraph
            graphDatasetAttributes={graphDatasetAttributes}
            presentationState={presentationState}
            {...modulesHelper.getReportedUserModuleProps(this.props)}
          />
        </DescriptionProviderContainer>
        <NavigableSearchResultsContainer
          resultsModuleTitle={formatMessage({ id: 'search.graph.results.title' })}
          {...modulesHelper.getReportedUserModuleProps(this.props)}
        />
      </>)
  }
}

// Note: we add here the render cell values context as it avoids connecting cell render one by one (trick used by the infinite
// tables to enhance render process)
export default compose(
  connect(UserModuleContainer.mapStateToProps, UserModuleContainer.mapDispatchToProps),
  withValueRenderContext)(UserModuleContainer)
