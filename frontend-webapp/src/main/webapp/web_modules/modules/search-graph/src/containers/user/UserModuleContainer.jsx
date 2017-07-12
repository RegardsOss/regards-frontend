/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import find from 'lodash/find'
import sortBy from 'lodash/sortBy'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-manager'
import { DamDomain, AccessDomain } from '@regardsoss/domain'
import { CatalogEntityTypes, AttributeModel } from '@regardsoss/model'
import { getTypeRender } from '@regardsoss/attributes-common'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import { SelectionPath } from '../../model/graph/SelectionShape'
import { AttributeModelActions, AttributeModelSelectors } from '../../clients/AttributeModelClient'
import graphContextActions from '../../model/graph/GraphContextActions'
import fetchGraphCollectionsActions from '../../model/graph/FetchGraphCollectionsActions'
import fetchGraphDatasetsActions from '../../model/graph/FetchGraphDatasetsActions'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import graphLevelCollectionActions from '../../model/graph/GraphLevelCollectionActions'
import graphLevelDatasetActions from '../../model/graph/GraphLevelDatasetActions'
import getLevelPartitionKey from '../../model/graph/PartitionsConstants'
import NavigableSearchResultsContainer from './NavigableSearchResultsContainer'
import SearchGraph from '../../components/user/SearchGraph'
import DescriptionContainer from './DescriptionContainer'

/**
 * Module container for user interface
 **/
export class UserModuleContainer extends React.Component {

  static mapStateToProps = (state, { moduleConf }) => ({
    selectionPath: graphContextSelectors.getSelectionPath(state),
    attributeModels: AttributeModelSelectors.getList(state),
    moduleCollapsed: graphContextSelectors.isModuleCollapsed(state),
    // authentication, to refresh content on login / logout
    authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
  })

  static mapDispatchToProps = dispatch => ({
    fetchAttributeModels: () => dispatch(AttributeModelActions.fetchEntityList({ pModelType: 'DATASET' })),
    fetchCollections: (levelIndex, parentEntityId, levelModelName) =>
      dispatch(fetchGraphCollectionsActions.fetchAllCollections(levelIndex, parentEntityId, levelModelName)),
    fetchDatasets: (levelIndex, parentPath) => dispatch(fetchGraphDatasetsActions.fetchAllDatasets(levelIndex, parentPath)),
    dispatchClearLevelSelection: levelIndex => dispatch(graphContextActions.selectEntity(levelIndex, null)),
    dispatchLevelDataLoaded: (levelIndex, results, patitionTypeActions) => {
      if (results.error) {
        dispatch(patitionTypeActions.onDataLoadingFailed(getLevelPartitionKey(levelIndex), results.payload.message))
      } else if (results.payload) {
        dispatch(patitionTypeActions.onDataLoadingDone(getLevelPartitionKey(levelIndex), results))
      } // ignore empty objects, due to initilization case
    },

  })

  static propTypes = {
    // supplied by LazyModuleComponent
    appName: PropTypes.string,
    project: PropTypes.string,
    moduleConf: ModuleConfiguration.isRequired, // Module configuration
    // from map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    selectionPath: SelectionPath.isRequired,
    attributeModels: PropTypes.objectOf(AttributeModel),
    moduleCollapsed: PropTypes.bool.isRequired,
    authentication: AuthenticateShape,
    // from map dispatch to props
    fetchAttributeModels: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchCollections: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchDatasets: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchClearLevelSelection: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchLevelDataLoaded: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    // initialize resolved dataset attributes to empty collection
    // note: the moment it will get resolved is not important for this component
    this.setState({ graphDatasetAttributes: [] })
  }

  componentDidMount = () => {
    // Fetch attribute models in order to resolve dataset attributes for the graph
    const { fetchAttributeModels } = this.props
    fetchAttributeModels()
  }

