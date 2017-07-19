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
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import remove from 'lodash/remove'

import { connect } from '@regardsoss/redux'
import { AccessDomain, CatalogDomain } from '@regardsoss/domain'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { TableSortOrders } from '@regardsoss/components'
import {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
} from '../../../clients/SearchEntitiesClient'
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'
import navigationContextActions from '../../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import QueriesHelper from '../../../definitions/QueriesHelper'
import PluginServicesContainer from './PluginServicesContainer'

/**
 * Search results container, drives corresponding component
 * @author Raphaël Mechali
 */
export class SearchResultsContainer extends React.Component {

  static mapStateToProps = state => ({
    levels: navigationContextSelectors.getLevels(state),
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
    displayMode: navigationContextSelectors.getDisplayMode(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchChangeViewObjectType: viewObjectType => dispatch(navigationContextActions.changeViewObjectType(viewObjectType)),
    dispatchChangeDisplayMode: displayMode => dispatch(navigationContextActions.changeDisplayMode(displayMode)),
    dispatchTagSelected: searchTag => dispatch(navigationContextActions.changeSearchTag(searchTag)),
    dispatchDatasetSelected: (dataset) => {
      dispatch(navigationContextActions.changeDataset(dataset))
      dispatch(navigationContextActions.changeViewObjectType(CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS))
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
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    datasetAttributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributeModels: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    // From map state to props
    viewObjectType: PropTypes.oneOf(values(CatalogDomain.SearchResultsTargetsEnum)).isRequired, // current view object type
    displayMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]).isRequired, // Display mode
    levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired, // only used to build query
    // From map dispatch to props
    dispatchChangeViewObjectType: PropTypes.func.isRequired,
    dispatchChangeDisplayMode: PropTypes.func.isRequired,
    dispatchDatasetSelected: PropTypes.func.isRequired,
    dispatchTagSelected: PropTypes.func.isRequired,
  }

  /**
   * Default component state (describes all possible state elements)
   */
  static DEFAULT_STATE = {
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
    // request actioner depends on entities to search
    searchActions: null,
  }

  componentWillMount = () => this.updateState({}, this.props)

  componentWillReceiveProps = nextProps => this.updateState(this.props, nextProps)

  /** On show datasets */
  onShowDatasets = () => this.props.dispatchChangeViewObjectType(CatalogDomain.SearchResultsTargetsEnum.DATASET_RESULTS)

  /** On show dataobjects */
  onShowDataobjects = () => this.props.dispatchChangeViewObjectType(CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS)

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

  /**
   * Builds opensearch query from properties and state as parameter
   * @param properties : properties to consider when building query
   * @param state : state to consider when building query
   * @return { searchQuery, searchActions }: new searc state
   */
  buildSearchState = ({ viewObjectType, searchQuery, facettesQuery, levels },
    { showingFacettes, filters, sortingOn, initialSortAttributesPath }) => {
    const showingDataobjects = viewObjectType === CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS

    // check if facettes should be applied
    const facettes = showingFacettes && viewObjectType === CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS ? filters : []
    const facettesQueryPart = showingFacettes ? facettesQuery : ''

    const datasetLevel = find(levels, { levelType: NavigationLevel.LevelTypes.DATASET })
    const tagLevel = find(levels, { levelType: NavigationLevel.LevelTypes.SEARCH_TAG })

    let searchActions
    let sorting
    let initialSearchQuery
    const parameters = [
      // restrict to given tag?
      OpenSearchQuery.buildTagParameter(tagLevel ? tagLevel.levelValue : ''), // common tag parameter
    ]
    if (showingDataobjects) {
      initialSearchQuery = searchQuery
      // using dataobject actions
      searchActions = searchDataobjectsActions
      // restrict to given dataset tag?
      parameters.push(OpenSearchQuery.buildTagParameter(datasetLevel ? datasetLevel.levelValue : ''))
      // check if user specified or sorting or provide one (Only available for dataobjects)
      sorting = sortingOn.length ? sortingOn : initialSortAttributesPath
    } else {
      if (datasetLevel || tagLevel || !searchQuery) {
        // we bypass the default query
        searchActions = searchDatasetsActions
      } else {
        initialSearchQuery = searchQuery
        searchActions = searchDatasetsFromDataObjectsActions
      }
      parameters.push(OpenSearchQuery.buildIpIdParameter(datasetLevel ? datasetLevel.levelValue : ''))
    }
    const openSearchQuery = QueriesHelper.getOpenSearchQuery(initialSearchQuery, facettes, parameters)

    let urlQuery = QueriesHelper.getURLQuery(openSearchQuery, sorting, facettesQueryPart).toQueryString()
    // Add threshold if request is datasets from dataobjects
    if (searchActions === searchDatasetsFromDataObjectsActions) {
      urlQuery = `${urlQuery}&threshold=${STATIC_CONF.CATALOG_SEARCH_THRESHOLD}`
    }

    return {
      searchActions,
      searchQuery: urlQuery,
    }
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
      ...this.buildSearchState(properties, { ...currentState, ...newState }),
    }

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
      newState.initialSortAttributesPath =
        (AccessDomain.AttributeConfigurationController.getInitialSortAttributes(newProperties.attributesConf) || []).map(
          attribute => ({
            attributePath: attribute,
            type: TableSortOrders.ASCENDING_ORDER, // default is ascending
          }),
        )
    }

    this.updateStateAndQuery(newState, newProperties, true)
  }

  render() {
    const {
      appName, project, enableFacettes, attributesConf, viewObjectType, facettesQuery, attributesRegroupementsConf, levels,
      attributeModels, displayDatasets, dispatchDatasetSelected, dispatchTagSelected, displayMode, datasetAttributesConf,
    } = this.props
    const { showingFacettes, filters, searchTag, searchQuery, searchActions, sortingOn } = this.state

    // compute view mode
    const showingDataobjects = viewObjectType === CatalogDomain.SearchResultsTargetsEnum.DATAOBJECT_RESULTS

    return (
      <PluginServicesContainer
        // plugin service exlusive properties
        viewObjectType={viewObjectType}
        levels={levels}

        // common properties
        searchQuery={searchQuery}

        // search results display properties
        appName={appName}
        project={project}
        allowingFacettes={enableFacettes && !!facettesQuery}
        viewMode={displayMode || DisplayModeEnum.LIST}
        showingFacettes={showingFacettes}
        displayDatasets={displayDatasets}
        sortingOn={sortingOn}
        filters={filters}
        searchTag={searchTag}
        attributesConf={attributesConf}
        attributesRegroupementsConf={attributesRegroupementsConf}
        datasetAttributesConf={datasetAttributesConf}
        attributeModels={attributeModels}
        resultPageActions={searchActions}
        showingDataobjects={showingDataobjects}

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
