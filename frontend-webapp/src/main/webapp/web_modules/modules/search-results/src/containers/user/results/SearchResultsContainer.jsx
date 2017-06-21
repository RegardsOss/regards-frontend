/**
 * LICENSE_PLACEHOLDER
 **/
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import remove from 'lodash/remove'
import keys from 'lodash/keys'
import { connect } from '@regardsoss/redux'
import {
  AttributeModel,
  AttributeConfiguration,
  AttributesRegroupementConfiguration,
  AttributeConfigurationController,
  SearchResultsTargetsEnum,
} from '@regardsoss/model'
import { TableSelectionModes, TableSortOrders } from '@regardsoss/components'
import TableClient from '../../../clients/TableClient'
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'
import navigationContextActions from '../../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import {
  searchDataobjectsActions,
  searchDatasetsActions,
  selectors as searchSelectors,
} from '../../../clients/SearchEntitiesClient'
import datasetServicesSelectors from '../../../models/services/DatasetServicesSelectors'
import QueriesHelper from '../../../definitions/QueriesHelper'
import Service from '../../../definitions/service/Service'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'

const EMPTY_SERVICE_LIST = []

/**
 * Search results container, drives corresponding component
 */
export class SearchResultsContainer extends React.Component {

  static mapStateToProps = state => ({
    datasetServices: datasetServicesSelectors.getDatasetServices(state),
    selectedDataobjectsServices: datasetServicesSelectors.getSelectedDataobjectsServices(state),
    levels: navigationContextSelectors.getLevels(state),
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
    displayMode: navigationContextSelectors.getDisplayMode(state),

    // selection related
    selectionMode: TableClient.tableSelectors.getSelectionMode(state),
    toggledElements: TableClient.tableSelectors.getToggledElements(state),
    pageMetadata: searchSelectors.getMetaData(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchChangeViewObjectType: viewObjectType => dispatch(navigationContextActions.changeViewObjectType(viewObjectType)),
    dispatchChangeDisplayMode: displayMode => dispatch(navigationContextActions.changeDisplayMode(displayMode)),
    dispatchTagSelected: searchTag => dispatch(navigationContextActions.changeSearchTag(searchTag)),
    dispatchDatasetSelected: (dataset) => {
      dispatch(navigationContextActions.changeDataset(dataset))
      dispatch(navigationContextActions.changeViewObjectType(SearchResultsTargetsEnum.DATAOBJECT_RESULTS))
    },
  })

  static propTypes = {
    // sub modules rendering
    appName: PropTypes.string,
    project: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: PropTypes.string, // initial search query, as provided by module configuration
    enableFacettes: PropTypes.bool.isRequired, // are facettes enabled
    displayDatasets: PropTypes.bool.isRequired, // should display datasets
    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: PropTypes.string, // facettes query to be added to search query in order to get the facettes
    // Attributes configurations for results columns
    attributesConf: PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    datasetAttributesConf: PropTypes.arrayOf(AttributeConfiguration),
    attributeModels: PropTypes.objectOf(AttributeModel),

    // From map state to props
    datasetServices: PropTypes.arrayOf(PropTypes.instanceOf(Service)).isRequired,
    selectedDataobjectsServices: PropTypes.arrayOf(PropTypes.instanceOf(Service)).isRequired,
    viewObjectType: PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
    // Display mode
    displayMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired, // only used to build query
    // eslint-disable-next-line react/no-unused-prop-types
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)),

