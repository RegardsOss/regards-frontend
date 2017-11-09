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
import map from 'lodash/map'
import values from 'lodash/values'
import Disatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  PageableInfiniteTableContainer, NoContentComponent,
  TableLayout, TableSortOrders, TableColumnBuilder,
} from '@regardsoss/components'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { BasicFacetsPageableActions, BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import { FacetArray } from '../../../models/facets/FacetShape'
import { FilterListShape } from '../../../models/facets/FilterShape'
import TableClient from '../../../clients/TableClient'
import ListViewEntityCellContainer from '../../../containers/user/results/cells/ListViewEntityCellContainer'
import TableViewOptionsCellContainer from '../../../containers/user/results/cells/TableViewOptionsCellContainer'
import OptionsAndTabsHeaderLine from './header/OptionsAndTabsHeaderLine'
import ResultsAndFacetsHeaderRow from './header/ResultsAndFacetsHeaderRow'
import SelectedFacetsHeaderRow from './header/SelectedFacetsHeaderRow'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'

/**
 * React component to manage search requests and display results. It handles locally the columns visible state, considered
 * a graphic state
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {

  static propTypes = {
    // static configuration
    allowingFacettes: PropTypes.bool.isRequired,
    displayDatasets: PropTypes.bool.isRequired, // TODO directly down?

    // results related
    resultsCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    searchActions: PropTypes.instanceOf(BasicFacetsPageableActions).isRequired,
    searchSelectors: PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,

    // dynamic display control
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    viewMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]), // current mode

    // sorting control
    // eslint-disable-next-line react/no-unused-prop-types
    sortingOn: PropTypes.arrayOf(PropTypes.shape({ // user sorting, showing only when user set, not the default one
      attributePath: PropTypes.string.isRequired,
      type: PropTypes.oneOf(values(TableSortOrders)).isRequired,
    })).isRequired,

    // facets control
    showingFacettes: PropTypes.bool.isRequired,
    facets: FacetArray.isRequired,
    filters: FilterListShape.isRequired,

    // request control
    searchQuery: PropTypes.string.isRequired,

    // Attributes configurations for results columns
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    datasetAttributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributeModels: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    // key of each hidden column (as provided by this component)
    hiddenColumnKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    // services from PluginServicesContainer HOC
    selectionServices: AccessShapes.PluginServiceWithContentArray,
    // control
    // callback
    // eslint-disable-next-line react/no-unused-prop-types
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    onDeleteFacet: PropTypes.func.isRequired,
    onSetEntityAsTag: PropTypes.func.isRequired,
    onSelectFacet: PropTypes.func.isRequired,
    onShowDatasets: PropTypes.func.isRequired, // TODO directly down?
    onShowDataobjects: PropTypes.func.isRequired, // TODO directly down?
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onSortChanged: PropTypes.func.isRequired,
    onToggleShowFacettes: PropTypes.func.isRequired,
    // from PluginServicesContainer HOC
    onStartSelectionService: PropTypes.func, // callback to start a selection service
    // from OrderCartContainer HOC
    onAddSelectionToCart: PropTypes.func, // callback to add selection to cart, null when disabled
    // eslint-disable-next-line react/no-unused-prop-types
    onAddElementToCart: PropTypes.func, // callback to add element to cart, null when disabled
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Has object type as parameter the sorting option
   * @param {objectType} entity type
   * @return true if sorting is available for that type, false otherwise
   */
  static hasSorting = objectType => objectType !== DamDomain.ENTITY_TYPES_ENUM.DATASET

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
   * Sorting adaptation for parent container (to avoid runtime lambdas)
   * @param attributePath attribute path (as it is the column key / sort ID provided when building header)
   * @param sortOrder new sort order
   */
  onSortByColumn = (attributePath, sortOrder) => {
    this.props.onSortChanged(attributePath, sortOrder)
  }

  /**
   * Builds table columns
   * @param props : props map, to retrieve current properties
   */
  buildTableColumns = () => {
    const { attributesConf, attributeModels, attributesRegroupementsConf, searchSelectors,
      datasetAttributesConf, sortingOn, onAddElementToCart, viewObjectType } = this.props
    const { intl: { formatMessage } } = this.context

    const fixedColumnWidth = this.context.muiTheme['components:infinite-table'].fixedColumnsWidth
    const enableSelection = SearchResultsComponent.hasSelection(viewObjectType)
    const enableSorting = SearchResultsComponent.hasSorting(viewObjectType)
    // what type of columns should the table show?
    let columnAttributes
    let columnAttributeGroup
    if (viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATASET) {
      columnAttributes = datasetAttributesConf// attributes are dataset ones
      columnAttributeGroup = [] // no group
    } else {
      columnAttributes = attributesConf // data configuration
      columnAttributeGroup = attributesRegroupementsConf // data attribute groups
    }

    return [
      // selection column
      enableSelection ? TableColumnBuilder.buildSelectionColumn(formatMessage({ id: 'results.selection.column.label' }),
        true, searchSelectors, TableClient.tableActions, TableClient.tableSelectors,
        this.isColumnVisible(TableColumnBuilder.selectionColumnKey), fixedColumnWidth) : null,
      // attributes
      ...this.buildAttributesColumns(columnAttributes, attributeModels, sortingOn, enableSorting, fixedColumnWidth),
      // attribute groups
      ...this.buildAttributesGroupsColumns(columnAttributeGroup, attributeModels),
    ].filter(column => !!column) // filter null elements
    // TODO other columns
    //   ...,
    //   ,
    //   this.buildTableOptionsColumn(onAddElementToCart, SearchResultsComponent.hasServices(viewObjectType))],
  }

  /**
   * Builds options column
   * @param enableServices enable services?
   * @return table column to show table options (description button)
   */
  buildTableOptionsColumn = (onAddElementToCart, enableServices) => {
    const label = this.context.intl.formatMessage({ id: 'results.options.column.label' })
    return {
      label,
      attributes: [],
      order: Number.MAX_VALUE,
      // reserve space for description, services if enabled and add to cart if is available
      fixed: this.context.muiTheme['components:infinite-table'].fixedColumnsWidth * (1 + (onAddElementToCart ? 1 : 0) + (enableServices ? 1 : 0)), // TODO
      sortable: false,
      hideLabel: true,
      // order: number.
      customCell: {
        component: TableViewOptionsCellContainer,
        props: {
          enableServices,
          onAddToCart: onAddElementToCart,
        },
      },
      visible: this.isColumnVisible(label),
    }
  }

  /**
   * Builds simple attributes table columns for each attribute from module configuration
   * @param attributesConf simple attributes configuration from module configuration
   * @param attributeModels runtime resolved attribute models
   * @param sortingOn current sorting on attributes keys
   * @param enableSorting should enable sorting?
   * @param fixedColumnWidth width for non resizable columns
   */
  buildAttributesColumns = (attributesConf, attributeModels, sortingOn, enableSorting, fixedColumnWidth) =>
    // map on attributes defined in configuration to build the required columns (then filter)
    map(attributesConf, (attributeConf) => {
      // map to attributes models then to column
      if (attributeConf.visibility) {
        // find column sorting order
        const attributeFullQualifiedName = attributeConf.attributeFullQualifiedName
        const columnSortingOrder = sortingOn.reduce((acc, { attributePath, type }) =>
          attributePath === attributeFullQualifiedName ? type : acc, TableSortOrders.NO_SORT)
        // build the column and order data
        return AttributeColumnBuilder.buildAttributeColumn(attributeFullQualifiedName,
          attributeModels, enableSorting, columnSortingOrder, this.onSortByColumn,
          this.isColumnVisible(attributeFullQualifiedName), attributeConf.order, fixedColumnWidth)
      }
      return null
    })

  /**
   * Builds attributes group table columns for each attributes group from module configuration
   * @param attributesRegroupementsConf group attributes configuration from module configuration
   */
  buildAttributesGroupsColumns = (attributesRegroupementsConf, attributeModels) =>
    map(attributesRegroupementsConf, (attrRegroupementConf) => {
      if (attrRegroupementConf.visibility) {
        const labelAndKey = attrRegroupementConf.label
        return AttributeColumnBuilder.buildAttributesGroupColumn(attrRegroupementConf.attributes, attributeModels,
          labelAndKey, this.isColumnVisible(labelAndKey), attrRegroupementConf.order)
      }
      return null
    })

  /**
  * Create columns configuration for table view
  * @param tableColumns table columns
  * @param props component properties
  * @param enableServices enable services?
  * @param onAddElementToCart on add element to cart callback
  * @returns {Array}
  */
  buildListColumns = (tableColumns, { attributeModels, viewObjectType, onAddElementToCart, onSetEntityAsTag }) => [{
    label: 'ListviewCell',
    attributes: [],
    customCell: {
      component: ListViewEntityCellContainer,
      props: {
        attributes: attributeModels,
        tableColumns,
        enableServices: SearchResultsComponent.hasServices(viewObjectType),
        // click: select a dataset when in dataset mode
        onSearchEntity: viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATASET ? onSetEntityAsTag : null,
        onAddToCart: onAddElementToCart,
        displayCheckbox: viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA,
      },
    },
    visible: true,
  }]

  /**
   * Is column visible?
   * @param columnLabel column label
   * @return true if visible
   */
  isColumnVisible = columnKey => !this.props.hiddenColumnKeys.includes(columnKey)

  /** @return {boolean} true if currently displaying dataobjects */
  // TODO still required?
  isDisplayingDataobjects = () => this.props.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA

  /** @return {boolean} true if currently in list view */ // TODO remove?
  isInListView = () => this.props.viewMode === DisplayModeEnum.LIST

  /** @return {boolean} true if currently in table view */
  isInTableView = () => this.props.viewMode === DisplayModeEnum.TABLE


  render() {
    const { moduleTheme: { user: { listViewStyles } }, intl: { formatMessage }, muiTheme } = this.context
    const tableTheme = muiTheme['components:infinite-table']

    const { allowingFacettes, displayDatasets, resultsCount, isFetching, searchActions, searchSelectors, viewObjectType, viewMode, sortingOn,
      showingFacettes, facets, filters, searchQuery, attributesConf, attributesRegroupementsConf, datasetAttributesConf, attributeModels, hiddenColumnKeys,
      selectionServices, onChangeColumnsVisibility, onDeleteFacet, onSetEntityAsTag, onSelectFacet, onShowDatasets, onShowDataobjects, onShowListView,
      onShowTableView, onSortChanged, onToggleShowFacettes, onStartSelectionService, onAddSelectionToCart, onAddElementToCart } = this.props

    // build table columns
    const tableColumns = this.buildTableColumns()

    const pageSize = 13 // TODO what?
    let columns = []
    let lineHeight
    let displayColumnsHeader
    let minRowCount

    // TODO this is the cell recovery style: cellsStyle = listViewStyles.cell

    if (this.isInTableView()) {
      minRowCount = tableTheme.minRowCount
      lineHeight = tableTheme.lineHeight
      columns = tableColumns
      displayColumnsHeader = true
    } else { // use list columns
      minRowCount = tableTheme.listMinRowCount
      lineHeight = tableTheme.listLineHeight
      columns = this.buildListColumns(tableColumns, this.props)
      displayColumnsHeader = false
    }

    const requestParams = { queryParams: searchQuery }
    const showFacets = this.isDisplayingDataobjects() && allowingFacettes && showingFacettes

    // TODO maybe a static external compo! (better!)
    const emptyComponent = <NoContentComponent title={formatMessage({ id: 'results.no.content.title' })} message={formatMessage({ id: 'results.no.content.subtitle' })} Icon={Disatisfied} />

    return (
      <TableLayout>
        {/* First header row :Table tabs and options */}
        <OptionsAndTabsHeaderLine
          displayDatasets={displayDatasets}
          viewObjectType={viewObjectType}
          viewMode={viewMode}
          searchSelectors={searchSelectors}
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
          onSortByColumn={this.onSortByColumn}
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
          minRowCount={minRowCount}
          pageSize={pageSize}
          columns={columns}
          requestParams={requestParams}
          emptyComponent={emptyComponent}
        />
      </TableLayout>
    )
  }
}

export default SearchResultsComponent
