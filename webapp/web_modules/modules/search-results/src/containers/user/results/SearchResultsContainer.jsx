/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import reject from 'lodash/reject'
import { connect } from '@regardsoss/redux'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { StringComparison } from '@regardsoss/form-utils'
import { TableSortOrders } from '@regardsoss/components'
import { AuthenticationParametersSelectors, AuthenticationClient } from '@regardsoss/authentication-utils'
import { Tag } from '../../../models/navigation/Tag'
import {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
  searchDocumentsActions,
  selectors as searchSelectors,
} from '../../../clients/SearchEntitiesClient'
import { TableDisplayModeEnum, TableDisplayModeValues } from '../../../models/navigation/TableDisplayModeEnum'
import { FacetArray } from '../../../models/facets/FacetShape'
import navigationContextActions from '../../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import QueriesHelper from '../../../definitions/QueriesHelper'
import AttributesPresentationHelper from '../../../definitions/AttributesPresentationHelper'
import PluginServicesContainer from './PluginServicesContainer'
import OrderCartContainer from './OrderCartContainer'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'
import styles from '../../../styles/styles'
import { DISPLAY_MODE_VALUES } from '../../../definitions/DisplayModeEnum'
import DisplayModuleConf from '../../../models/DisplayModuleConf'

const moduleStyles = { styles }

/**
 * Search results container, drives corresponding component
 * @author Raphaël Mechali
 */
export class SearchResultsContainer extends React.Component {
  static mapStateToProps = state => ({
    accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
    projectName: AuthenticationParametersSelectors.getProject(state),
    resultsCount: searchSelectors.getResultsCount(state),
    isFetching: searchSelectors.isFetching(state),
    facets: searchSelectors.getFacets(state),
    levels: navigationContextSelectors.getLevels(state),
    viewObjectType: navigationContextSelectors.getViewObjectType(state),
    tableDisplayMode: navigationContextSelectors.getDisplayMode(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchChangeViewObjectType: viewObjectType => dispatch(navigationContextActions.changeViewObjectType(viewObjectType)),
    dispatchChangeTableDisplayMode: tableDisplayMode => dispatch(navigationContextActions.changeTableDisplayMode(tableDisplayMode)),
    // lets user select an entity and set it as a current search tag
    dispatchSetEntityAsTag: ({ content: { entityType, label, ipId } }) => {
      dispatch(navigationContextActions.addSearchTag(new Tag(entityType, label, ipId)))
      dispatch(navigationContextActions.changeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATA))
    },
  })

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: PropTypes.string, // initial search query, as provided by module configuration
    enableFacettes: PropTypes.bool.isRequired, // are facettes enabled
    facettesInitiallySelected: PropTypes.bool,
    enableDownload: PropTypes.bool.isRequired, // is download enable directly from the table
    enableQuicklooks: PropTypes.bool.isRequired, // are quicklook available on data items
    displayMode: PropTypes.oneOf(DISPLAY_MODE_VALUES),
    displayConf: DisplayModuleConf,
    restrictedDatasetsIpIds: PropTypes.arrayOf(PropTypes.string),
    // Navigation labels
    datasetsSectionLabel: PropTypes.string,
    dataSectionLabel: PropTypes.string,

    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: PropTypes.string, // facettes query to be added to search query in order to get the facettes
    // Attributes configurations for results columns
    // eslint-disable-next-line react/no-unused-prop-types
    attributesConf: AccessShapes.AttributeConfigurationArray,
    // eslint-disable-next-line react/no-unused-prop-types
    attributesQuicklookConf: AccessShapes.AttributeConfigurationArray,
    // eslint-disable-next-line react/no-unused-prop-types
    attributesRegroupementsConf: AccessShapes.AttributesGroupConfigurationArray,
    // eslint-disable-next-line react/no-unused-prop-types
    datasetAttributesConf: AccessShapes.AttributeConfigurationArray,
    // eslint-disable-next-line react/no-unused-prop-types
    documentAttributesConf: AccessShapes.AttributeConfigurationArray,
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: DataManagementShapes.AttributeModelList,

