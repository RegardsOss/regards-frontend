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
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import FlatButton from 'material-ui/FlatButton'
import ListView from 'material-ui/svg-icons/action/list'
import TableView from 'material-ui/svg-icons/action/view-module'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import ShowFacetsSearch from 'material-ui/svg-icons/action/find-in-page'
import Disatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { TableContainer, TableOptionsSeparator, ShowableAtRender, TableSortOrders, NoContentComponent } from '@regardsoss/components'
import { LazyModuleComponent } from '@regardsoss/modules'
import { DamDomain, AccessDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { BasicFacetsPageableActions } from '@regardsoss/store-utils'
import { getTypeRender } from '@regardsoss/attributes-common'
import { selectors as searchSelectors } from '../../../clients/SearchEntitiesClient'
import TableClient from '../../../clients/TableClient'
import ListViewEntityCellContainer from '../../../containers/user/results/cells/ListViewEntityCellContainer'
import TableViewOptionsCellContainer from '../../../containers/user/results/cells/TableViewOptionsCellContainer'
import TableSortFilterComponent from './options/TableSortFilterComponent'
import AddSelectionToCartComponent from './options/AddSelectionToCartComponent'
import TableSelectAllContainer from '../../../containers/user/results/options/TableSelectAllContainer'
import SelectionServiceComponent from './options/SelectionServiceComponent'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'

/**
 * React container to manage search requests and display results.
 * Search queries are generated by the FormComponent and used by this container.
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {

  static propTypes = {
    // static configuration
    appName: PropTypes.string,
    project: PropTypes.string,
    allowingFacettes: PropTypes.bool.isRequired,
    displayDatasets: PropTypes.bool.isRequired,

    // dynamic display control
    viewObjectType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired, // current view object type
    viewMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]), // current mode
    showingFacettes: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    sortingOn: PropTypes.arrayOf(PropTypes.shape({ // user sorting, showing only when user set, not the default one
      attributePath: PropTypes.string.isRequired,
      type: PropTypes.oneOf(values(TableSortOrders)).isRequired,
    })).isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      filterKey: PropTypes.string.isRequired,
      filterLabel: PropTypes.string.isRequired,
      openSearchQuery: PropTypes.string.isRequired,
    })),
    searchQuery: PropTypes.string.isRequired,
    // services
    selectionServices: AccessShapes.PluginServiceWithContentArray,
    // Attributes configurations for results columns
    // eslint-disable-next-line react/no-unused-prop-types
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    // eslint-disable-next-line react/no-unused-prop-types
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    // eslint-disable-next-line react/no-unused-prop-types
    datasetAttributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributeModels: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    // control
    resultPageActions: PropTypes.instanceOf(BasicFacetsPageableActions).isRequired,
    onFiltersChanged: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    onSetEntityAsTag: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    onShowDatasets: PropTypes.func.isRequired,
    onShowDataobjects: PropTypes.func.isRequired,
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onSortChanged: PropTypes.func.isRequired,
    onToggleShowFacettes: PropTypes.func.isRequired,
    // from PluginServicesContainer
    onStartSelectionService: PropTypes.func, // callback to start a selection service
    // from OrderCartContainer
    onAddSelectionToCart: PropTypes.func, // callback to add selection to cart, null when disabled
    onAddElementToCart: PropTypes.func, // callback to add element to cart, null when disabled
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Preferred fixed column width */
  static PREF_FIXED_COLUMN_WIDTH = 50

  componentWillMount = () => this.updateState({}, this.props)

  componentWillReceiveProps = nextProps => this.updateState(this.props, nextProps)

  /**
 * Sorting adaptation for parent container (to avoid runtime lambdas)
 */
  onSortByColumn = (column, type, clear) => {
    this.props.onSortChanged(column ? column.attributes[0] : null, type, clear)
  }

  /**
   * Builds table columns
   * @param attributesConf : results table attributes columns configuration
   * @param attributesRegroupementsConf: results table attributes regroupement columns configuration
   * @param attributeModels: fetched attribute models (to retrieve attributes)
   */
  buildTableColumns = (attributesConf, attributeModels, attributesRegroupementsConf, sortingOn, enableSorting) =>
    sortBy([
      ...this.buildAttributesColumns(attributesConf, attributeModels, sortingOn, enableSorting),
      ...this.buildAttrRegroupementColumns(attributesRegroupementsConf, attributeModels),
      this.buildTableOptionsColumn()], a => a.order ? a.order : 1000)

  /** @return table column to show table options (description button) */
  buildTableOptionsColumn = () => ({
    label: this.context.intl.formatMessage({ id: 'results.options.column.label' }),
    attributes: [],
    order: Number.MAX_VALUE,
    // reserve space for description, services and add to cart if is available
    fixed: SearchResultsComponent.PREF_FIXED_COLUMN_WIDTH * (2 + (this.props.onAddElementToCart ? 1 : 0)),
    sortable: false,
    hideLabel: true,
    // order: number.
    customCell: {
      component: TableViewOptionsCellContainer,
      props: {
        onAddToCart: this.props.onAddElementToCart,
      },
    },
  })

  buildAttributesColumns = (attributesConf, attributeModels, sortingOn, enableSorting) =>
    reduce(attributesConf, (allColumns, attributeConf) => {
      // map to attributes models then to column
      if (attributeConf.visibility) {
        let attribute
        if (AccessDomain.AttributeConfigurationController.isStandardAttribute(attributeConf)) {
          // standard attribute
          attribute = AccessDomain.AttributeConfigurationController.getStandardAttributeConf(attributeConf.attributeFullQualifiedName)
        } else {
          // maybe dynamic attribute (if found)
          attribute = find(attributeModels,
            att => DamDomain.AttributeModelController.getAttributeAccessPath(att) === attributeConf.attributeFullQualifiedName)
        }
        // when found, add the corresponding column
        if (attribute) {
          const customCell = getTypeRender(attribute.content.type)
          const isSpecialAttr =
            attribute.content.type === DamDomain.AttributeModelController.ATTRIBUTE_TYPES.THUMBNAIL ||
            attribute.content.type === DamDomain.AttributeModelController.ATTRIBUTE_TYPES.DOWNLOAD_LINK
          return [...allColumns, {
            label: attribute.content.label,
            attributes: [attribute.content.jsonPath],
            sortable: !isSpecialAttr && enableSorting,
            hideLabel: isSpecialAttr,
            fixed: isSpecialAttr ? SearchResultsComponent.PREF_FIXED_COLUMN_WIDTH : undefined,
            customCell: customCell ? {
              component: customCell,
              props: {},
            } : undefined,
            order: attributeConf.order,
            // retrieve column sorting in current state
            sortingOrder: sortingOn.reduce((acc, { attributePath, type }) =>
              attributePath === attribute.content.jsonPath ? type : acc, TableSortOrders.NO_SORT),
          }]
        }
      }
      // ignored attribute
      return allColumns
    }, [])

  buildAttrRegroupementColumns = (attributesRegroupementsConf, attributeModels) => reduce(attributesRegroupementsConf, (allColumns, attrRegroupementConf) => {
    if (attrRegroupementConf.visibility) {
      // 1 -rebuild attributes
      const attributes = reduce(attrRegroupementConf.attributes, (results, attributeId) => {
        const attribute = find(attributeModels, att => att.content.id === attributeId)
        return attribute ?
          [...results, DamDomain.AttributeModelController.getAttributeAccessPath(attribute)] :
          results
      }, [])
      // 2 - If attributes could be rebuilt, return corresponding columns
      if (attributes && attributes.length) {
        return [...allColumns, {
          label: attrRegroupementConf.label,
          attributes,
          sortable: false,
          order: attrRegroupementConf.order,
        }]
      }
    }
    // ignored regroupement
    return allColumns
  }, [])

  /**
  * Create columns configuration for table view
  * @returns {Array}
  */
  buildListColumns = (tableColumns, { attributeModels, viewObjectType, onSetEntityAsTag, onStartSelectionService }) => [{
    label: 'ListviewCell',
    attributes: [],
    customCell: {
      component: ListViewEntityCellContainer,
      props: {
        // click: select a dataset when in dataset mode
        onSearchEntity: viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATASET ? onSetEntityAsTag : null,
        attributes: attributeModels,
        tableColumns,
        onServiceStarted: onStartSelectionService,
        displayCheckbox: viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA,
      },
    },
  }]

  /**
  * Updates component state: stores in state the graphics variable computed from new properties, to avoid render time computing
  * @param oldProperties old properties
  * @param newProperties new properties
  */
  updateState = (oldProperties, newProperties) => {
    const oldState = this.state
    const newState = oldState || {}

    if (newProperties.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA) {
      // table columns
      newState.tableColumns = this.buildTableColumns(newProperties.attributesConf, newProperties.attributeModels, newProperties.attributesRegroupementsConf, newProperties.sortingOn, true)
      // list columns
      newState.listColumns = this.buildListColumns(newState.tableColumns, newProperties)
    } else {
      // table columns
      newState.tableColumns = this.buildTableColumns(newProperties.datasetAttributesConf, newProperties.attributeModels, [], [], false)
      // list columns
      newState.listColumns = this.buildListColumns(newState.tableColumns, newProperties)
    }

    // update state when changed
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /** @return {boolean} true if currently displaying dataobjects */
  isDisplayingDataobjects = () => this.props.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA

  /** @return {boolean} true if currently in list view */
  isInListView = () => this.props.viewMode === DisplayModeEnum.LIST

  /** @return {boolean} true if currently in table view */
  isInTableView = () => this.props.viewMode === DisplayModeEnum.TABLE

  /**
   * Returns result tabs actions for results table
   */
  renderTableTabs = () => {
    const { intl: { formatMessage } } = this.context
    const { onShowDatasets, onShowDataobjects, displayDatasets } = this.props
    // show tabs only when datasets are displayed
    return displayDatasets ? [
      <FlatButton
        key="datasets.tab"
        label={formatMessage({ id: 'navigation.datasets.label' })}
        onTouchTap={onShowDatasets}
        icon={<DatasetLibrary />}
        secondary={!this.isDisplayingDataobjects()}
      />,
      <FlatButton
        key="dataobjects.tab"
        label={formatMessage({ id: 'navigation.dataobjects.label' })}
        onTouchTap={onShowDataobjects}
        icon={<DataLibrary />}
        secondary={this.isDisplayingDataobjects()}
      />,
    ] : []
  }

  /**
   * Renders table context options
   * @return rendered options list
   */
  renderTableContextOptions = () => {
    const { allowingFacettes, showingFacettes, onToggleShowFacettes,
      selectionServices, onStartSelectionService, onAddSelectionToCart } = this.props
    const { tableColumns } = this.state
    const { intl: { formatMessage } } = this.context

    return [
      //  Selection services
      ...selectionServices.map(service => (
        <SelectionServiceComponent
          key={`${service.content.type}.service.${service.content.configId}`}
          service={service}
          onRunService={onStartSelectionService}
        />)),
      <ShowableAtRender show={!!selectionServices.length} key="services.separator">
        <TableOptionsSeparator />
      </ShowableAtRender>,
      // List view option select all and sort options
      <ShowableAtRender show={this.isInListView() && this.isDisplayingDataobjects()} key="select.filter.option">
        <TableSelectAllContainer pageSelectors={searchSelectors} />
      </ShowableAtRender>,
      <ShowableAtRender show={this.isInListView() && this.isDisplayingDataobjects()} key="sort.filter.option" >
        <TableSortFilterComponent
          key="sort.filter.option"
          onSortByColumn={this.onSortByColumn}
          tableColumns={tableColumns}
          prefixLabel={formatMessage({ id: 'list.sort.prefix.label' })}
          noneLabel={formatMessage({ id: 'list.sort.none.label' })}
        />
      </ShowableAtRender>,
      // separator, if required
      <ShowableAtRender
        show={this.isInListView() && this.isDisplayingDataobjects() && allowingFacettes}
        key="list.options.separator"
      >
        <TableOptionsSeparator />
      </ShowableAtRender>,
      // Add selection to cart option
      <ShowableAtRender show={!!onAddSelectionToCart} key="add.selection.to.cart">
        <AddSelectionToCartComponent onAddSelectionToCart={onAddSelectionToCart} />
      </ShowableAtRender>,
      // facets option
      <ShowableAtRender
        key="facet.filter.option"
        show={allowingFacettes && this.isDisplayingDataobjects()}
      >
        <FlatButton
          label={formatMessage({ id: 'navigation.filter.by.facets' })}
          onTouchTap={onToggleShowFacettes}
          icon={<ShowFacetsSearch />}
          secondary={showingFacettes}
        />
      </ShowableAtRender>,
      // note : more option button is rendered by the table pane directly
    ]
  }

  /**
   * Returns options for results table
   */
  renderTableRightSideOptions = () => {
    const { onShowTableView, onShowListView } = this.props
    const { intl: { formatMessage } } = this.context

    const iconListStyle = { width: 33, height: 33 }
    const iconTableStyle = { width: 30, height: 30 }
    const buttonStyle = { minWidth: 45 }

    return [
      // list view mode button
      <FlatButton
        key="view.type.list"
        onTouchTap={onShowListView}
        icon={<ListView
          style={iconListStyle}
        />}
        secondary={this.isInListView()}
        style={buttonStyle}
        title={formatMessage({ id: 'view.type.list.button.label' })}
      />,
      // table view button mode
      <FlatButton
        key="view.type.table"
        onTouchTap={onShowTableView}
        icon={<TableView
          style={iconTableStyle}
        />}
        secondary={this.isInTableView()}
        style={buttonStyle}
        title={formatMessage({ id: 'view.type.table.button.label' })}
      />,
    ]
  }

  /**
   * Returns contextual table header (shows facet or default)
   */
  renderTableHeaderArea = () => {
    const { appName, project, allowingFacettes, showingFacettes, attributeModels, filters, onFiltersChanged } = this.props

    // when in facet mode, render facet module
    if (this.isDisplayingDataobjects() && allowingFacettes && showingFacettes) {
      // when facettes are allowed and visible, use facets module as table header
      const searchFacetsModule = {
        type: 'search-facets',
        active: true,
        applicationId: appName,
        conf: {
          onFiltersChanged,
          filters,
          show: showingFacettes,
          resultsSelectors: searchSelectors,
          attributeModels,
        },
      }
      return (
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={searchFacetsModule}
        />)
    }
    // when in default mode, let table render results count
    return null
  }

  render() {
    const { moduleTheme: { user: { listViewStyles } }, intl: { formatMessage } } = this.context
    const { searchQuery, viewObjectType, resultPageActions } = this.props
    const { tableColumns, listColumns } = this.state

    const pageSize = 13
    let columns = []
    let lineHeight
    let cellsStyle
    let displayColumnsHeader
    let displayCheckbox
    let showParameters
    let minRowCounts = 0
    if (this.isInTableView()) {
      minRowCounts = pageSize
      columns = tableColumns
      lineHeight = 50
      cellsStyle = null
      displayColumnsHeader = true
      showParameters = true
      displayCheckbox = this.isDisplayingDataobjects()
    } else {
      columns = listColumns
      lineHeight = 160
      cellsStyle = listViewStyles.cell
      displayColumnsHeader = false
      showParameters = false
      displayCheckbox = false
    }

    const requestParams = { queryParams: searchQuery }

    const tableConfiguration = {
      displayColumnsHeader,
      cellsStyle,
      lineHeight,
      displayCheckbox,
      displaySelectAll: this.isDisplayingDataobjects(),
      onSortByColumn: this.onSortByColumn,
    }

    const tablePaneConfiguration = {
      resultsTabsButtons: this.renderTableTabs(),
      customTableOptions: this.renderTableRightSideOptions(),
      contextOptions: this.renderTableContextOptions(),
      customTableHeaderArea: this.renderTableHeaderArea(),
      displayTableHeader: true,
      displaySortFilter: true,
      showParameters,
    }

    const emptyComponent = <NoContentComponent title={formatMessage({ id: 'results.no.content.title' })} message={formatMessage({ id: 'results.no.content.subtitle' })} Icon={Disatisfied} />

    return (
      <TableContainer
        key={viewObjectType} // unmount the table when change entity type (using key trick)
        pageActions={resultPageActions}
        pageSelectors={searchSelectors}
        tableActions={TableClient.tableActions}
        tableSelectors={TableClient.tableSelectors}
        pageSize={pageSize}
        minRowCounts={minRowCounts}
        columns={columns}
        requestParams={requestParams}
        tableConfiguration={tableConfiguration}
        tablePaneConfiguration={tablePaneConfiguration}
        emptyComponent={emptyComponent}
      />
    )
  }
}

export default SearchResultsComponent
