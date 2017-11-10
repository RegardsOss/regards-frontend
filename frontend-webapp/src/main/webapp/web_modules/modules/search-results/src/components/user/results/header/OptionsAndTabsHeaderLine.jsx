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
import ListViewIcon from 'material-ui/svg-icons/action/list'
import TableViewIcon from 'material-ui/svg-icons/action/view-module'
import ShowFacetsSearchIcon from 'material-ui/svg-icons/action/find-in-page'
import DatasetLibraryIcon from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibraryIcon from 'material-ui/svg-icons/av/library-books'
import FlatButton from 'material-ui/FlatButton'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import {
  ShowableAtRender, TableColumnConfiguration, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableColumnsVisibilityOption,
} from '@regardsoss/components'
import DisplayModeEnum from '../../../../models/navigation/DisplayModeEnum'
import TableSelectAllContainer from '../../../../containers/user/results/options/TableSelectAllContainer'
import SelectionServiceComponent from '../options/SelectionServiceComponent'
import AddSelectionToCartComponent from '../options/AddSelectionToCartComponent'
import TableSortFilterComponent from '../options/TableSortFilterComponent'

/**
* Options and tabs header line for search results table
* @author Raphaël Mechali
*/
class OptionsAndTabsHeaderLine extends React.Component {

  static propTypes = {
    // state
    displayDatasets: PropTypes.bool.isRequired,
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    viewMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]), // current mode
    searchSelectors: PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,

    // facet state
    allowingFacettes: PropTypes.bool.isRequired,
    showingFacettes: PropTypes.bool.isRequired,

    // services
    selectionServices: AccessShapes.PluginServiceWithContentArray.isRequired,

    // callbacks
    onAddSelectionToCart: PropTypes.func, // optional, not available when null or undefined
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    onShowDataobjects: PropTypes.func.isRequired,
    onShowDatasets: PropTypes.func.isRequired,
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onSortByAttribute: PropTypes.func.isRequired,
    onStartSelectionService: PropTypes.func, // callback to start a selection service
    onToggleShowFacettes: PropTypes.func.isRequired,
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
    const { displayDatasets, searchSelectors, tableColumns,
      allowingFacettes, showingFacettes, selectionServices,
      onAddSelectionToCart, onChangeColumnsVisibility,
      onShowListView, onShowTableView, onShowDatasets, onShowDataobjects,
      onSortByAttribute, onStartSelectionService, onToggleShowFacettes } = this.props

    // TODO-V2 externalize as styles
    const iconListStyle = { width: 33, height: 33 }
    const iconTableStyle = { width: 30, height: 30 }
    const buttonStyle = { minWidth: 45 }
    return (
      <TableHeaderLine key="table.options">
        {/* 1.a - Tabs (left group) */}
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup show={displayDatasets}>
            <FlatButton
              key="datasets.tab"
              label={formatMessage({ id: 'navigation.datasets.label' })}
              onTouchTap={onShowDatasets}
              icon={<DatasetLibraryIcon />}
              secondary={!this.isDisplayingDataobjects()}
            />
            <FlatButton
              key="dataobjects.tab"
              label={formatMessage({ id: 'navigation.dataobjects.label' })}
              onTouchTap={onShowDataobjects}
              icon={<DataLibraryIcon />}
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
            <ShowableAtRender show={allowingFacettes && this.isDisplayingDataobjects()}>
              <FlatButton
                label={formatMessage({ id: 'navigation.filter.by.facets' })}
                onTouchTap={onToggleShowFacettes}
                icon={<ShowFacetsSearchIcon />}
                secondary={showingFacettes}
              />
            </ShowableAtRender>
          </TableHeaderOptionGroup>
          {/* 1.b.3 List view option select all and sort options */}
          <TableHeaderOptionGroup show={this.isInListView() && this.isDisplayingDataobjects()}>
            <TableSortFilterComponent
              onSortByAttribute={onSortByAttribute}
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
              onChangeColumnsVisibility={onChangeColumnsVisibility}
            />
          </TableHeaderOptionGroup>
          {/* 1.b.5 - Switch view mode (list / table)*/}
          <TableHeaderOptionGroup>
            <FlatButton
              key="view.type.list"
              onTouchTap={onShowListView}
              icon={<ListViewIcon
                style={iconListStyle}
              />}
              secondary={this.isInListView()}
              style={buttonStyle}
              title={formatMessage({ id: 'view.type.list.button.label' })}
            />
            <FlatButton
              key="view.type.table"
              onTouchTap={onShowTableView}
              icon={<TableViewIcon
                style={iconTableStyle}
              />}
              secondary={this.isInTableView()}
              style={buttonStyle}
              title={formatMessage({ id: 'view.type.table.button.label' })}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default OptionsAndTabsHeaderLine