  componentWillReceiveProps = (nextProps) => {
    const { moduleConf: { graphDatasetAttributes }, attributeModels, authentication } = this.props
    const { moduleConf: { graphDatasetAttributes: nextGraphDatasetAttributes },
      attributeModels: nextAttributesModels, authentication: nextAuthentication } = nextProps
    // update graph attributes if required (store it in state)
    if (!isEqual(graphDatasetAttributes, nextGraphDatasetAttributes) || !isEqual(attributeModels, nextAttributesModels)) {
      const attributesConfiguration = nextGraphDatasetAttributes || []
      const fetchedAtributesModels = nextAttributesModels || {}
      // 1 - filter (only visible attributes from configuration)
      const filtered = filter(attributesConfiguration, ({ visibility }) => visibility)
      // 2 - order them as they sould be dispayed (if no order, place before all)
      const sorted = sortBy(filtered, a => a.order || 0)
      // 3 - resolve attributes from model (ignore the non resolved attributes, as they come from model changes)
      const resolvedGraphDatasetAttributes = sorted.reduce((resolvedAcc, attributeConfiguration) => {
        const fullQualifiedName = attributeConfiguration.attributeFullQualifiedName
        let resolvedAttribute = null
        if (AccessDomain.AttributeConfigurationController.isStandardAttribute(attributeConfiguration)) {
          const attrModel = DamDomain.AttributeModelController.standardAttributes[fullQualifiedName]
          // 3.a - standard attribute mapping, always resolves
          resolvedAttribute = {
            label: attrModel.label,
            attributePath: fullQualifiedName,
            render: getTypeRender(attrModel.type),
          }
        } else {
          // 3.b - dynamic attribute mapping, resolves if found in fetched models
          const foundModel = find(fetchedAtributesModels, attributeModel =>
            DamDomain.AttributeModelController.getAttributeAccessPath(attributeModel) === fullQualifiedName)
          if (foundModel) {
            resolvedAttribute = {
              label: foundModel.content.label,
              attributePath: DamDomain.AttributeModelController.getAttributeAccessPath(foundModel), // fragment attribute
              render: getTypeRender(foundModel.content.type),
            }
          }
          // else : not found, ignore it
        }
        // Append only when resolved
        return resolvedAttribute ? [...resolvedAcc, resolvedAttribute] : resolvedAcc
      }, [])
      this.setState({ graphDatasetAttributes: resolvedGraphDatasetAttributes })
    }

    // login state changed: we need to refresh every level while selection is still valid and delete the selected elements where it isn't
    if (authentication !== nextAuthentication) {
      this.refreshCompleteGraph(nextProps)
    }
  }
  /**
   * Refreshes the complete graph, computes recursively the new visible content by level, tries to restore each level
   * selection and content or reset selection at the level where selected element is no longer available
   * @param props component properties, providing data to reset content
   */
  refreshCompleteGraph = ({ selectionPath, moduleConf: { graphLevels }, fetchCollections,
    fetchDatasets, dispatchClearLevelSelection, dispatchLevelDataLoaded }) => {
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
          const [{ ipId: selectedParentIpId, entityType: selectedParentType }, ...nextSelectedElements] = selection
          const retrievedParentSelection = find({ ...collections, ...datasets }, ({ content: { ipId } }) => selectedParentIpId === ipId)
          if (!retrievedParentSelection) {
            // (break case) the parent level selection could not be restored: remove it from selection then stop
            dispatchClearLevelSelection(level - 1)
          } else if (selectedParentType !== CatalogEntityTypes.DATASET) {
            // loop case: resolve next
            const parentPath = selectionPath.slice(0, level).map(({ ipId }) => ipId) // prepare parent path for datasets
            Promise.all([
              fetchCollections(level, selectedParentIpId, graphLevels[level]),
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
    const { appName, project, moduleCollapsed, moduleConf } = this.props
    const { graphDatasetAttributes } = this.state

    return (
      <div>
        { /* Description handling */}
        <DescriptionContainer />
        <SearchGraph
          moduleCollapsed={moduleCollapsed}
          graphDatasetAttributes={graphDatasetAttributes}
          moduleConf={moduleConf}
        />
        <NavigableSearchResultsContainer
          appName={appName}
          project={project}
          moduleConf={moduleConf}
        />
      </div>)
  }
}

export default connect(
  UserModuleContainer.mapStateToProps,
  UserModuleContainer.mapDispatchToProps)(UserModuleContainer)

