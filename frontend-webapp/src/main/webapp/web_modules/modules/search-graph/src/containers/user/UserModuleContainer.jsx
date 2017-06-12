/**
 * LICENSE_PLACEHOLDER
 **/
import get from 'lodash/get'
import last from 'lodash/last'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-manager'
import { CatalogEntity, CatalogEntityTypes, AttributeModel, AttributeModelController, AttributeConfigurationController } from '@regardsoss/model'
import { getTypeRender } from '@regardsoss/attributes-common'
import { ShowableAtRender } from '@regardsoss/components'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import { AttributeModelActions, AttributeModelSelectors } from '../../model/clients/AttributeModelClient'
import graphContextActions from '../../model/graph/GraphContextActions'
import fetchGraphCollectionsActions from '../../model/graph/FetchGraphCollectionsActions'
import fetchGraphDatasetsActions from '../../model/graph/FetchGraphDatasetsActions'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import NavigableSearchResults from '../../components/user/NavigableSearchResults'
import SearchGraph from '../../components/user/SearchGraph'

/**
 * Module container for user interface
 **/
export class UserModuleContainer extends React.Component {

  static mapStateToProps = (state, { moduleConf }) => {
    // retrieve last selected dataset (ignore collections)
    const selectionPath = graphContextSelectors.getSelectionPath(state)
    const selection = selectionPath.length ? last(selectionPath) : null
    const selectedDataset = selection && selection.type === CatalogEntityTypes.DATASET ? selection : null
    return {
      selectionPath,
      selectedDataset,
      attributeModels: AttributeModelSelectors.getList(state),
      moduleCollapsed: graphContextSelectors.isModuleCollapsed(state),
      // authentication, to refresh content on login / logout
      authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
    }
  }

  static mapDispatchToProps = dispatch => ({
    fetchAttributeModels: () => dispatch(AttributeModelActions.fetchEntityList()),
    fetchCollections: (levelIndex, parentEntityId, levelModelName) =>
      dispatch(fetchGraphCollectionsActions.fetchAllCollections(levelIndex, parentEntityId, levelModelName)),
    fetchDatasets: (levelIndex, parentEntityId) => dispatch(fetchGraphDatasetsActions.fetchAllDatasets(levelIndex, parentEntityId)),
    dispatchClearLevelSelection: levelIndex => dispatch(graphContextActions.selectEntity(levelIndex, null)),
  })

  static propTypes = {
    // supplied by LazyModuleComponent
    appName: PropTypes.string,
    project: PropTypes.string,
    moduleConf: ModuleConfiguration.isRequired, // Module configuration
    // from map state to props
    selectionPath: PropTypes.arrayOf(CatalogEntity),
    selectedDataset: CatalogEntity,
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
    const { moduleConf: { graphDatasetAttributes }, attributeModels, selectedDataset, authentication } = this.props
    const {
    moduleConf: { graphDatasetAttributes: nextGraphDatasetAttributes },
      attributeModels: nextAttributesModels,
      selectedDataset: nextSelectedDataset,
      authentication: nextAuthentication } = nextProps
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
        if (AttributeConfigurationController.isStandardAttribute(attributeConfiguration)) {
          // 3.a - standard attribute mapping, always resolves
          resolvedAttribute = {
            label: fullQualifiedName, // TODO use a constant for standard attributes labels
            attributePath: [fullQualifiedName], // root attribute
            render: getTypeRender(), // default render
          }
        } else {
          // 3.b - dynamic attribute mapping, resolves if found in fetched models
          const foundModel = find(fetchedAtributesModels, attributeModel =>
            AttributeModelController.getAttributeAccessPath(attributeModel) === fullQualifiedName)
          if (foundModel) {
            resolvedAttribute = {
              label: foundModel.content.label,
              attributePath: AttributeModelController.getAttributeAccessPath(foundModel), // fragment attribute
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
    // update search query
    if (!isEqual(selectedDataset, nextSelectedDataset)) {
      const singleDatasetIpId = nextSelectedDataset ? nextSelectedDataset.ipId : null
      const openSearchQuery = this.buildOpenSearchQuery(nextSelectedDataset)
      this.setState({ singleDatasetIpId, openSearchQuery })
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
  refreshCompleteGraph = ({ selectionPath, moduleConf: { graphLevels }, fetchCollections, fetchDatasets, dispatchClearLevelSelection }) => {
    // recursive handler builder: it returns a callback for Promise.all like (collections, datasets) => void
    function getRecursiveUpdater(selection, level) {
      if (!selection.length) {
        // A (break case): we resolved all elements
        return () => { } // done
      }
      const [{ ipId: selectedParentIpId, type: selectedParentType }, ...nextSelectedElements] = selection

      //  B - We need to fetch the levels content and attempt to retrieve the current selection there (then resolve recursively sub elements)
      // note: this function is the callback for upper Promise.all, it expects the results array of collections and datasets
      return function onCollectionsFetch([collectionsFetchResult, datasetFetchResults]) {
        // verify if the parent ip id is in result
        const collections = get(collectionsFetchResult, 'payload.entities.entities', {})
        const datasets = get(datasetFetchResults, 'payload.entities.entities', {})
        const retrievedParentSelection = find({ ...collections, ...datasets }, ({ content: { ipId } }) => selectedParentIpId === ipId)
        if (!retrievedParentSelection) {
          // C (break case) : the parent level selection could not be restored: remove it from selection then stop
          dispatchClearLevelSelection(level - 1)
        }

        if (selectedParentType === CatalogEntityTypes.DATASET) {
          // D (break case): The selected parent element cannot have children, this level is then empty
          return () => { } // done
        }

        // E - This level can content is restored, let the next delegate restore sub level if required
        return Promise.all([
          fetchCollections(level, selectedParentIpId, graphLevels[level]),
          fetchDatasets(level, selectedParentIpId)]).then(getRecursiveUpdater(nextSelectedElements, level + 1))
      }
    }

    // Refetch level 0 collections (fake datasets), then recursively update sublevels
    Promise.all([fetchCollections(0, null, graphLevels[0]), Promise.resolve({})])
      .then(getRecursiveUpdater(selectionPath, 1))
  }

  buildOpenSearchQuery = nextSelectedDataset => nextSelectedDataset ? `tags:${nextSelectedDataset.ipId}` : null

  render() {
    const { appName, project, moduleCollapsed, moduleConf, selectionPath } = this.props
    const { graphDatasetAttributes, openSearchQuery } = this.state

    return (
      <div>
        <SearchGraph
          moduleCollapsed={moduleCollapsed}
          graphDatasetAttributes={graphDatasetAttributes}
          moduleConf={moduleConf}
        />
        <ShowableAtRender show={!!openSearchQuery}>
          <NavigableSearchResults
            appName={appName}
            project={project}
            moduleConf={moduleConf}
            searchQuery={openSearchQuery}
            selectionPath={selectionPath}
          />
        </ShowableAtRender>
      </div>)
  }
}

export default connect(
  UserModuleContainer.mapStateToProps,
  UserModuleContainer.mapDispatchToProps)(UserModuleContainer)

