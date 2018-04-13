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
import ListViewIcon from 'mdi-material-ui/ViewSequential'
import TableViewIcon from 'mdi-material-ui/TableLarge'
import ImageAlbum from 'mdi-material-ui/ImageAlbum'
import ShowFacetsSearchIcon from 'material-ui/svg-icons/action/find-in-page'
import DatasetLibraryIcon from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibraryIcon from 'material-ui/svg-icons/av/library-books'
import FlatButton from 'material-ui/FlatButton'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import {
  ShowableAtRender, TableColumnConfiguration, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableColumnsVisibilityOption,
} from '@regardsoss/components'
import { TableDisplayModeEnum, TableDisplayModeValues } from '../../../../models/navigation/TableDisplayModeEnum'
import TableSelectAllContainer from '../../../../containers/user/results/options/TableSelectAllContainer'
import ListSortingContainer from '../../../../containers/user/results/options/ListSortingContainer'
import SelectionServiceComponent from '../options/SelectionServiceComponent'
import AddSelectionToCartComponent from '../options/AddSelectionToCartComponent'
import ResultFilterOnlyQuicklookComponent from '../options/ResultFilterOnlyQuicklookComponent'
import { DISPLAY_MODE_VALUES, DISPLAY_MODE_ENUM } from '../../../../definitions/DisplayModeEnum'

/**
* Options and tabs header line for search results table
* @author Raphaël Mechali
*/
class OptionsAndTabsHeaderLine extends React.Component {
  static propTypes = {
    // state
    attributePresentationModels: AccessShapes.AttributePresentationModelArray.isRequired,
    displayMode: PropTypes.oneOf(DISPLAY_MODE_VALUES).isRequired,
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    tableViewMode: PropTypes.oneOf(TableDisplayModeValues), // current mode
    searchSelectors: PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,

    // facet state
    displayFacettesButton: PropTypes.bool.isRequired,
    showingFacettes: PropTypes.bool.isRequired,

    // quicklook
    enableQuicklooks: PropTypes.bool.isRequired,
    displayOnlyQuicklook: PropTypes.bool.isRequired,

    // services
    selectionServices: AccessShapes.PluginServiceWithContentArray.isRequired,

    // Navigation
    datasetsSectionLabel: PropTypes.string,
    dataSectionLabel: PropTypes.string,

    // callbacks
    onAddSelectionToCart: PropTypes.func, // optional, not available when null or undefined
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    onShowDataobjects: PropTypes.func.isRequired,
    onShowDatasets: PropTypes.func.isRequired,
    onShowQuicklookView: PropTypes.func.isRequired,
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onSortByAttribute: PropTypes.func.isRequired,
    onStartSelectionService: PropTypes.func, // callback to start a selection service
    onToggleShowFacettes: PropTypes.func.isRequired,
    onToggleDisplayOnlyQuicklook: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** @return {boolean} true if currently displaying data objects */
  isDisplayingDataobjects = () => this.props.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA

  /** @return {boolean} true if currently displaying documents */
  isDisplayingDocuments = () => this.props.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DOCUMENT

  /** @return {boolean} true if current object type is facetable */
  isDisplayingFacetableObject = () => this.isDisplayingDataobjects() || this.isDisplayingDocuments()

  /** @return {boolean} true if currently in list view */
  isInListView = () => this.props.tableViewMode === TableDisplayModeEnum.LIST

  /** @return {boolean} true if currently in table view */
  isInTableView = () => this.props.tableViewMode === TableDisplayModeEnum.TABLE

  /** @return {boolean} true if currently in table view */
  isInQuicklookView = () => this.props.tableViewMode === TableDisplayModeEnum.QUICKLOOK

  render() {
    const { intl: { formatMessage }, moduleTheme: { user: { viewModeButton } } } = this.context
    const {
      attributePresentationModels, displayMode, searchSelectors, tableColumns,
      displayFacettesButton, showingFacettes, enableQuicklooks, selectionServices, onAddSelectionToCart,
      onChangeColumnsVisibility, onShowListView, onShowTableView, onShowDatasets, onShowQuicklookView, displayOnlyQuicklook,
      onShowDataobjects, onSortByAttribute, onStartSelectionService, onToggleShowFacettes, onToggleDisplayOnlyQuicklook,
      datasetsSectionLabel, dataSectionLabel,
    } = this.props

    return (
      <TableHeaderLine key="table.options">
        {/* 1.a - Tabs (left group) */}
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup show={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}>
            <FlatButton
              key="datasets.tab"
              label={datasetsSectionLabel || formatMessage({ id: 'navigation.datasets.label' })}
              onClick={onShowDatasets}
              icon={<DatasetLibraryIcon />}
              secondary={!this.isDisplayingDataobjects()}
            />
            <FlatButton
              key="dataobjects.tab"
              label={dataSectionLabel || formatMessage({ id: 'navigation.dataobjects.label' })}
              onClick={onShowDataobjects}
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
          <TableHeaderOptionGroup show={!!onAddSelectionToCart || (displayFacettesButton && this.isDisplayingFacetableObject())}>
            <ShowableAtRender show={!!onAddSelectionToCart} key="add.selection.to.cart">
              <AddSelectionToCartComponent onAddSelectionToCart={onAddSelectionToCart} />
            </ShowableAtRender>
            <ShowableAtRender show={displayFacettesButton && this.isDisplayingFacetableObject()}>
              <FlatButton
                label={formatMessage({ id: 'navigation.filter.by.facets' })}
                onClick={onToggleShowFacettes}
                icon={<ShowFacetsSearchIcon />}
                secondary={showingFacettes}
              />
            </ShowableAtRender>
          </TableHeaderOptionGroup>
          {/* 1.b.3 List or quicklook option - select all and sort options */}
          <TableHeaderOptionGroup show={!this.isInTableView() && this.isDisplayingDataobjects()}>
            <ListSortingContainer onSortByAttribute={onSortByAttribute} attributePresentationModels={attributePresentationModels} />
            <ShowableAtRender show={this.isInListView()}>
              <TableSelectAllContainer pageSelectors={searchSelectors} />
            </ShowableAtRender>
            <ShowableAtRender show={this.isInQuicklookView()}>
              <ResultFilterOnlyQuicklookComponent
                displayOnlyQuicklook={displayOnlyQuicklook}
                onToggleDisplayOnlyQuicklook={onToggleDisplayOnlyQuicklook}
              />
            </ShowableAtRender>
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
              onClick={onShowListView}
              icon={<ListViewIcon />}
              secondary={this.isInListView()}
              style={viewModeButton}
              title={formatMessage({ id: 'view.type.list.button.label' })}
            />
            <FlatButton
              key="view.type.table"
              onClick={onShowTableView}
              icon={<TableViewIcon />}
              secondary={this.isInTableView()}
              style={viewModeButton}
              title={formatMessage({ id: 'view.type.table.button.label' })}
            />
            <ShowableAtRender show={enableQuicklooks && this.isDisplayingDataobjects()}>
              <FlatButton
                key="view.type.quicklook"
                onClick={onShowQuicklookView}
                icon={<ImageAlbum />}
                secondary={this.isInQuicklookView()}
                style={viewModeButton}
                title={formatMessage({ id: 'view.type.quicklook.button.label' })}
              />
            </ShowableAtRender>
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default OptionsAndTabsHeaderLine
