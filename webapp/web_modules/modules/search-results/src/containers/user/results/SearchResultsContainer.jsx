/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { DataManagementShapes, CatalogShapes } from '@regardsoss/shape'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AuthenticationParametersSelectors, AuthenticationClient } from '@regardsoss/authentication-utils'
import { DescriptionProviderContainer } from '@regardsoss/entities-common'
import { Tag } from '../../../models/navigation/Tag'
import {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
  searchDocumentsActions,
  selectors as searchSelectors,
} from '../../../clients/SearchEntitiesClient'
import { TableDisplayModeEnum, TableDisplayModeValues } from '../../../models/navigation/TableDisplayModeEnum'
import navigationContextActions from '../../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import QueriesHelper from '../../../definitions/QueriesHelper'
import { buildAttributesPresentationModels, changeSortOrder, getSortingOn, getInitialSorting } from '../../../definitions/AttributesPresentationHelper'
import PluginServicesContainer from './PluginServicesContainer'
import OrderCartContainer from './OrderCartContainer'
import SearchResultsComponent from '../../../components/user/results/SearchResultsComponent'
import styles from '../../../styles/styles'
import { DISPLAY_MODE_VALUES } from '../../../definitions/DisplayModeEnum'
import { DataViewShape, QuicklookViewShape, DatasetViewShape, DocumentViewShape } from '../../../models/ModuleConfiguration'
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
    // allows user selecting an entity and set it as a current search tag in results table
    dispatchSetEntityAsTag: ({ content: { entityType, label, id } }) => {
      dispatch(navigationContextActions.addSearchTag(new Tag(entityType, label, id)))
      dispatch(navigationContextActions.changeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATA))
    },
    // allows user selecting an entity and add it in current search context tags in description window
    dispatchAddSearchTag: tag => dispatch(navigationContextActions.addSearchTag(tag)),
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
    restrictedDatasetsIds: PropTypes.arrayOf(PropTypes.string),
    // Navigation labels
    datasetsSectionLabel: PropTypes.string,
    dataSectionLabel: PropTypes.string,

    // views configurations (used only in onPropertiesChanged)
    // eslint-disable-next-line react/no-unused-prop-types
    data: DataViewShape,
    // eslint-disable-next-line react/no-unused-prop-types
    quicklook: QuicklookViewShape,
    // eslint-disable-next-line react/no-unused-prop-types
    dataset: DatasetViewShape,
    // eslint-disable-next-line react/no-unused-prop-types
    document: DocumentViewShape,

    // server attributes model
    attributeModels: DataManagementShapes.AttributeModelList,

    // From map state to props
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    facets: CatalogShapes.FacetArray, // facets as provided by the backend
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
    dispatchAddSearchTag: PropTypes.func.isRequired,
  }

  /**
   * Selects the applying view configuration for current view object type
   * @param {*} props properties to consider (holds view and table mode)
   * @return view configuration in current view mode, with granted configuration fields (if they were forgotten in form configuration)
   */
  static getViewConfiguration({
    viewObjectType, tableDisplayMode, data, quicklook, dataset, document,
  }) {
    let configuration = null
    switch (viewObjectType) {
      case DamDomain.ENTITY_TYPES_ENUM.DATA:
        configuration = tableDisplayMode === TableDisplayModeEnum.QUICKLOOK ? quicklook : data
        break
      case DamDomain.ENTITY_TYPES_ENUM.DATASET:
        configuration = dataset
        break
      case DamDomain.ENTITY_TYPES_ENUM.DOCUMENT:
        configuration = document
        break
      default:
        throw new Error('Unknown view object type', viewObjectType)
    }
    return {
      columns: [],
      facets: [],
      sorting: [],
      ...configuration,
    }
  }

  /**
   * @param {string} viewObjectType  view object type from ENTITY_TYPES_ENUM
   * @return {boolean} true when sorting is allowed, false otherwise
   */
  static isSortingAllowed(viewObjectType) {
    switch (viewObjectType) {
      case DamDomain.ENTITY_TYPES_ENUM.DATA:
      case DamDomain.ENTITY_TYPES_ENUM.DOCUMENT:
        return true
      case DamDomain.ENTITY_TYPES_ENUM.DATASET:
      default:
        return false
    }
  }

  /**
   * @param {string} viewObjectType  view object type from ENTITY_TYPES_ENUM
   * @return {boolean} true when selectection is allowed, false otherwise
   */
  static isSelectionAllowed(viewObjectType) {
    switch (viewObjectType) {
      case DamDomain.ENTITY_TYPES_ENUM.DATA:
        return true
      default:
        return false
    }
  }

  /**
   * Builds facets models from results facets list, current configuration and current attribute models
   * @param {[{*}]} resultsFacets results facets
   * @param {[{*}]} configuredFacets configured facets
   * @param {*} attributeModels current attribute models list (or map)
   * @return facets list
   */
  static buildFacetModels(resultsFacets = [], configuredFacets = [], attributeModels = {}) {
    // build the facet list in the order configured for view
    return configuredFacets.reduce((acc, { label, attributes: [{ name }] }) => {
      // check if corresponding facet is present in results, has enough values and a valid attribute model
      const correspondingResultFacet = resultsFacets.find(({ attributeName }) => attributeName === name)
      if (correspondingResultFacet) {
        const filteredFacetValues = correspondingResultFacet.values.filter(value => value.count)
        if (filteredFacetValues.length >= 2) {
          const attrModel = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributeModels)
          if (attrModel) { // that facet can be displayed to user
            return [
              ...acc, { // return facet plus required presentation attributes
                label,
                unit: attrModel.content.unit,
                model: { // facet model
                  ...correspondingResultFacet,
                  values: filteredFacetValues,
                },
              },
            ]
          }
        }
      }
      return acc // facet will not be displayed to user, because it has either to few values or no valid model
    }, [])
  }

  /**
   * Removes a selected facet by its attribute model name
   * @param [UIFacet] selectedFacets selected UI facets list
   * @param {string} removeAttrName facet to remove, by its attribute model name
   * @returns [UIFacet] new selected UI facets list without key as parameter
   */
  static removeSelectedFacetIn(selectedFacets = [], removeAttrName = '') {
    return selectedFacets.filter(({ model }) => model.attributeName !== removeAttrName)
  }

  /**
   * Default component state (describes all possible state elements)
   */
  static DEFAULT_STATE = {
    // pre-resolved columns models for sub component
    presentationModels: [],
    // is currently showing facettes
    showingFacettes: false,
    // Current sorting attributes array like {attributePath: String, type: (optional) one of 'ASC' / 'DESC'}
    selectedFacets: [],
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
    const { attributeModels, viewObjectType, tableDisplayMode } = newProps
    const attributeModelsChanged = !isEqual(oldProps.attributeModels, newProps.attributeModels)
    const newViewConfiguration = SearchResultsContainer.getViewConfiguration(newProps)

    // 1 - recompute facets when results facets or attribute models changed
    if (attributeModelsChanged || !isEqual(oldProps.facets, newProps.facets)) {
      // Resolve all facets with their label, removing all empty values and facet without values
      newState.facets = SearchResultsContainer.buildFacetModels(newProps.facets, newViewConfiguration.facets, attributeModels)
    }

    const viewObjectChanged = oldProps.viewObjectType !== viewObjectType
    const tableModeChanged = oldProps.tableDisplayMode !== tableDisplayMode
    // 2 - re initialize selected facets when it view objects type changes
    if (attributeModelsChanged || viewObjectChanged) {
      newState.selectedFacets = SearchResultsContainer.DEFAULT_STATE.selectedFacets
    }
    // 3 - recompute columns when either attributes, view object type of table view mode changes
    if (attributeModelsChanged || viewObjectChanged || tableModeChanged) {
      newState.presentationModels = buildAttributesPresentationModels(attributeModels,
        newViewConfiguration.columns, newViewConfiguration.sorting,
        SearchResultsContainer.isSortingAllowed(viewObjectType),
        SearchResultsContainer.isSelectionAllowed(viewObjectType))
      // 3.c reinitialize the ONLY quicklook filter state when user changes view parametersenters or exits quicklook mode
      newState.displayOnlyQuicklook = tableDisplayMode === TableDisplayModeEnum.QUICKLOOK
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
   * On user search tag callback (used by description window) - packs the new tag into a Tag model and then dispatches action
   * @param descriptionTag description tag, as callback from tag selection in description component
   */
  onDescriptionSearch = (descriptionTag) => {
    const { dispatchAddSearchTag } = this.props
    dispatchAddSearchTag(Tag.fromDescriptionTag(descriptionTag))
  }

  /**
   * User callback: facet selected
   * @param selectedFacet to select
   * @param selectedValue value selected in facet
   */
  onSelectFacet = (selectedFacet, selectedValue) => this.updateStateAndQuery({
    selectedFacets: [
      // remove previously selected facet for the same key, if any
      ...SearchResultsContainer.removeSelectedFacetIn(this.state.selectedFacets, selectedFacet.model.attributeName),
      {
        ...selectedFacet, // report UI facet fields
        value: selectedValue,
      },
    ],
  })

  /**
   * User callback: a selected facet was unselected
   * @param {key: string} selectedFacet to unselect
   */
  onUnselectFacet = selectedFacet => this.updateStateAndQuery({
    selectedFacets: SearchResultsContainer.removeSelectedFacetIn(this.state.selectedFacets, selectedFacet.model.attributeName),
  })

  /**
   * Callback: columns order or visibility was updated
   * @param {TableColumnConfiguration} presentationModels edited columns models with
   */
  onConfigureColumns = (presentationModels) => {
    this.updateStateAndQuery({ presentationModels })
  }

  /** Callback: column models reset requested by user (resets to admin settings) */
  onResetColumns = () => {
    const { attributeModels, viewObjectType } = this.props
    const viewConfiguration = SearchResultsContainer.getViewConfiguration(this.props)
    this.updateStateAndQuery({
      // rebuild columns from configuration
      presentationModels: buildAttributesPresentationModels(attributeModels,
        viewConfiguration.columns, viewConfiguration.sorting,
        SearchResultsContainer.isSortingAllowed(viewObjectType),
        SearchResultsContainer.isSelectionAllowed(viewObjectType)),
    })
  }

  /**
   * User changed sorting : update attributes presentation models
   * @param modelKey model key
   * @param newSortOrder new sort order
   */
  onSortByAttribute = (modelKey, newSortOrder) =>
    this.updateStateAndQuery({
      // note: in list mode, we remove other sorting columns
      presentationModels: changeSortOrder(
        this.state.presentationModels, modelKey, newSortOrder,
        // multisorting is, so far, enabled only for table view
        this.props.tableDisplayMode !== TableDisplayModeEnum.TABLE),
    })

  /**
   * Builds opensearch query from properties and state as parameter
   * @param properties : properties to consider when building query
   * @param state : state to consider when building query
   * @return { openSearchQuery, fullSearchQuery, searchActions }: new search state
   */
  buildSearchState = (properties, {
    showingFacettes, selectedFacets, presentationModels, displayOnlyQuicklook,
  },
  ) => {
    const { viewObjectType, searchQuery, levels } = properties
    const viewConfiguration = SearchResultsContainer.getViewConfiguration(properties)
    // 1 - compute facets to request and apply (only when they are enabled or working with documents - always enabled)
    const facetsCurrentlyEnabled = (showingFacettes || viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DOCUMENT) &&
      viewConfiguration.facets && viewConfiguration.facets.length
    const requestedFacets = facetsCurrentlyEnabled ? viewConfiguration.facets : []
    const appliedFacetValues = facetsCurrentlyEnabled ? selectedFacets : []

    // 2 - compute sorting to apply
    const sortingOn = getSortingOn(presentationModels)
    const requestedSortingAttributes = sortingOn.length ? sortingOn : getInitialSorting(viewConfiguration.sorting)

    // 3 - compute request to perform on backend
    let searchActions
    let initialSearchQuery
    let quicklookQuery = ''
    const datasetTag = Tag.getSearchedDatasetTag(levels)

    // extract search parameters from level tags (every parameter except the datasets, that may be used specifically into the datasets search)
    const parameters = levels.reduce((acc, levelTag) => levelTag.isDataset() ?
      acc : [...acc, OpenSearchQuery.buildTagParameter(levelTag.searchKey)], [])
    if (viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA) {
      // 1 - Data object search : use data object actions, search query, dataset as a Tag on dataobjects
      // and quicklooks filter if enabled
      initialSearchQuery = searchQuery
      searchActions = searchDataobjectsActions
      parameters.push(OpenSearchQuery.buildTagParameter(datasetTag ? datasetTag.searchKey : ''))
      // check user is currently showing only quicklook pictures
      if (displayOnlyQuicklook) {
        quicklookQuery = 'exists=files.QUICKLOOK_SD'
      }
    } else if (viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATASET) {
      // 2 - Showing datasets: use specific dataset actions to cut down fetch time when possible
      const datasetLevel = Tag.getSearchedDatasetTag(levels)
      if (datasetLevel || parameters.length || !searchQuery) {
        // not restricted or requestable directly onto the datasets
        searchActions = searchDatasetsActions // FIXME-V3 this will induce a problem because we don't know if we speak about DO or DS tag!!
      } else {
        // restricted, requires to check the dataobjects in order to gather corresponding datasets
        initialSearchQuery = searchQuery
        searchActions = searchDatasetsFromDataObjectsActions
      }
      parameters.push(OpenSearchQuery.buildIDParameter(datasetLevel ? datasetLevel.searchKey : ''))
    } else {
      // 3 - Showing documents
      searchActions = searchDocumentsActions
    }
    const openSearchQuery = QueriesHelper.getOpenSearchQuery(initialSearchQuery, appliedFacetValues, parameters).toQueryString()
    const fullSearchQuery = QueriesHelper.getURLQuery(openSearchQuery, requestedSortingAttributes, requestedFacets, quicklookQuery).toQueryString()

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

  /**
   * @return {bool} true when current view mode has available facettes: current view configuration has a valid facettes definition
   */
  hasFacettes = () => SearchResultsContainer.getViewConfiguration(this.props).facets.length > 0

  render() {
    const {
      displayMode, enableFacettes, isFetching, resultsCount, viewObjectType, tableDisplayMode,
      enableDownload, enableQuicklooks, datasetsSectionLabel, dataSectionLabel,
      searchQuery: initialSearchQuery, restrictedDatasetsIds, displayConf, accessToken,
      projectName, dispatchSetEntityAsTag,
    } = this.props

    const {
      presentationModels, searchActions, showingFacettes,
      facets, selectedFacets, openSearchQuery, fullSearchQuery, displayOnlyQuicklook,
    } = this.state
    const tableViewMode = tableDisplayMode || TableDisplayModeEnum.LIST

    return (
      <ModuleStyleProvider module={moduleStyles}>
        {/* Enable entities description management */}
        <DescriptionProviderContainer onSearchTag={this.onDescriptionSearch} >
          {/* enable the services functionnalities */}
          <PluginServicesContainer
            viewObjectType={viewObjectType}
            restrictedDatasetsIds={restrictedDatasetsIds}
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
                allowingFacettes={enableFacettes && this.hasFacettes()}
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
                selectedFacets={selectedFacets}

                searchQuery={fullSearchQuery}

                presentationModels={presentationModels}
                accessToken={accessToken}
                projectName={projectName}

                onConfigureColumns={this.onConfigureColumns}
                onResetColumns={this.onResetColumns}
                onSetEntityAsTag={dispatchSetEntityAsTag}
                onSelectFacet={this.onSelectFacet}
                onUnselectFacet={this.onUnselectFacet}
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
        </DescriptionProviderContainer>
      </ModuleStyleProvider >
    )
  }
}
export default connect(
  SearchResultsContainer.mapStateToProps,
  SearchResultsContainer.mapDispatchToProps,
)(SearchResultsContainer)