    dispatchChangeViewObjectType: PropTypes.func.isRequired,
    dispatchChangeDisplayMode: PropTypes.func.isRequired,
    dispatchDatasetSelected: PropTypes.func.isRequired,
    dispatchTagSelected: PropTypes.func.isRequired,
  }

  /**
   * Default component state (describes all possible state elements)
   */
  static DEFAULT_STATE = {
    emptySelection: true, // is current selection empty?
    // is currently showing facettes
    showingFacettes: false,
    // initial sorting attributes array
    initialSortAttributesPath: [],
    // Current sorting attributes array like {attributePath: String, type: (optional) one of 'ASC' / 'DESC'}
    sortingOn: [],
    filters: [],
    searchTag: null,
    // runtime qearch query, generated from all query elements known
    searchQuery: null,
  }

  componentWillMount = () => this.updateState({}, this.props)

  componentWillReceiveProps = nextProps => this.updateState(this.props, nextProps)

  /** On show datasets */
  onShowDatasets = () => this.props.dispatchChangeViewObjectType(SearchResultsTargetsEnum.DATASET_RESULTS)

  /** On show dataobjects */
  onShowDataobjects = () => this.props.dispatchChangeViewObjectType(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)

  /** On show results as list view action */
  onShowListView = () => this.props.dispatchChangeDisplayMode(DisplayModeEnum.LIST)

  /**  On show results as table view action  */
  onShowTableView = () => this.props.dispatchChangeDisplayMode(DisplayModeEnum.TABLE)

  /** User toggled facettes search */
  onToggleShowFacettes = () => this.updateStateAndQuery({ showingFacettes: !this.state.showingFacettes })

  /** On filters changed */
  onFiltersChanged = (filters = []) => this.updateStateAndQuery({ filters })

  /**
   * User changed sorting
   * @param attributePath attribute path
   * @param type sorting type
   * @param clear true to clear other sorting attributes, false otherwise
   */
  onSortChanged = (attributePath, type, clear) => {
    const newSortingOn = clear ? [] : [...this.state.sortingOn]
    // XXX we want to reset selection or adapt it there
    if (attributePath) {
      if (type && (type === TableSortOrders.ASCENDING_ORDER || type === TableSortOrders.DESCENDING_ORDER)) {
        // add the attribute to sorting list
        let currentAttrSorting = find(newSortingOn, ({ attributePath: currPath }) => currPath === attributePath)
        if (!currentAttrSorting) {
          currentAttrSorting = { attributePath, type } // note, type is not mandatory
          newSortingOn.push(currentAttrSorting)
        } else {
          currentAttrSorting.type = type
        }
      } else {
        // remove attribute from sorting list
        remove(newSortingOn, ({ attributePath: currPath }) => attributePath === currPath)
      }
    }

    this.updateStateAndQuery({
      sortingOn: newSortingOn,
    })
  }

  onDatasetServiceSelected = service => console.error('Implement dataset service ', service)

  onSelectionServiceSelected = service => console.error('Implement selection (dataobjects) service ', service)

  onDataobjectServiceSelected = (service, dataobjectEntity) => console.error('Implement single (dataobject) service ', service)

  /**
   * Builds opensearch query from properties and state as parameter
   * @param properties : properties to consider when building query
   * @param state : state to consider when building query
   */
  buildOpenSearchQuery = ({ searchQuery, facettesQuery, levels, viewObjectType },
    { showingFacettes, filters, sortingOn, initialSortAttributesPath }) => {
    // check if facettes should be applied
    const facettes = showingFacettes && viewObjectType === SearchResultsTargetsEnum.DATAOBJECT_RESULTS ? filters : []
    const facettesQueryPart = showingFacettes ? facettesQuery : ''
    const openSearchQuery = QueriesHelper.getOpenSearchQuery(searchQuery, facettes, NavigationLevel.getQueryParameters(levels))
    // check if user specified or sorting or provide one
    const sorting = sortingOn.length ? sortingOn : initialSortAttributesPath
    return QueriesHelper.getURLQuery(openSearchQuery, sorting, facettesQueryPart).toQueryString()
  }

  /**
   * A - Compute new query
   * B - When old and new state are different, updates URL parameters if required and push new URL in browser history
   * Rematches URL key from the new state, to report state fields in URL when it should
   * @param newState new state
   * @param properties properties to consider (this current properties by default)
   */
  updateStateAndQuery = (newState, properties = this.props) => {
    const currentState = this.state || SearchResultsContainer.DEFAULT_STATE
    const completedNewState = {
      // recover current state in case of partial update (to not make equal method wrong)
      ...currentState,
      ...newState,
    }
    completedNewState.searchQuery = this.buildOpenSearchQuery(properties, completedNewState)
    // update state if any change is detected
    if (!isEqual(completedNewState, this.state)) {
      this.setState(completedNewState)
    }
  }

  /**
   * Computes states updates from old to new properties
   */
  updateState = (oldProperties, newProperties) => {
    const newState = {} // Default  state will be recovered by updateStateAndQuery

    //  initial sort attributes (used while the user hasn't set any sortedColumns)
    if (oldProperties.attributesConf !== newProperties.attributesConf) {
      newState.intialSortAttributesPath =
        (AttributeConfigurationController.getInitialSortAttributes(newProperties.attributesConf) || []).map(
          attribute => ({
            attributePath: attribute,
            type: TableSortOrders.ASCENDING_ORDER, // default is ascending
          }),
        )
    }

    // on selection change, if new selection is empty, hide selection services
    if (oldProperties.selectionMode !== newProperties.selectionMode ||
      oldProperties.toggledElements !== newProperties.toggledElements ||
      oldProperties.pageMetadata !== newProperties.pageMetadata) {
      newState.emptySelection = this.isEmptySelection(newProperties)
    }
    this.updateStateAndQuery(newState, newProperties, true)
  }

  /**
   * @return true if selection is empty in current state, false otherwise
   */
  isEmptySelection = (properties) => {
    const { selectionMode, toggledElements, pageMetadata } = properties
    const totalElements = (pageMetadata && pageMetadata.totalElements) || 0
    const selectionSize = keys(toggledElements).length

    return (selectionMode === TableSelectionModes.includeSelected && selectionSize === 0) ||
      (selectionMode === TableSelectionModes.excludeSelected && selectionSize === totalElements)
  }

  render() {
    const {
      appName, project, enableFacettes, attributesConf,
      attributesRegroupementsConf, attributeModels, viewObjectType,
      facettesQuery, datasetServices, selectedDataobjectsServices, displayDatasets,
      dispatchDatasetSelected, dispatchTagSelected, displayMode, datasetAttributesConf,
    } = this.props
    const { showingFacettes, filters, searchTag, searchQuery, emptySelection, sortingOn } = this.state

    // compute view mode
    const showingDataobjects = viewObjectType === SearchResultsTargetsEnum.DATAOBJECT_RESULTS
    // compute child results fetch actions
    const searchActions = showingDataobjects ? searchDataobjectsActions : searchDatasetsActions

    // control the available selection options
    let usableDatasetServices = []
    let usableSelectedDataobjectServices = []
    if (showingDataobjects) {
      usableDatasetServices = datasetServices
      usableSelectedDataobjectServices = emptySelection ? EMPTY_SERVICE_LIST : selectedDataobjectsServices
    }

    return (
      <SearchResultsComponent
        appName={appName}
        project={project}
        allowingFacettes={enableFacettes && !!facettesQuery}

        showingDataobjects={showingDataobjects}
        viewMode={displayMode || DisplayModeEnum.LIST}
        showingFacettes={showingFacettes}
        displayDatasets={displayDatasets}
        sortingOn={sortingOn}
        filters={filters}
        searchTag={searchTag}
        searchQuery={searchQuery}

        attributesConf={attributesConf}
        attributesRegroupementsConf={attributesRegroupementsConf}
        datasetAttributesConf={datasetAttributesConf}
        attributeModels={attributeModels}

        resultPageActions={searchActions}

        datasetServices={usableDatasetServices}
        selectedDataobjectsServices={usableSelectedDataobjectServices}

        onShowDatasets={this.onShowDatasets}
        onShowDataobjects={this.onShowDataobjects}
        onShowListView={this.onShowListView}
        onShowTableView={this.onShowTableView}
        onToggleShowFacettes={this.onToggleShowFacettes}
        onSelectDataset={dispatchDatasetSelected}
        onSelectSearchTag={dispatchTagSelected}
        onFiltersChanged={this.onFiltersChanged}
        onResetNavigationContext={this.onResetNavigationContext}
        onSortChanged={this.onSortChanged}

        onDatasetServiceSelected={this.onDatasetServiceSelected}
        onSelectionServiceSelected={this.onSelectionServiceSelected}
        onDataobjectServiceSelected={this.onDataobjectServiceSelected}

      />
    )
  }
}
export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps)(SearchResultsContainer)