    // From map state to props
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    facets: FacetArray,
    isFetching: PropTypes.bool.isRequired,
    resultsCount: PropTypes.number.isRequired,
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    tableDisplayMode: PropTypes.oneOf(TableDisplayModeValues).isRequired, // Display mode
    // eslint-disable-next-line react/no-unused-prop-types
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired, // only used to build query

    // From map dispatch to props
    dispatchChangeViewObjectType: PropTypes.func.isRequired,
    dispatchChangeTableDisplayMode: PropTypes.func.isRequired,
    dispatchSetEntityAsTag: PropTypes.func.isRequired,
  }


  /**
   * Default component state (describes all possible state elements)
   */
  static DEFAULT_STATE = {
    // pre-resolved columns models for sub component
    attributePresentationModels: [],
    // Hidden columns management: this is kept separately of models as the presentation adds custom columns
    hiddenColumnKeys: [],
    // is currently showing facettes
    showingFacettes: false,
    // initial sorting attributes array
    initialSortAttributesPath: [],
    // Current sorting attributes array like {attributePath: String, type: (optional) one of 'ASC' / 'DESC'}
    filters: [],
    facets: [],
    // runtime qearch query, generated from all query elements known
    fullSearchQuery: null,
    // request actioner depends on entities to search
    searchActions: null,
    // is currently displaying only data with quicklook
    displayOnlyQuicklook: false,
  }

  /**
   * Constructor, used here to initialize some specific state properties from configuration
   * @param {*} props component properties
   */
  constructor(props) {
    super(props)
    this.state = {
      ...SearchResultsContainer.DEFAULT_STATE,
      showingFacettes: props.facettesInitiallySelected || false,
    }
  }


  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Properties change detected: computes states updates from old to new properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    const newState = {} // Default  state will be recovered by updateStateAndQuery

    //  initial sort attributes (used while the user hasn't set any sortedColumns)
    if (oldProps.viewObjectType !== newProps.viewObjectType ||
      oldProps.attributesConf !== newProps.attributesConf) {
      if (newProps.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATASET) {
        newState.initialSortAttributesPath = [] // no initial sorting for datasets
      } else {
        // Data: resolve some initial sorting
        newState.initialSortAttributesPath =
          (AccessDomain.AttributeConfigurationController.getInitialSortAttributes(newProps.attributesConf) || []).map(attribute => ({
            attributePath: attribute,
            type: TableSortOrders.ASCENDING_ORDER, // default is ascending
          }))
      }
    }

    // recompute facets when results facets or attribute models changed
    if (!isEqual(oldProps.facets, newProps.facets) || !isEqual(oldProps.attributeModels, newProps.attributeModels)) {
      // Resolve all facets with their label, removing all empty values and facet without values
      const { attributeModels } = newProps
      newState.facets = (newProps.facets || []).reduce((acc, facet) => {
        const { attributeName, values } = facet
        // Clear empty values, check if the facet should be filtered
        const filteredValues = values.filter(value => value.count)
        if (filteredValues.length < 2) {
          // there is no meaning in a facet with zero or one element (it doesn't facet anything)
          return acc
        }
        // Return resulting facet with label and filtered values
        return [...acc, {
          ...facet,
          label: DamDomain.AttributeModelController.findLabelFromAttributeFullyQualifiedName(attributeName, attributeModels),
          values: filteredValues,
        }]
      }, []).sort((facet1, facet2) => StringComparison.compare(facet1.label, facet2.label))
    }

    // prepare columns models for search results component, according with configuration, models and view object type
    if (!isEqual(oldProps.attributeModels, newProps.attributeModels) || oldProps.viewObjectType !== newProps.viewObjectType ||
      oldProps.tableDisplayMode !== newProps.tableDisplayMode) {
      // re initialize selected facets and hidden columns keys
      newState.filters = SearchResultsContainer.DEFAULT_STATE.filters
      newState.hiddenColumnKeys = SearchResultsContainer.DEFAULT_STATE.hiddenColumnKeys

      // build column models that will hold both attribute and dialogs models (sort, visible....)
      // note: we take here in account the fact that hidden columns and sorting orders could have been reset
      switch (newProps.viewObjectType) {
        case DamDomain.ENTITY_TYPES_ENUM.DATASET:
          newState.attributePresentationModels = AttributesPresentationHelper.buildAttributesPresentationModels(newProps.attributeModels, newProps.datasetAttributesConf, [], false)
          newState.displayOnlyQuicklook = false
          break
        case DamDomain.ENTITY_TYPES_ENUM.DATA:
          if (newProps.tableDisplayMode !== TableDisplayModeEnum.QUICKLOOK) {
            newState.attributePresentationModels = AttributesPresentationHelper.buildAttributesPresentationModels(newProps.attributeModels, newProps.attributesConf, newProps.attributesRegroupementsConf, true)
            // Remove in the query the onlyQuicklook as we are not displaying quicklook anymore
            newState.displayOnlyQuicklook = false
          } else {
            newState.attributePresentationModels = AttributesPresentationHelper.buildAttributesPresentationModels(newProps.attributeModels, newProps.attributesQuicklookConf, newProps.attributesRegroupementsConf, true)
            // Automatically enable displayOnlyQuicklook on first display
            if (oldProps.tableDisplayMode !== newProps.tableDisplayMode) {
              newState.displayOnlyQuicklook = true
            }
          }
          break
        case DamDomain.ENTITY_TYPES_ENUM.DOCUMENT:
          newState.attributePresentationModels = AttributesPresentationHelper.buildAttributesPresentationModels(newProps.attributeModels, newProps.documentAttributesConf, [], false)
          newState.displayOnlyQuicklook = false
          break
        default:
          throw new Error('Unhandled object type ', newProps.viewObjectType)
      }
    } else if (oldProps.viewMode !== newProps.viewMode) {
      // facets unchanged, re initialize hidden columns keys
      newState.hiddenColumnKeys = []
    }

    this.updateStateAndQuery(newState, newProps, true)
  }


  /** On show datasets */
  onShowDatasets = () => {
    this.props.dispatchChangeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATASET)
    if (this.props.tableDisplayMode === TableDisplayModeEnum.QUICKLOOK) {
      this.props.dispatchChangeTableDisplayMode(TableDisplayModeEnum.LIST)
    }
  }

  /** On show dataobjects */
  onShowDataobjects = () => this.props.dispatchChangeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATA)

  /** On show results as list view action */
  onShowListView = () => this.props.dispatchChangeTableDisplayMode(TableDisplayModeEnum.LIST)

  /**  On show results as table view action  */
  onShowTableView = () => this.props.dispatchChangeTableDisplayMode(TableDisplayModeEnum.TABLE)

  /**  On show results as quicklook view action  */
  onShowQuicklookView = () => {
    this.props.dispatchChangeTableDisplayMode(TableDisplayModeEnum.QUICKLOOK)
  }

  /** User toggled facettes search */
  onToggleShowFacettes = () => this.updateStateAndQuery({ showingFacettes: !this.state.showingFacettes })

  /** User toggled filter that display only object having quicklook */
  onToggleDisplayOnlyQuicklook = () => this.updateStateAndQuery({ displayOnlyQuicklook: !this.state.displayOnlyQuicklook })

  /**
   * On user selected a facet
   * @param filterKey key to add
   * @param filterLabel filter label
   * @param openSearchQuery corresponding query
   */
  onSelectFacet = (filterKey, filterLabel, openSearchQuery) => this.updateStateAndQuery({
    // remove facet if previously shown, then add it back at end
    filters: [
      ...this.getFiltersWithout(filterKey), // remove previous filter for the same key, if any
      { filterKey, filterLabel, openSearchQuery },
    ],
  })

  /**
   * User deleted a selected filter
   */
  onDeleteFacet = filter => this.updateStateAndQuery({
    filters: this.getFiltersWithout(filter.filterKey),
  })

  /**
   * Columns management (provided to avoid stateful children, despite it is mainly a graphic attribute)
   * @param {TableColumnConfiguration} editedColumns table columns with visibility attribute edited
   */
  onChangeColumnsVisibility = (editedColumns) => {
    const previousHiddenKeys = this.state.hiddenColumnKeys
    const hiddenColumnKeys = editedColumns.reduce((acc, { key, visible }) => visible ? acc : [...acc, key], [])
    if (!isEqual(previousHiddenKeys, hiddenColumnKeys)) {
      this.setState({ hiddenColumnKeys })
    }
  }

  /**
   * User changed sorting : update attributes presentation models
   * @param modelKey model key
   * @param newSortOrder new sort order
   */
  onSortByAttribute = (modelKey, newSortOrder) =>
    this.updateStateAndQuery({
      // note: in list mode, we remove other sorting columns
      attributePresentationModels: AttributesPresentationHelper.changeSortOrder(
        this.state.attributePresentationModels, modelKey, newSortOrder,
        // multisorting is, so far, enabled only for table view
        this.props.tableDisplayMode !== TableDisplayModeEnum.TABLE),
    })

  /**
   * Returns filters from state without key as parameter.
   * Note: lodash MODIFIES the array, so we need to clone it here
   * @param {string} filterKey filter key
   * @returns filters without key as parameter
   */
  getFiltersWithout = filterKey => reject(this.state.filters, { filterKey })

  /**
   * Builds opensearch query from properties and state as parameter
   * @param properties : properties to consider when building query
   * @param state : state to consider when building query
   * @return { openSearchQuery, fullSearchQuery, searchActions }: new search state
   */
  buildSearchState = (
    {
      viewObjectType, searchQuery, facettesQuery, levels,
    },
    {
      showingFacettes, filters, attributePresentationModels, initialSortAttributesPath, displayOnlyQuicklook,
    },
  ) => {
    const showingDataobjects = viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA
    const showingDocuments = viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DOCUMENT

    // check if facettes should be applied
    const facettes = (showingFacettes && showingDataobjects) || showingDocuments ? filters : []
    const facettesQueryPart = showingFacettes || showingDocuments ? facettesQuery : ''

    let searchActions
    let sorting
    let initialSearchQuery
    let quicklookQuery = ''
    const datasetTag = Tag.getSearchedDatasetTag(levels)

    // extract search parameters from level tags (every parameter except the datasets, that may be used specifically into the datasets search)
    const parameters = levels.reduce((acc, levelTag) => levelTag.isDataset() ? acc : [...acc, OpenSearchQuery.buildTagParameter(levelTag.searchKey)], [])
    if (viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA) {
      // 1 - Data object search : use data object actions, search query, dataset as a Tag on dataobjects
      // and quicklooks filter if enabled
      initialSearchQuery = searchQuery
      searchActions = searchDataobjectsActions
      parameters.push(OpenSearchQuery.buildTagParameter(datasetTag ? datasetTag.searchKey : ''))
      // check if user specified or sorting or provide one (Only available for dataobjects)
      const sortingOn = AttributesPresentationHelper.getSortingOn(attributePresentationModels)
      sorting = sortingOn.length ? sortingOn : initialSortAttributesPath
      // check user is currently showing only quicklook pictures
      if (displayOnlyQuicklook) {
        quicklookQuery = 'exists=files.QUICKLOOK_SD'
      }
    } else if (viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATASET) {
      // 2 - Showing datasets: use specific dataset actions to cut down fetch time when possible
      const datasetLevel = Tag.getSearchedDatasetTag(levels)
      if (datasetLevel || parameters.length || !searchQuery) {
        // not restricted or requestable directly onto the datasets
        searchActions = searchDatasetsActions // FIXME V3 this will induce a problem because we don't know if we speak about DO or DS tag!!
      } else {
        // restricted, requires to check the dataobjects in order to gather corresponding datasets
        initialSearchQuery = searchQuery
        searchActions = searchDatasetsFromDataObjectsActions
      }
      parameters.push(OpenSearchQuery.buildIpIdParameter(datasetLevel ? datasetLevel.searchKey : ''))
    } else {
      // 3 - Showing documents
      searchActions = searchDocumentsActions
    }
    const openSearchQuery = QueriesHelper.getOpenSearchQuery(initialSearchQuery, facettes, parameters).toQueryString()

    let fullSearchQuery = QueriesHelper.getURLQuery(openSearchQuery, sorting, facettesQueryPart, quicklookQuery).toQueryString()
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
    const currentState = isEmpty(this.state) ? SearchResultsContainer.DEFAULT_STATE : this.state
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

  render() {
    const {
      displayMode, enableFacettes, isFetching, resultsCount, viewObjectType, tableDisplayMode, enableDownload,
      enableQuicklooks, facettesQuery, dispatchSetEntityAsTag, datasetsSectionLabel, dataSectionLabel,
      searchQuery: initialSearchQuery, restrictedDatasetsIpIds, displayConf, accessToken, projectName,
    } = this.props

    const {
      attributePresentationModels, hiddenColumnKeys, searchActions, showingFacettes,
      facets, filters, openSearchQuery, fullSearchQuery, displayOnlyQuicklook,
    } = this.state
    const tableViewMode = tableDisplayMode || TableDisplayModeEnum.LIST

    return (
      <ModuleStyleProvider module={moduleStyles}>
        {/* enable the services functionnalities */}
        <PluginServicesContainer
          viewObjectType={viewObjectType}
          restrictedDatasetsIpIds={restrictedDatasetsIpIds}
          openSearchQuery={openSearchQuery}
        >
          {/* enable the order cart link functionnality */}
          <OrderCartContainer
            viewObjectType={viewObjectType}
            initialSearchQuery={initialSearchQuery}
            openSearchQuery={openSearchQuery}
            tableViewMode={tableViewMode}
          >
            {/** Render a default search results component with common properties (sub elements will clone it with added properties)*/}
            <SearchResultsComponent
              enableDownload={enableDownload}
              enableQuicklooks={enableQuicklooks}
              allowingFacettes={enableFacettes && !!facettesQuery}
              displayMode={displayMode}
              displayConf={displayConf}

              datasetsSectionLabel={datasetsSectionLabel}
              dataSectionLabel={dataSectionLabel}

              resultsCount={resultsCount}
              isFetching={isFetching}
              searchActions={searchActions}
              searchSelectors={searchSelectors}

              viewObjectType={viewObjectType}
              tableViewMode={tableViewMode}

              displayOnlyQuicklook={displayOnlyQuicklook}

              showingFacettes={showingFacettes}
              facets={facets}
              filters={filters}

              searchQuery={fullSearchQuery}

              hiddenColumnKeys={hiddenColumnKeys}
              attributePresentationModels={attributePresentationModels}
              accessToken={accessToken}
              projectName={projectName}

              onChangeColumnsVisibility={this.onChangeColumnsVisibility}
              onDeleteFacet={this.onDeleteFacet}
              onSetEntityAsTag={dispatchSetEntityAsTag}
              onSelectFacet={this.onSelectFacet}
              onShowDatasets={this.onShowDatasets}
              onShowDataobjects={this.onShowDataobjects}
              onShowListView={this.onShowListView}
              onShowTableView={this.onShowTableView}
              onShowQuicklookView={this.onShowQuicklookView}
              onSortByAttribute={this.onSortByAttribute}
              onToggleShowFacettes={this.onToggleShowFacettes}
              onToggleDisplayOnlyQuicklook={this.onToggleDisplayOnlyQuicklook}
            />
          </OrderCartContainer>
        </PluginServicesContainer>
      </ModuleStyleProvider>
    )
  }
}
export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps,
)(SearchResultsContainer)
