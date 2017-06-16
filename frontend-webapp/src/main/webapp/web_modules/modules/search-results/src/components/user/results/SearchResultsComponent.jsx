/**
 * LICENSE_PLACEHOLDER
 **/
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import ListView from 'material-ui/svg-icons/action/list'
import TableView from 'material-ui/svg-icons/action/view-module'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import ShowFacetsSearch from 'material-ui/svg-icons/action/find-in-page'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { TableContainer, TableOptionsSeparator, ShowableAtRender, TableSortOrders } from '@regardsoss/components'
import { LazyModuleComponent } from '@regardsoss/modules'
import {
  AttributeModel,
  AttributeModelController,
  AttributeConfiguration,
  AttributeConfigurationController,
  AttributesRegroupementConfiguration,
} from '@regardsoss/model'
import { BasicFacetsPageableActions } from '@regardsoss/store-utils'
import { getTypeRender } from '@regardsoss/attributes-common'
import { selectors as searchSelectors } from '../../../clients/SearchEntitiesClient'
import TableClient from '../../../clients/TableClient'
import Service from '../../../definitions/service/Service'
import ListViewEntityCellContainer from '../../../containers/user/results/ListViewEntityCellContainer'
import TableSortFilterComponent from './options/TableSortFilterComponent'
import TableSelectAllContainer from '../../../containers/user/results/options/TableSelectAllContainer'
import SelectionServiceComponent from './options/SelectionServiceComponent'
import ServiceIconComponent from './options/ServiceIconComponent'
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
    showingDataobjects: PropTypes.bool.isRequired,     // is Currently showing data objects (false: showing datasets)
    viewMode: PropTypes.oneOf([DisplayModeEnum.LIST,DisplayModeEnum.TABLE]), // current mode
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
    datasetServices: PropTypes.arrayOf(PropTypes.instanceOf(Service)).isRequired,
    selectedDataobjectsServices: PropTypes.arrayOf(PropTypes.instanceOf(Service)).isRequired,


    // Attributes configurations for results columns
    // eslint-disable-next-line react/no-unused-prop-types
    attributesConf: PropTypes.arrayOf(AttributeConfiguration),
    // eslint-disable-next-line react/no-unused-prop-types
    attributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributeModels: PropTypes.objectOf(AttributeModel),

    // control
    resultPageActions: PropTypes.instanceOf(BasicFacetsPageableActions).isRequired,
    onFiltersChanged: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    onSelectDataset: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    onSelectSearchTag: PropTypes.func.isRequired,
    onShowDatasets: PropTypes.func.isRequired,
    onShowDataobjects: PropTypes.func.isRequired,
    onShowListView: PropTypes.func.isRequired,
    onShowTableView: PropTypes.func.isRequired,
    onSortChanged: PropTypes.func.isRequired,
    onToggleShowFacettes: PropTypes.func.isRequired,

    onDatasetServiceSelected: PropTypes.func.isRequired, // (service) => void
    onSelectionServiceSelected: PropTypes.func.isRequired, // (service) => void
    // eslint-disable-next-line react/no-unused-prop-types
    onDataobjectServiceSelected: PropTypes.func.isRequired, // (service, dataobject) => void TODO next versions: use
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

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
  buildTableColumns = (attributesConf, attributeModels, attributesRegroupementsConf, sortingOn) =>
    sortBy([
      ...this.buildAttributesColumns(attributesConf, attributeModels, sortingOn),
      ...this.buildAttrRegroupementColumns(attributesRegroupementsConf, attributeModels)], a => a.order ? a.order : 1000)

  buildAttributesColumns = (attributesConf, attributeModels, sortingOn) =>
    reduce(attributesConf, (allColumns, attributeConf) => {
      // map to attributes models then to column
      if (attributeConf.visibility) {
        let attribute
        let fullyQualifiedAttributePathInEntity
        if (AttributeConfigurationController.isStandardAttribute(attributeConf)) {
          // standard attribute
          attribute = AttributeConfigurationController.getStandardAttributeConf(attributeConf.attributeFullQualifiedName)
          fullyQualifiedAttributePathInEntity = AttributeModelController.getStandardAttributeEntityPathName(attributeConf.attributeFullQualifiedName)
        } else {
          // maybe dynamic attribute (if found)
          attribute = find(attributeModels,
            att => AttributeModelController.getAttributeAccessPath(att) === attributeConf.attributeFullQualifiedName)
          fullyQualifiedAttributePathInEntity = attribute ?
            AttributeModelController.getAttributeAccessPath(attribute) : null
        }
        // when found, add the corresponding column
        if (attribute) {
          const customCell = getTypeRender(attribute.content.type)
          const isSpecialAttr =
            attribute.content.type === AttributeModelController.ATTRIBUTE_TYPES.THUMBNAIL ||
            attribute.content.type === AttributeModelController.ATTRIBUTE_TYPES.DOWNLOAD_LINK
          return [...allColumns, {
            label: attribute.content.label,
            attributes: [fullyQualifiedAttributePathInEntity],
            sortable: !isSpecialAttr,
            hideLabel: isSpecialAttr,
            fixed: isSpecialAttr ? 50 : undefined,
            customCell: customCell ? {
              component: customCell,
              props: {},
            } : undefined,
            order: attributeConf.order,
            // retrieve column sorting in current state
            sortingOrder: sortingOn.reduce((acc, { attributePath, type }) =>
              attributePath === fullyQualifiedAttributePathInEntity ? type : acc, TableSortOrders.NO_SORT),
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
            [...results, AttributeModelController.getAttributeAccessPath(attribute)] :
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
  buildListColumns = (tableColumns, { attributeModels, showingDataobjects, onSelectDataset, onSelectSearchTag }) => [{
    label: 'ListviewCell',
    attributes: [],
    customCell: {
      component: ListViewEntityCellContainer,
      props: {
        // click: select a dataset when in dataset mode
        onClick: showingDataobjects ? null : onSelectDataset,
        attributes: attributeModels,
        styles: this.context.moduleTheme.user.listViewStyles,
        onSearchTag: onSelectSearchTag,
        tableColumns: showingDataobjects ? tableColumns : undefined,
        displayCheckBox: showingDataobjects && this.props.displaySelectCheckboxes,
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

    // table columns
    newState.tableColumns = this.buildTableColumns(newProperties.attributesConf, newProperties.attributeModels, newProperties.attributesRegroupementsConf, newProperties.sortingOn)

    // list columns
    newState.listColumns = this.buildListColumns(newState.tableColumns, newProperties)

    // update state when changed
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  isInListView = () => this.props.viewMode === DisplayModeEnum.LIST

  isInTableView = () => this.props.viewMode === DisplayModeEnum.TABLE

  /**
   * Returns result tabs actions for results table
   */
  renderTableTabs = () => {
    const { intl: { formatMessage } } = this.context
    const { showingDataobjects, onShowDatasets, onShowDataobjects, displayDatasets } = this.props
    // show tabs only when datasets are displayed
    return displayDatasets ? [
      <FlatButton
        key="datasets.tab"
        label={formatMessage({ id: 'navigation.datasets.label' })}
        onTouchTap={onShowDatasets}
        icon={<DatasetLibrary />}
        secondary={!showingDataobjects}
      />,
      <FlatButton
        key="dataobjects.tab"
        label={formatMessage({ id: 'navigation.dataobjects.label' })}
        onTouchTap={onShowDataobjects}
        icon={<DataLibrary />}
        secondary={showingDataobjects}
      />,
    ] : []
  }

  /**
   * Renders table context options (middle area of the header)
   * @return rendered options list
   */
  renderTableContextOptions = () => {
    const { allowingFacettes, showingFacettes, onToggleShowFacettes, displaySelectCheckboxes,
      showingDataobjects, selectedDataobjectsServices, onSelectionServiceSelected } = this.props
    const { tableColumns } = this.state
    const { intl: { formatMessage } } = this.context

    return [
      //  Selection services
      ...selectedDataobjectsServices.map((service, index) => (
        <SelectionServiceComponent
          key={service.serviceKey}
          service={service}
          iconSize={this.context.moduleTheme.user.options.selection.service.iconSize}
          onRunService={onSelectionServiceSelected}
        />)),
      // separator
      selectedDataobjectsServices.length ? <TableOptionsSeparator key="services.options.separator" /> : null,
      // List view optionsselect all and sort options
      this.isInListView() && showingDataobjects && displaySelectCheckboxes ? <TableSelectAllContainer
        key="select.filter.option"
        pageSelectors={searchSelectors}
      /> : null,
      this.isInListView() && showingDataobjects ? <TableSortFilterComponent
        key="sort.filter.option"
        onSortByColumn={this.onSortByColumn}
        tableColumns={tableColumns}
        prefixLabel={formatMessage({ id: 'list.sort.prefix.label' })}
        noneLabel={formatMessage({ id: 'list.sort.none.label' })}
      /> : null,
      // separator
      this.isInListView() && showingDataobjects ? <TableOptionsSeparator key="list.options.separator" /> : null,
      // facets option
      <ShowableAtRender
        key="facet.filter.option"
        show={allowingFacettes && showingDataobjects}
      >
        <FlatButton
          label={formatMessage({ id: 'navigation.filter.by.facets' })}
          onTouchTap={onToggleShowFacettes}
          icon={<ShowFacetsSearch />}
          secondary={showingFacettes}
        />
      </ShowableAtRender>,
      // note : more option is rendered by the table pane directly
    ]
  }

  /**
   * Returns options for results table
   */
  renderTableRightSideOptions = () => {
    const { showingDataobjects, onShowTableView, onShowListView } = this.props
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
        disabled={!showingDataobjects}
        title={formatMessage({ id: 'view.type.table.button.label' })}
      />,
    ]
  }

  /**
   * Renders advanced options (to be shown in 'more' menu)
   */
  renderAdvancedOptions = () => {
    const { datasetServices, onDatasetServiceSelected } = this.props
    // note: it is not possible here to create sub components, as material UI menu will not close anymore...
    // therefore we are obliged here to use lambdas...
    return datasetServices.map(service =>
      (<MenuItem
        key={service.serviceKey}
        value={// Workaround: makes the menu close on item clicked, useless otherwise (crappy material UI)
          'more.option'}
        onTouchTap={() => onDatasetServiceSelected(service)}
        primaryText={service.label}
        icon={
          <ServiceIconComponent
            size={this.context.moduleTheme.user.options.more.service.iconSize}
            iconDescription={service.icon}
          />}
      />),
    )
  }

  /**
   * Returns contextual table header (shows facet or default)
   */
  renderTableHeaderArea = () => {
    const { appName, project, allowingFacettes, showingFacettes,
      showingDataobjects, attributeModels, filters, onFiltersChanged } = this.props

    // when in facet mode, render facet module
    if (showingDataobjects && allowingFacettes && showingFacettes) {
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
    const { moduleTheme: { user: { listViewStyles } } } = this.context
    const { showingDataobjects, viewMode, searchQuery, resultPageActions, displaySelectCheckboxes } = this.props
    const { tableColumns, listColumns } = this.state

    let columns = []
    let lineHeight
    let cellsStyle
    let displayColumnsHeader
    let displayCheckbox
    let showParameters
    if (this.isInTableView() && showingDataobjects) {
      columns = tableColumns
      lineHeight = 50
      cellsStyle = null
      displayColumnsHeader = true
      showParameters = true
      displayCheckbox = displaySelectCheckboxes
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
      displaySelectAll: displaySelectCheckboxes,
      onSortByColumn: this.onSortByColumn,
    }

    const tablePaneConfiguration = {
      resultsTabsButtons: this.renderTableTabs(),
      customTableOptions: this.renderTableRightSideOptions(),
      contextOptions: this.renderTableContextOptions(),
      customTableHeaderArea: this.renderTableHeaderArea(),
      advancedOptions: this.renderAdvancedOptions(),
      displayTableHeader: true,
      displaySortFilter: true,
      showParameters,
    }

    return (
      <TableContainer
        key={`${showingDataobjects ? 'do' : 'ds'}-${viewMode}`}
        pageActions={resultPageActions}
        pageSelectors={searchSelectors}
        tableActions={TableClient.tableActions}
        tableSelectors={TableClient.tableSelectors}
        pageSize={20}
        columns={columns}
        requestParams={requestParams}
        tableConfiguration={tableConfiguration}
        tablePaneConfiguration={tablePaneConfiguration}
      />
    )
  }
}

SearchResultsComponent.defaultProps = {
  displaySelectCheckboxes: false
}

export default SearchResultsComponent
