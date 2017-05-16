/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import remove from 'lodash/remove'
import { connect } from '@regardsoss/redux'
import {
  AttributeModel,
  AttributeConfiguration,
  AttributesRegroupementConfiguration,
  AttributeModelController,
  AttributeConfigurationController,
  SearchResultsTargetsEnum,
} from '@regardsoss/model'
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import navigationContextActions from '../../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import CatalogDataobjectEntityActions from '../../../models/catalog/CatalogDataobjectEntityActions'
import CatalogDatasetEntityActions from '../../../models/catalog/CatalogDatasetEntityActions'
import QueriesHelper from '../../../definitions/query/QueriesHelper'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'

/**
* Search results container, drives corresponding component
*/
class SearchResultsContainer extends React.Component {

  static mapStateToProps = state => ({
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
    levels: navigationContextSelectors.getLevels(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchChangeViewObjectType: viewObjectType => dispatch(navigationContextActions.changeViewObjectType(viewObjectType)),
    dispatchTagSelected: searchTag => dispatch(navigationContextActions.changeSearchTag(searchTag)),
    dispatchDatasetSelected: dataset => dispatch(navigationContextActions.changeDataset(dataset)),
  })

  /** Sorting orders enumeration */
  static SortingOrder = {
    ASCENDING: 'ASC',
    DESCENDING: 'DESC',
  }

  static propTypes = {
    // sub modules rendering
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: React.PropTypes.string, // initial search query, as provided by module configuration
    enableFacettes: React.PropTypes.bool.isRequired, // are facettes enabled
    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: React.PropTypes.string, // facettes query to be added to search query in order to get the facettes
    // Attributes configurations for results columns
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributeModels: React.PropTypes.objectOf(AttributeModel),

    // From map state to props
    viewObjectType: React.PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
    levels: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NavigationLevel)).isRequired,

    dispatchChangeViewObjectType: React.PropTypes.func.isRequired,
    dispatchDatasetSelected: React.PropTypes.func.isRequired,
    dispatchTagSelected: React.PropTypes.func.isRequired,
  }

  /**
   * Default component state (describes all possible state elements)
   */
  static DEFAULT_STATE = {
    viewMode: SearchResultsComponent.ViewModes.LIST,
    // is currently showing facettes
    showingFacettes: false,
    // initial sorting attributes array
    intialSortAttributesPath: [],
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
  onShowListView = () => this.setState({ viewMode: SearchResultsComponent.ViewModes.LIST })

  /**  On show results as table view action  */
  onShowTableView = () => this.setState({ viewMode: SearchResultsComponent.ViewModes.TABLE })

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
    if (attributePath) {
      if (type) {
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

  /**
    * Builds opensearch query from properties and state as parameter
    * @param properties : properties to consider when building query
    * @param state : state to consider when building query
    */
  buildOpenSearchQuery = ({ searchQuery, facettesQuery, levels, viewObjectType },
    { showingFacettes, filters, sortingOn, intialSortAttributesPath }) => {
    // check if facettes should be applied
    const facettes = showingFacettes && viewObjectType === SearchResultsTargetsEnum.DATAOBJECT_RESULTS ? filters : []
    const openSearchQuery = QueriesHelper.getOpenSearchQuery(searchQuery, facettes, NavigationLevel.getQueryParameters(levels))
    // check if user specified or sorting or provide one
    const sorting = (sortingOn && sortingOn.length) || intialSortAttributesPath
    return QueriesHelper.getURLQuery(openSearchQuery, sorting, facettesQuery).toQueryString()
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
          attribute => AttributeModelController.getEntityAttributeAccessPathFromAttFullyQualifiedName(attribute))
    }

    this.updateStateAndQuery(newState, newProperties, true)
  }


  render() {
    const { appName, project, enableFacettes, attributesConf,
      attributesRegroupementsConf, attributeModels, viewObjectType,
      dispatchDatasetSelected, dispatchTagSelected } = this.props
    const { viewMode, showingFacettes, filters, searchTag, searchQuery } = this.state

    // TODO recover sorting
    // TODO recover table area when not filtering
    // TODO : do not provide openSearch query to this component when specifying a datasetid (it is done here now =))
    // TODO others???
    // TODO see all TODO too!!

    // compute view mode
    const showingDataobjects = viewObjectType === SearchResultsTargetsEnum.DATAOBJECT_RESULTS
    // compute child results fetch actions
    const fetchActions = showingDataobjects ? CatalogDataobjectEntityActions : CatalogDatasetEntityActions

    // TODO clean a bit attributes!!!

    return (
      <SearchResultsComponent
        appName={appName}
        project={project}
        allowingFacettes={enableFacettes}

        showingDataobjects={showingDataobjects}
        viewMode={viewMode}
        showingFacettes={showingFacettes}
        filters={filters}
        searchTag={searchTag}
        searchQuery={searchQuery}

        attributesConf={attributesConf}
        attributesRegroupementsConf={attributesRegroupementsConf}
        attributeModels={attributeModels}

        resultPageActions={fetchActions}

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

      />
    )
  }
}
export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps)(SearchResultsContainer)
