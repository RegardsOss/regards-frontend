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
import remove from 'lodash/remove'
import { connect } from '@regardsoss/redux'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { TableSortOrders } from '@regardsoss/components'
import { Tag } from '../../../models/navigation/Tag'
import {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
} from '../../../clients/SearchEntitiesClient'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'
import navigationContextActions from '../../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import QueriesHelper from '../../../definitions/QueriesHelper'
import PluginServicesContainer from './PluginServicesContainer'
import OrderCartContainer from './OrderCartContainer'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'
import styles from '../../../styles/styles'

const moduleStyles = { styles }

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
    // lets user select an entity and set it as a current search tag
    dispatchSetEntityAsTag: ({ content: { entityType, label, ipId } }) => {
      dispatch(navigationContextActions.addSearchTag(new Tag(entityType, label, ipId)))
      dispatch(navigationContextActions.changeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATA))
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
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    displayMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]).isRequired, // Display mode
    // eslint-disable-next-line react/no-unused-prop-types
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)), // only used to build query
    // From map dispatch to props
    dispatchChangeViewObjectType: PropTypes.func.isRequired,
    dispatchChangeDisplayMode: PropTypes.func.isRequired,
    dispatchSetEntityAsTag: PropTypes.func.isRequired,
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
    // runtime qearch query, generated from all query elements known
    fullSearchQuery: null,
    // request actioner depends on entities to search
    searchActions: null,
  }

  componentWillMount = () => this.updateState({}, this.props)

  componentWillReceiveProps = nextProps => this.updateState(this.props, nextProps)

  /** On show datasets */
  onShowDatasets = () => this.props.dispatchChangeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATASET)

  /** On show dataobjects */
  onShowDataobjects = () => this.props.dispatchChangeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATA)

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
   * @return { openSearchQuery, fullSearchQuery, searchActions }: new search state
   */
  buildSearchState = ({ viewObjectType, searchQuery, facettesQuery, levels },
    { showingFacettes, filters, sortingOn, initialSortAttributesPath }) => {
    const showingDataobjects = viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA

    // check if facettes should be applied
    const facettes = showingFacettes && showingDataobjects ? filters : []
    const facettesQueryPart = showingFacettes ? facettesQuery : ''

    let searchActions
    let sorting
    let initialSearchQuery
    const datasetTag = Tag.getSearchedDatasetTag(levels)

    // extract search parameters from level tags (every parameter except the datasets, that may be used specifically into the datasets search)
    const parameters = levels.reduce(
      (acc, levelTag) => levelTag.isDataset() ? acc : [...acc, OpenSearchQuery.buildTagParameter(levelTag.searchKey)], [])

    if (showingDataobjects) {
      // 1 - Data object search : use data object actions, search query and dataset as a Tag on dataobjects
      initialSearchQuery = searchQuery
      searchActions = searchDataobjectsActions
      parameters.push(OpenSearchQuery.buildTagParameter(datasetTag ? datasetTag.searchKey : ''))
      // check if user specified or sorting or provide one (Only available for dataobjects)
      sorting = sortingOn.length ? sortingOn : initialSortAttributesPath
    } else {
      // 2 - Showing datasets: use specific dataset actions to cut down fetch time when possible
      const datasetLevel = Tag.getSearchedDatasetTag(levels)
      if (datasetLevel || parameters.length || !searchQuery) {
        // not restricted or requestable directly onto the datasets
        searchActions = searchDatasetsActions // XXX V2 this will induce a problem because we don't know if we speak about DO or DS tag!!
      } else {
        // restricted, requires to check the dataobjects in order to gather corresponding datasets
        initialSearchQuery = searchQuery
        searchActions = searchDatasetsFromDataObjectsActions
      }
      parameters.push(OpenSearchQuery.buildIpIdParameter(datasetLevel ? datasetLevel.searchKey : ''))
    }
    const openSearchQuery = QueriesHelper.getOpenSearchQuery(initialSearchQuery, facettes, parameters).toQueryString()

    let fullSearchQuery = QueriesHelper.getURLQuery(openSearchQuery, sorting, facettesQueryPart).toQueryString()
    // Add threshold if request is datasets from dataobjects
    if (searchActions === searchDatasetsFromDataObjectsActions) {
      fullSearchQuery = `${fullSearchQuery}&threshold=${STATIC_CONF.CATALOG_SEARCH_THRESHOLD}`
    }

    return {
      searchActions,
      openSearchQuery,
      fullSearchQuery,
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
      appName, project, enableFacettes, attributesConf, viewObjectType, facettesQuery, attributesRegroupementsConf,
      attributeModels, displayDatasets, dispatchSetEntityAsTag, displayMode, datasetAttributesConf,
      searchQuery: initialSearchQuery,
    } = this.props
    const { showingFacettes, filters, openSearchQuery, fullSearchQuery, searchActions, sortingOn } = this.state

    return (
      <ModuleStyleProvider module={moduleStyles}>
        {/* enable the services functionnalities */}
        <PluginServicesContainer
          viewObjectType={viewObjectType}
          initialDatasetIpId={initialSearchQuery}
          openSearchQuery={openSearchQuery}
        >
          {/* enable the order cart link functionnality */}
          <OrderCartContainer
            viewObjectType={viewObjectType}
            initialSearchQuery={initialSearchQuery}
            openSearchQuery={openSearchQuery}
          >
            {/** Render a default search results component with common properties (sub elements will clone it with added properties)*/}
            <SearchResultsComponent
              appName={appName}
              project={project}
              allowingFacettes={enableFacettes && !!facettesQuery}
              displayDatasets={displayDatasets}
              viewObjectType={viewObjectType}
              viewMode={displayMode || DisplayModeEnum.LIST}
              showingFacettes={showingFacettes}
              sortingOn={sortingOn}
              filters={filters}
              searchQuery={fullSearchQuery}
              attributesConf={attributesConf}
              attributesRegroupementsConf={attributesRegroupementsConf}
              datasetAttributesConf={datasetAttributesConf}
              attributeModels={attributeModels}
              resultPageActions={searchActions}

              onFiltersChanged={this.onFiltersChanged}
              onSetEntityAsTag={dispatchSetEntityAsTag}
              onShowDatasets={this.onShowDatasets}
              onShowDataobjects={this.onShowDataobjects}
              onShowListView={this.onShowListView}
              onShowTableView={this.onShowTableView}
              onSortChanged={this.onSortChanged}
              onToggleShowFacettes={this.onToggleShowFacettes}

            />
          </OrderCartContainer>
        </PluginServicesContainer>
      </ModuleStyleProvider>
    )
  }
}
export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps)(SearchResultsContainer)
