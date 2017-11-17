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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PageableInfiniteTableContainer, TableLayout, TableColumnBuilder } from '@regardsoss/components'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { BasicFacetsPageableActions, BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import { FacetArray } from '../../../models/facets/FacetShape'
import { FilterListShape } from '../../../models/facets/FilterShape'
import TableClient from '../../../clients/TableClient'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'
import OptionsAndTabsHeaderLine from './header/OptionsAndTabsHeaderLine'
import ResultsAndFacetsHeaderRow from './header/ResultsAndFacetsHeaderRow'
import SelectedFacetsHeaderRow from './header/SelectedFacetsHeaderRow'
import ListViewEntityCellContainer, { hasDownloadAttribute, packThumbnailRenderData, packGridAttributesRenderData }
  from '../../../containers/user/results/cells/ListViewEntityCellContainer'
import AddElementToCartContainer from '../../../containers/user/results/options/AddElementToCartContainer'
import EntityDescriptionContainer from '../../../containers/user/results/options/EntityDescriptionContainer'
import OneElementServicesContainer from '../../../containers/user/results/options/OneElementServicesContainer'
import EmptyTableComponent from './EmptyTableComponent'

const RESULTS_PAGE_SIZE = 150

/**
 * React component to manage search requests and display results. It handles locally the columns visible state, considered
 * a graphic state
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {

  static propTypes = {
    // static module configuration
    allowingFacettes: PropTypes.bool.isRequired,
    displayDatasets: PropTypes.bool.isRequired,

    // results related
    resultsCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    searchActions: PropTypes.instanceOf(BasicFacetsPageableActions).isRequired,
    searchSelectors: PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,

    // configuration related: attributes presentation model as converted by parent container
    hiddenColumnKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    attributePresentationModels: AccessShapes.AttributePresentationModelArray.isRequired,

    // dynamic display control
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    viewMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]), // current mode

    // facets control
    showingFacettes: PropTypes.bool.isRequired,
    facets: FacetArray.isRequired,
    filters: FilterListShape.isRequired,

    // request control
    searchQuery: PropTypes.string.isRequired,

    // services from PluginServicesContainer HOC
    selectionServices: AccessShapes.PluginServiceWithContentArray,
    // control
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    onDeleteFacet: PropTypes.func.isRequired,
    onSetEntityAsTag: PropTypes.func.isRequired,
    onSelectFacet: PropTypes.func.isRequired,
    onShowDatasets: PropTypes.func.isRequired,
    onShowDataobjects: PropTypes.func.isRequired,
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onSortByAttribute: PropTypes.func.isRequired,
    onToggleShowFacettes: PropTypes.func.isRequired,
    // from PluginServicesContainer HOC
    onStartSelectionService: PropTypes.func, // callback to start a selection service
    // from OrderCartContainer HOC
    onAddSelectionToCart: PropTypes.func, // callback to add selection to cart, null when disabled
    onAddElementToCart: PropTypes.func, // callback to add element to cart, null when disabled
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Has object type as parameter the services option
   * @param {objectType} entity type
   * @return true if services are available for that type, false otherwise
   */
  static hasServices = objectType => objectType === DamDomain.ENTITY_TYPES_ENUM.DATA

  /**
   * Has selection for current view type
   * @param {objectType} entity type
   * @return true if selection should be available
   */
  static hasSelection = objectType => objectType !== DamDomain.ENTITY_TYPES_ENUM.DATASET

  /**
   * Can search related elements in the given view object type ? (ie: set the element as tag)
   * @param {objectType} entity type
   * @return true if user can search related elements
   */
  static canSearchRelated = objectType => objectType === DamDomain.ENTITY_TYPES_ENUM.DATASET

  /**
   * Stores reference on the static empty component
   */
  static EMPTY_COMPONENT = <EmptyTableComponent />

  /**
   * Builds table columns
   * @param props : props map, to retrieve current properties
   */
  buildTableColumns = () => {
    const { searchSelectors, attributePresentationModels, onSortByAttribute, onAddElementToCart, viewObjectType } = this.props
    const { intl: { formatMessage } } = this.context

    const fixedColumnWidth = this.context.muiTheme['components:infinite-table'].fixedColumnsWidth
    const enableSelection = SearchResultsComponent.hasSelection(viewObjectType)
    const enableServices = SearchResultsComponent.hasServices(viewObjectType)

    return [
      // selection column
      enableSelection ? TableColumnBuilder.buildSelectionColumn(formatMessage({ id: 'results.selection.column.label' }),
        true, searchSelectors, TableClient.tableActions, TableClient.tableSelectors,
        this.isColumnVisible(TableColumnBuilder.selectionColumnKey), fixedColumnWidth) : null,
      // attributes and attributes groups as provided by parent
      ...attributePresentationModels.map(presentationModel => AttributeColumnBuilder.buildAttributeColumn(
        presentationModel, this.isColumnVisible(presentationModel.key), onSortByAttribute, fixedColumnWidth)),
      // Options in current context
      TableColumnBuilder.buildOptionsColumn(formatMessage({ id: 'results.options.column.label' }),
        this.buildTableOptions(enableServices, onAddElementToCart), this.isColumnVisible(TableColumnBuilder.optionsColumnKey), fixedColumnWidth),
    ].filter(column => !!column) // filter null elements
  }

  /**
   * Builds table options
   * @param {boolean} enableServices are services enabled in current context?
   * @param {function} onAddElementToCart callback to add element to cart (element) => (). Null if not available in context
   */
  buildTableOptions = (enableServices, onAddToCart) => [
    // Entity description
    { OptionConstructor: EntityDescriptionContainer },
    // Entity services, only when enabled
    enableServices ? { OptionConstructor: OneElementServicesContainer } : null,
    // Add to cart, only when enabled
    onAddToCart ? { OptionConstructor: AddElementToCartContainer, optionProps: { onAddToCart } } : null]
    .filter(option => !!option) // filter null options


  /**
  * Create columns configuration for table view
  * @param tableColumns table columns
  * @param props component properties
  * @param enableServices enable services?
  * @param onAddElementToCart on add element to cart callback
  * @returns {Array}
  */
  buildListColumn = () => {
    const { attributePresentationModels, onAddElementToCart, onSetEntityAsTag, viewObjectType } = this.props
    const enableSelection = SearchResultsComponent.hasSelection(viewObjectType)
    const enableServices = SearchResultsComponent.hasServices(viewObjectType)
    const enableSearchRelated = SearchResultsComponent.canSearchRelated(viewObjectType)

    // build column. Note: label is ignored here as the columns button will get removed
    return TableColumnBuilder.buildColumn('single.list.column', 'single.list.column', null, {
      Constructor: ListViewEntityCellContainer,
      props: {
        // prefetch attributes from models to enhance render time
        hasDownload: hasDownloadAttribute(attributePresentationModels),
        thumbnailRenderData: packThumbnailRenderData(attributePresentationModels),
        gridAttributesRenderData: packGridAttributesRenderData(attributePresentationModels),
        selectionEnabled: enableSelection,
        servicesEnabled: enableServices,
        onSearchEntity: enableSearchRelated ? onSetEntityAsTag : null,
        onAddToCart: onAddElementToCart,
      },
    })
  }

  /**
   * Is column visible?
   * @param columnLabel column label
   * @return true if visible
   */
  isColumnVisible = columnKey => !this.props.hiddenColumnKeys.includes(columnKey)

  /** @return {boolean} true if currently displaying dataobjects */
  isDisplayingDataobjects = () => this.props.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA

  /** @return {boolean} true if currently in list view */
  isInListView = () => this.props.viewMode === DisplayModeEnum.LIST

  /** @return {boolean} true if currently in table view */
  isInTableView = () => this.props.viewMode === DisplayModeEnum.TABLE


  render() {
    const { muiTheme } = this.context
    const tableTheme = muiTheme['components:infinite-table']

    const { allowingFacettes, attributePresentationModels, displayDatasets, resultsCount, isFetching, searchActions, searchSelectors, viewObjectType, viewMode,
      showingFacettes, facets, filters, searchQuery, selectionServices, onChangeColumnsVisibility, onDeleteFacet,
      onSelectFacet, onShowDatasets, onShowDataobjects, onShowListView, onShowTableView, onSortByAttribute, onToggleShowFacettes,
      onStartSelectionService, onAddSelectionToCart } = this.props

    let columns
    let lineHeight
    let displayColumnsHeader
    let displayedRowsCount

    const tableColumns = this.buildTableColumns()
    if (this.isInTableView()) {
      displayedRowsCount = tableTheme.rowCount
      lineHeight = tableTheme.lineHeight
      columns = tableColumns
      displayColumnsHeader = true
    } else { // use list columns
      displayedRowsCount = tableTheme.listRowCount
      lineHeight = tableTheme.listLineHeight
      columns = [this.buildListColumn()]
      displayColumnsHeader = false
    }

    const requestParams = { queryParams: searchQuery }
    const showFacets = this.isDisplayingDataobjects() && allowingFacettes && showingFacettes

    return (
      <TableLayout>
        {/* First header row :Table tabs and options */}
        <OptionsAndTabsHeaderLine
          displayDatasets={displayDatasets}
          viewObjectType={viewObjectType}
          viewMode={viewMode}
          searchSelectors={searchSelectors}
          attributePresentationModels={attributePresentationModels}
          tableColumns={tableColumns}
          allowingFacettes={allowingFacettes}
          showingFacettes={showingFacettes}
          selectionServices={selectionServices}
          onAddSelectionToCart={onAddSelectionToCart}
          onChangeColumnsVisibility={onChangeColumnsVisibility}
          onShowDataobjects={onShowDataobjects}
          onShowDatasets={onShowDatasets}
          onShowListView={onShowListView}
          onShowTableView={onShowTableView}
          onSortByAttribute={onSortByAttribute}
          onStartSelectionService={onStartSelectionService}
          onToggleShowFacettes={onToggleShowFacettes}
        />
        {/* Second header row: results, loading, and optionally facets */}
        <ResultsAndFacetsHeaderRow
          showFacets={showFacets}
          resultsCount={resultsCount}
          facets={facets}
          onSelectFacet={onSelectFacet}
          isFetching={isFetching}
        />
        {/* Third header row (only with facets enabled):  */}
        <SelectedFacetsHeaderRow
          showingFacettes={showingFacettes}
          filters={filters}
          onDeleteFilter={onDeleteFacet}
        />
        {/* Table content */}
        <PageableInfiniteTableContainer
          key={viewObjectType} // unmount the table when change entity type (using key trick)
          // infinite table configuration
          pageActions={searchActions}
          pageSelectors={searchSelectors}
          tableActions={TableClient.tableActions}

          displayColumnsHeader={displayColumnsHeader}
          lineHeight={lineHeight}
          displayedRowsCount={displayedRowsCount}
          columns={columns}
          queryPageSize={RESULTS_PAGE_SIZE}
          requestParams={requestParams}
          emptyComponent={SearchResultsComponent.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}

export default SearchResultsComponent
