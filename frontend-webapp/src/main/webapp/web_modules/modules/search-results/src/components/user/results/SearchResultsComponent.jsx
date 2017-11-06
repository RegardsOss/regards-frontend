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
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import Disatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PageableInfiniteTableContainer, TableSortOrders, NoContentComponent } from '@regardsoss/components'
import { DamDomain, AccessDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { BasicFacetsPageableActions } from '@regardsoss/store-utils'
import { getTypeRender } from '@regardsoss/attributes-common'
import { selectors as searchSelectors } from '../../../clients/SearchEntitiesClient'
import TableClient from '../../../clients/TableClient'
import ListViewEntityCellContainer from '../../../containers/user/results/cells/ListViewEntityCellContainer'
import TableViewOptionsCellContainer from '../../../containers/user/results/cells/TableViewOptionsCellContainer'
import SearchResultsTableLayoutContainer from '../../../containers/user/results/SearchResultsTableLayoutContainer'
import DisplayModeEnum from '../../../models/navigation/DisplayModeEnum'

/**
 * React component to manage search requests and display results. It handles locally the columns visible state, considered
 * a graphic state
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {

  static propTypes = {
    // static configuration
    appName: PropTypes.string,
    project: PropTypes.string,
    allowingFacettes: PropTypes.bool.isRequired,
    displayDatasets: PropTypes.bool.isRequired, // TODO directly down?

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
    attributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributesRegroupementsConf: PropTypes.arrayOf(AccessShapes.AttributesGroupConfigurationContent),
    datasetAttributesConf: PropTypes.arrayOf(AccessShapes.AttributeConfigurationContent),
    attributeModels: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    // control
    resultPageActions: PropTypes.instanceOf(BasicFacetsPageableActions).isRequired,
    onFiltersChanged: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    onSetEntityAsTag: PropTypes.func.isRequired,
    onShowDatasets: PropTypes.func.isRequired, // TODO directly down?
    onShowDataobjects: PropTypes.func.isRequired, // TODO directly down?
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onSortChanged: PropTypes.func.isRequired,
    onToggleShowFacettes: PropTypes.func.isRequired,
    // from PluginServicesContainer
    onStartSelectionService: PropTypes.func, // callback to start a selection service
    // from OrderCartContainer
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
   * Lifecycle method component will mout, used here to initialize columns visibilty management
   */
  componentWillMount = () => this.onPropertiesUpdate(this.props)

  /**
   * component will receive props, used here to update columns visibility management
   * @param {*} nextProps next properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdate(nextProps, this.props)

  /**
   * On properties changed: detect if hidden columns model should be reset
   * @param newProps new component properties
   * @param oldProps previous component properties (optional)
   */
  onPropertiesUpdate = (newProps, oldProps = {}) => {
    if (newProps.viewMode !== oldProps.viewMode || newProps.viewObjectType !== oldProps.viewObjectType) {
      // columns will change, reset columns model
      this.setHiddenColumns([])
    }
  }

  /**
   * User updated columns visibilty, report it in state
   */
  onChangeColumnsVisibility = hiddenColumns => this.setHiddenColumns(hiddenColumns)

  /**
   * Sorting adaptation for parent container (to avoid runtime lambdas)
   */
  onSortByColumn = (column, type, clear) => {
    this.props.onSortChanged(column ? column.attributes[0] : null, type, clear)
  }

  /**
   * Sets hidden columns
   * @param {[string]} hiddenColumns hidden columns label array
   */
  setHiddenColumns = hiddenColumns => this.setState({ hiddenColumns })

  /**
   * Builds table columns
   * @param props : props map, to retrieve current properties
   */
  buildTableColumns = ({ attributesConf, attributeModels, attributesRegroupementsConf, sortingOn, onAddElementToCart, viewObjectType }) =>
    sortBy([
      ...this.buildAttributesColumns(attributesConf, attributeModels, sortingOn, SearchResultsComponent.hasSorting(viewObjectType)),
      ...this.buildAttrRegroupementColumns(attributesRegroupementsConf, attributeModels),
      this.buildTableOptionsColumn(onAddElementToCart, SearchResultsComponent.hasServices(viewObjectType))],
      a => a.order ? a.order : 1000)

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
          const label = attribute.content.label
          return [...allColumns, {
            label,
            attributes: [attribute.content.jsonPath],
            sortable: !isSpecialAttr && enableSorting,
            hideLabel: isSpecialAttr,
            fixed: isSpecialAttr ? this.context.muiTheme['components:infinite-table'].fixedColumnsWidth : undefined,
            customCell: customCell ? {
              component: customCell,
              props: {},
            } : undefined,
            order: attributeConf.order,
            // retrieve column sorting in current state
            sortingOrder: sortingOn.reduce((acc, { attributePath, type }) =>
              attributePath === attribute.content.jsonPath ? type : acc, TableSortOrders.NO_SORT),
            visible: this.isColumnVisible(label),
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
        const label = attrRegroupementConf.label
        return [...allColumns, {
          label,
          attributes,
          sortable: false,
          order: attrRegroupementConf.order,
          visible: this.isColumnVisible(label),
        }]
      }
    }
    // ignored regroupement
    return allColumns
  }, [])

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
  isColumnVisible = columnLabel => !this.state.hiddenColumns.includes(columnLabel)

  /** @return {boolean} true if currently displaying dataobjects */
  // TODO still required?
  isDisplayingDataobjects = () => this.props.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA

  /** @return {boolean} true if currently in list view */ // TODO remove?
  isInListView = () => this.props.viewMode === DisplayModeEnum.LIST

  /** @return {boolean} true if currently in table view */
  isInTableView = () => this.props.viewMode === DisplayModeEnum.TABLE


  render() {
    const { moduleTheme: { user: { listViewStyles } }, intl: { formatMessage }, muiTheme } = this.context
    const { appName, project, attributeModels, displayDatasets, searchQuery, viewObjectType, viewMode, resultPageActions,
      allowingFacettes, showingFacettes, filters, selectionServices, onAddSelectionToCart, onFiltersChanged,
      onShowDatasets, onShowDataobjects, onShowTableView, onShowListView, onStartSelectionService, onToggleShowFacettes } = this.props
    const { hiddenColumns } = this.state
    const tableTheme = muiTheme['components:infinite-table']

    // build table columns
    const tableColumns = this.buildTableColumns(this.props)

    const pageSize = 13 // TODO what?
    let columns = []
    let lineHeight
    let cellsStyle
    let displayColumnsHeader
    let displayCheckbox
    let minRowCount

    if (this.isInTableView()) {
      minRowCount = tableTheme.minRowCount
      columns = tableColumns
      lineHeight = tableTheme.lineHeight
      cellsStyle = null
      displayColumnsHeader = true
      displayCheckbox = this.isDisplayingDataobjects()
    } else { // use list columns
      minRowCount = tableTheme.listMinRowCount
      columns = this.buildListColumns(tableColumns, this.props)
      lineHeight = tableTheme.listLineHeight
      cellsStyle = listViewStyles.cell
      displayColumnsHeader = false
      displayCheckbox = false
    }

    const requestParams = { queryParams: searchQuery }

    const tableConfiguration = {
      displayColumnsHeader,
      cellsStyle,
      lineHeight,
      displayCheckbox,
      minRowCount,
      displaySelectAll: this.isDisplayingDataobjects(),
      onSortByColumn: this.onSortByColumn,
    }

    const emptyComponent = <NoContentComponent title={formatMessage({ id: 'results.no.content.title' })} message={formatMessage({ id: 'results.no.content.subtitle' })} Icon={Disatisfied} />
    return (
      // Table layout and header
      <SearchResultsTableLayoutContainer
        appName={appName} // TODO delete!
        project={project}
        attributeModels={attributeModels}
        displayDatasets={displayDatasets}
        viewObjectType={viewObjectType}
        viewMode={viewMode}
        searchSelectors={searchSelectors}
        allowingFacettes={allowingFacettes}
        showingFacettes={showingFacettes}
        filters={filters}
        tableColumns={tableColumns}
        hiddenColumns={hiddenColumns}

        selectionServices={selectionServices}

        onAddSelectionToCart={onAddSelectionToCart}
        onChangeColumnsVisibility={this.onChangeColumnsVisibility}
        onFiltersChanged={onFiltersChanged}
        onShowDatasets={onShowDatasets}
        onShowDataobjects={onShowDataobjects}
        onShowTableView={onShowTableView}
        onShowListView={onShowListView}
        onSortByColumn={this.onSortByColumn}
        onStartSelectionService={onStartSelectionService}
        onToggleShowFacettes={onToggleShowFacettes}
      >
        {/* Table content */}
        <PageableInfiniteTableContainer
          key={viewObjectType} // unmount the table when change entity type (using key trick)
          tableConfiguration={tableConfiguration}
          pageSize={pageSize}
          pageActions={resultPageActions}
          pageSelectors={searchSelectors}
          tableActions={TableClient.tableActions}
          tableSelectors={TableClient.tableSelectors}
          columns={columns}
          requestParams={requestParams}
          emptyComponent={emptyComponent}
        />
      </SearchResultsTableLayoutContainer>
    )
  }
}

export default SearchResultsComponent
