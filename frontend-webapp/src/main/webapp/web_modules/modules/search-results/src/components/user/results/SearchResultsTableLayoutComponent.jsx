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
import FlatButton from 'material-ui/FlatButton'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import ListView from 'material-ui/svg-icons/action/list'
import TableView from 'material-ui/svg-icons/action/view-module'
import ShowFacetsSearch from 'material-ui/svg-icons/action/find-in-page'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import {
  ShowableAtRender, TableColumnConfiguration, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableColumnsVisibilityOption,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'
import { FacetArray } from '../../../models/facets/FacetShape'
import { FilterListShape } from '../../../models/facets/FilterShape'
import TableSortFilterComponent from './options/TableSortFilterComponent'
import AddSelectionToCartComponent from './options/AddSelectionToCartComponent'
import TableSelectAllContainer from '../../../containers/user/results/options/TableSelectAllContainer'
import SelectionServiceComponent from './options/SelectionServiceComponent'
import ResultsAndFacetsHeaderRow from './facets/ResultsAndFacetsHeaderRow'
import SelectedFacetsHeaderRow from './facets/SelectedFacetsHeaderRow'


/**
* Table layout for search results (mainly builds headers)
* @author Raphaël Mechali
*/
class SearchResultsTableLayoutComponent extends React.Component {


  //onFiltersChanged: PropTypes.func.isRequired, // used only in state update

  static propTypes = {

    // state
    displayDatasets: PropTypes.bool.isRequired,
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    viewMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]), // current mode
    resultsCount: PropTypes.number.isRequired,
    searchSelectors: PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,
    hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    isFetching: PropTypes.bool.isRequired,

    // facet state
    allowingFacettes: PropTypes.bool.isRequired,
    showingFacettes: PropTypes.bool.isRequired,
    facets: FacetArray,
    filters: FilterListShape,

    // services
    selectionServices: AccessShapes.PluginServiceWithContentArray.isRequired,

    // callbacks
    onAddSelectionToCart: PropTypes.func, // optional, not available when null or undefined
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    onDeleteFilter: PropTypes.func.isRequired,
    onSelectFacet: PropTypes.func.isRequired,
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onShowDatasets: PropTypes.func.isRequired,
    onShowDataobjects: PropTypes.func.isRequired,
    onSortByColumn: PropTypes.func.isRequired,
    onStartSelectionService: PropTypes.func, // callback to start a selection service
    onToggleShowFacettes: PropTypes.func.isRequired,

    // expected child here: table container
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** @return {boolean} true if currently displaying data objects */
  isDisplayingDataobjects = () => this.props.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA

  /** @return {boolean} true if currently in list view */
  isInListView = () => this.props.viewMode === DisplayModeEnum.LIST

  /** @return {boolean} true if currently in table view */
  isInTableView = () => this.props.viewMode === DisplayModeEnum.TABLE


  render() {
    const { intl: { formatMessage } } = this.context
    const { children, displayDatasets, resultsCount, searchSelectors, tableColumns, hiddenColumns,
      allowingFacettes, showingFacettes, facets, filters, selectionServices, isFetching,
      onAddSelectionToCart, onChangeColumnsVisibility, onDeleteFilter, onSelectFacet,
      onShowListView, onShowTableView, onShowDatasets, onShowDataobjects,
      onSortByColumn, onStartSelectionService, onToggleShowFacettes } = this.props

    const showFacets = this.isDisplayingDataobjects() && allowingFacettes && showingFacettes

    // TODO-V2 externalize as styles
    const iconListStyle = { width: 33, height: 33 }
    const iconTableStyle = { width: 30, height: 30 }
    const buttonStyle = { minWidth: 45 }

    return (
      <TableLayout>
        {/* 1 - Tabs, services and options */}
        <TableHeaderLine key="table.options">
          {/* 1.a - Tabs (left group) */}
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup show={displayDatasets}>
              <FlatButton
                key="datasets.tab"
                label={formatMessage({ id: 'navigation.datasets.label' })}
                onTouchTap={onShowDatasets}
                icon={<DatasetLibrary />}
                secondary={!this.isDisplayingDataobjects()}
              />
              <FlatButton
                key="dataobjects.tab"
                label={formatMessage({ id: 'navigation.dataobjects.label' })}
                onTouchTap={onShowDataobjects}
                icon={<DataLibrary />}
                secondary={this.isDisplayingDataobjects()}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          { /* 1.b - Options (right group) */}
          <TableHeaderOptionsArea reducible>
            <TableHeaderOptionGroup show={!!selectionServices.length}>
              { // 1.b.1 Selection services
                selectionServices.map(service => (
                  <SelectionServiceComponent
                    key={`${service.content.type}.service.${service.content.configId}`}
                    service={service}
                    onRunService={onStartSelectionService}
                  />))
              }
            </TableHeaderOptionGroup>
            {/* 1.b.2 Extended options: add to basket and facets */}
            <TableHeaderOptionGroup show={!!onAddSelectionToCart || (allowingFacettes && this.isDisplayingDataobjects())}>
              <ShowableAtRender show={!!onAddSelectionToCart} key="add.selection.to.cart">
                <AddSelectionToCartComponent onAddSelectionToCart={onAddSelectionToCart} />
              </ShowableAtRender>
              <ShowableAtRender show={allowingFacettes && this.isDisplayingDataobjects()} >
                <FlatButton
                  label={formatMessage({ id: 'navigation.filter.by.facets' })}
                  onTouchTap={onToggleShowFacettes}
                  icon={<ShowFacetsSearch />}
                  secondary={showingFacettes}
                />
              </ShowableAtRender>
            </TableHeaderOptionGroup>
            {/* 1.b.3 List view option select all and sort options */}
            <TableHeaderOptionGroup show={this.isInListView() && this.isDisplayingDataobjects()}>
              <TableSortFilterComponent
                onSortByColumn={onSortByColumn}
                tableColumns={tableColumns}
                prefixLabel={formatMessage({ id: 'list.sort.prefix.label' })}
                noneLabel={formatMessage({ id: 'list.sort.none.label' })}
              />
              <TableSelectAllContainer pageSelectors={searchSelectors} />
            </TableHeaderOptionGroup>
            {/* 1.b.4 - Show / hide table columns */}
            <TableHeaderOptionGroup show={this.isInTableView()}>
              <TableColumnsVisibilityOption
                columns={tableColumns}
                hiddenColumns={hiddenColumns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
            </TableHeaderOptionGroup>
            {/* 1.b.5 - Switch view mode (list / table)*/}
            <TableHeaderOptionGroup>
              <FlatButton
                key="view.type.list"
                onTouchTap={onShowListView}
                icon={<ListView
                  style={iconListStyle}
                />}
                secondary={this.isInListView()}
                style={buttonStyle}
                title={formatMessage({ id: 'view.type.list.button.label' })}
              />
              <FlatButton
                key="view.type.table"
                onTouchTap={onShowTableView}
                icon={<TableView
                  style={iconTableStyle}
                />}
                secondary={this.isInTableView()}
                style={buttonStyle}
                title={formatMessage({ id: 'view.type.table.button.label' })}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        {/* 2 - Results count and (optionnaly) facets, using facets Row  */}
        <ResultsAndFacetsHeaderRow
          showFacets={showFacets}
          resultsCount={resultsCount}
          facets={facets}
          onSelectFacet={onSelectFacet}
          isFetching={isFetching}
        />
        {/* 3 - selected facets (if facets are enabled and existing). Note: show is read directly by TableHeader */}
        <SelectedFacetsHeaderRow showingFacettes={showingFacettes} filters={filters} onDeleteFilter={onDeleteFilter} />
        {/* 4 - The table itself */
          children
        }
      </TableLayout >
    )
  }
}
export default SearchResultsTableLayoutComponent
