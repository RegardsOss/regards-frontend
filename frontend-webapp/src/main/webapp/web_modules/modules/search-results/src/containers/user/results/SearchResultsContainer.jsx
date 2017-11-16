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
import isEqual from 'lodash/isEqual'
import reject from 'lodash/reject'
import { connect } from '@regardsoss/redux'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { StringComparison } from '@regardsoss/form-utils'
import { TableSortOrders } from '@regardsoss/components'
import { Tag } from '../../../models/navigation/Tag'
import {
  searchDataobjectsActions,
  searchDatasetsFromDataObjectsActions,
  searchDatasetsActions,
  selectors as searchSelectors,
} from '../../../clients/SearchEntitiesClient'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'
import { FacetArray } from '../../../models/facets/FacetShape'
import navigationContextActions from '../../../models/navigation/NavigationContextActions'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import QueriesHelper from '../../../definitions/QueriesHelper'
import AttributesPresentationHelper from '../../../definitions/AttributesPresentationHelper'
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
    resultsCount: searchSelectors.getResultsCount(state),
    isFetching: searchSelectors.isFetching(state),
    facets: searchSelectors.getFacets(state),
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
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: PropTypes.string, // initial search query, as provided by module configuration
    enableFacettes: PropTypes.bool.isRequired, // are facettes enabled
    displayDatasets: PropTypes.bool.isRequired, // should display datasets
    // eslint-disable-next-line react/no-unused-prop-types
    facettesQuery: PropTypes.string, // facettes query to be added to search query in order to get the facettes
    // Attributes configurations for results columns
    // eslint-disable-next-line react/no-unused-prop-types
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    // eslint-disable-next-line react/no-unused-prop-types
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    // eslint-disable-next-line react/no-unused-prop-types
    datasetAttributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    // From map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    facets: FacetArray,
    isFetching: PropTypes.bool.isRequired,
    resultsCount: PropTypes.number.isRequired,
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    displayMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]).isRequired, // Display mode
    // eslint-disable-next-line react/no-unused-prop-types
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired, // only used to build query
    // From map dispatch to props
    dispatchChangeViewObjectType: PropTypes.func.isRequired,
    dispatchChangeDisplayMode: PropTypes.func.isRequired,
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
          (AccessDomain.AttributeConfigurationController.getInitialSortAttributes(newProps.attributesConf) || []).map(
            attribute => ({
              attributePath: attribute,
              type: TableSortOrders.ASCENDING_ORDER, // default is ascending
            }),
          )
      }
    }

    // recompute facets when results facets or attribute models changed
    if (!isEqual(oldProps.facets, newProps.facets) || !isEqual(oldProps.attributeModels, newProps.attributeModels)) {
      // Resolve all facets with their label, removing all empty values and facet without values
      const attributeModels = newProps.attributeModels
      newState.facets = (newProps.facets || []).reduce((acc, { attributeName, type, values }) => {
        // Clear empty values, check if the facet should be filtered
        const filteredValues = values.filter(value => value.count)
        if (filteredValues.length < 2) {
          // there is no meaning in a facet with zero or one element (it doesn't facet anything)
          return acc
        }
        // Return resuting facet with label and filtered values
        return [...acc, {
          attributeName,
          label: DamDomain.AttributeModelController.findLabelFromAttributeFullyQualifiedName(attributeName, attributeModels),
          type,
          values: filteredValues,
        }]
      }, []).sort((facet1, facet2) => StringComparison.compare(facet1.label, facet2.label))
    }

    // prepare columns models for search results component, according with configuration, models and view object type
    if (!isEqual(oldProps.attributeModels, newProps.attributeModels) || oldProps.viewObjectType !== newProps.viewObjectType) {
      // re initialize selected facets and hidden columns keys
      newState.filters = []
      newState.hiddenColumnKeys = []

      // build column models that will hold both attribute and dialogs models (sort, visible....)
      // note: we take here in account the fact that hidden columns and sorting orders could have been reset
      switch (newProps.viewObjectType) {
        case DamDomain.ENTITY_TYPES_ENUM.DATASET:
          newState.attributePresentationModels = AttributesPresentationHelper.buildAttributesPresentationModels(newProps.attributeModels, newProps.datasetAttributesConf, [], false)
          break
        case DamDomain.ENTITY_TYPES_ENUM.DATA:
          newState.attributePresentationModels = AttributesPresentationHelper.buildAttributesPresentationModels(newProps.attributeModels, newProps.attributesConf, newProps.attributesRegroupementsConf, true)
          break
        // TODO-V2 @Leo: ici, tu as besoin de ton(tes) propre(s) attributs de config pour les documents (un nouvel onglet dans la configuration du module?)
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
  onShowDatasets = () => this.props.dispatchChangeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATASET)

  /** On show dataobjects */
  onShowDataobjects = () => this.props.dispatchChangeViewObjectType(DamDomain.ENTITY_TYPES_ENUM.DATA)

  /** On show results as list view action */
  onShowListView = () => this.props.dispatchChangeDisplayMode(DisplayModeEnum.LIST)

  /**  On show results as table view action  */
  onShowTableView = () => this.props.dispatchChangeDisplayMode(DisplayModeEnum.TABLE)

  /** User toggled facettes search */
  onToggleShowFacettes = () => this.updateStateAndQuery({ showingFacettes: !this.state.showingFacettes })

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
   * @param type sorting type
   */
  onSortByAttribute = (modelKey, type) => this.updateStateAndQuery({
    // update presentation models to hold the new sorting
    attributePresentationModels: this.state.attributePresentationModels.map((attrModel) => {
      if (attrModel.key === modelKey) { // model identified by its key
        return {
          ...attrModel,
          sortOrder: type,
        }
      }
      return attrModel
    }),
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
  buildSearchState = ({ viewObjectType, searchQuery, facettesQuery, levels },
    { showingFacettes, filters, attributePresentationModels, initialSortAttributesPath }) => { // TODO NO
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
      const sortingOn = attributePresentationModels.reduce((acc, model) => // transform into key / value sorting elements
        model.sortOrder !== TableSortOrders.NO_SORT ? [...acc, { attributePath: model.key, type: model.sortOrder }] : acc, [])
      sorting = sortingOn.length ? sortingOn : initialSortAttributesPath
    } else {
      // 2 - Showing datasets: use specific dataset actions to cut down fetch time when possible
      const datasetLevel = Tag.getSearchedDatasetTag(levels)
      if (datasetLevel || parameters.length || !searchQuery) {
        // not restricted or requestable directly onto the datasets
        searchActions = searchDatasetsActions // FIXME V2 this will induce a problem because we don't know if we speak about DO or DS tag!!
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

  render() {
    const {
      displayDatasets, enableFacettes, isFetching, resultsCount, viewObjectType, displayMode,
      facettesQuery, dispatchSetEntityAsTag, searchQuery: initialSearchQuery,
    } = this.props

    const { attributePresentationModels, hiddenColumnKeys, searchActions, showingFacettes,
      facets, filters, openSearchQuery, fullSearchQuery } = this.state

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
              allowingFacettes={enableFacettes && !!facettesQuery}
              displayDatasets={displayDatasets}

              resultsCount={resultsCount}
              isFetching={isFetching}
              searchActions={searchActions}
              searchSelectors={searchSelectors}

              viewObjectType={viewObjectType}
              viewMode={displayMode || DisplayModeEnum.LIST}

              showingFacettes={showingFacettes}
              facets={facets}
              filters={filters}

              searchQuery={fullSearchQuery}

              hiddenColumnKeys={hiddenColumnKeys}
              attributePresentationModels={attributePresentationModels}

              onChangeColumnsVisibility={this.onChangeColumnsVisibility}
              onDeleteFacet={this.onDeleteFacet}
              onSetEntityAsTag={dispatchSetEntityAsTag}
              onSelectFacet={this.onSelectFacet}
              onShowDatasets={this.onShowDatasets}
              onShowDataobjects={this.onShowDataobjects}
              onShowListView={this.onShowListView}
              onShowTableView={this.onShowTableView}
              onSortByAttribute={this.onSortByAttribute}
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
