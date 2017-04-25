/**
 * LICENSE_PLACEHOLDER
 **/
import sortBy from 'lodash/sortBy'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import concat from 'lodash/concat'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import values from 'lodash/values'
import remove from 'lodash/remove'
import { browserHistory } from 'react-router'
import { Card, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import ShowFacetsSearch from 'material-ui/svg-icons/action/find-in-page'
import { LazyModuleComponent } from '@regardsoss/modules'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { TableContainer, TableSelectionModes, ShowableAtRender } from '@regardsoss/components'
import {
  AttributeModel,
  AttributeModelController,
  AttributeConfiguration,
  AttributeConfigurationController,
  AttributesRegroupementConfiguration,
  SearchResultsTargetsEnum,
} from '@regardsoss/model'
import { getTypeRender } from '@regardsoss/attributes-common'
import CatalogEntitySelector from '../../models/catalog/CatalogEntitySelector'
import CatalogDataobjectEntityActions from '../../models/catalog/CatalogDataobjectEntityActions'
import CatalogDatasetEntityActions from '../../models/catalog/CatalogDatasetEntityActions'
import NavigationComponent from './NavigationComponent'
import DatasetCellComponent from './DatasetCellComponent'

/**
 * React container to manage search requests and display results.
 * Search queries are generated by the FormComponent and used by this container.
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    enableFacettes: React.PropTypes.bool.isRequired,
    searchQuery: React.PropTypes.string,
    facettesQuery: React.PropTypes.string,
    attributesConf: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributeModels: React.PropTypes.objectOf(AttributeModel),
    hideDatasets: React.PropTypes.bool.isRequired,
    target: React.PropTypes.oneOf(values(SearchResultsTargetsEnum)).isRequired,
    // Fixed breadcrumb depending on search current context.
    breadcrumbInitialContextLabel: React.PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      sortedColumns: [],
      target: props.target,
      selectedDataset: null,
      showingFacetsSearch: false,
      filters: [],
      searchTag: undefined,
    }
  }

  componentWillMount() {
    this.updateFromUrlQuery()
  }

  componentWillReceiveProps(nextProps) {
    this.updateFromUrlQuery()
  }

  /**
   * Action to add target parameter to current search request
   * @param target
   */
  onChangeTarget = (target) => {
    const queries = browserHistory.getCurrentLocation().query
    browserHistory.push({
      pathname: browserHistory.getCurrentLocation().pathname,
      query: merge({}, queries, { t: target }),
    })
    this.setState({ target })
  }

  onFiltersChanged = (filters = []) => {
    this.setState({ filters })
  }

  /**
   * Unselect current selected dataset.
   */
  onUnselectDataset = (target) => {
    this.selectDataset(null, target)
  }

  onClickDatasetTarget = () => {
    this.onChangeTarget(SearchResultsTargetsEnum.DATASET_RESULTS)
  }

  onClickDataobjectsTarget = () => {
    this.onChangeTarget(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)
  }

  /**
   * Unselect all previous selections (datasets and tags)
   */
  onUnselectAll = () => {
    this.selectDataset(null, SearchResultsTargetsEnum.DATAOBJECT_RESULTS)
    this.searchTag(undefined)
  }

  /**
   * Create full query by adding sort options and target options
   * @returns {string}
   */
  getFullQuery = () => {
    const { searchQuery, facettesQuery } = this.props
    const { showingFacetsSearch } = this.state
    // Get query with search parameters (apply search filter facets too)
    const openSearchSeparator = ' AND '
    let fullQuery = searchQuery || ''
    if (this.isInObjectMode() && showingFacetsSearch) {
      // add object filters
      fullQuery = this.state.filters.reduce((queryAcc, { openSearchQuery }) =>
        `${queryAcc}${queryAcc ? openSearchSeparator : ''}${openSearchQuery}`, fullQuery)
    }

    // If any dataset is associated to the current search, add there urn into tags property
    if (this.state.selectedDataset) {
      if (fullQuery !== '') {
        fullQuery = `${fullQuery}${fullQuery ? openSearchSeparator : ''}tags:${this.state.selectedDataset.content.ipId}`
      } else {
        fullQuery = `tags:${this.state.selectedDataset.content.ipId}`
      }
    }

    /**
     * Is there a tag selected ?
     */
    if (this.state.searchTag) {
      if (fullQuery !== '') {
        fullQuery = `${fullQuery}${fullQuery ? openSearchSeparator : ''}tags:${this.state.searchTag}`
      } else {
        fullQuery = `tags:${this.state.searchTag}`
      }
    }
    if (fullQuery !== '') {
      fullQuery = this.formatSearchQuery(fullQuery)
    }

    // If the search need to be sorted, add sort parameters
    if (this.state.sortedColumns.length > 0) {
      const fullSortQuery = reduce(this.state.sortedColumns, (sortQuery, column) => {
        let queryString = sortQuery
        if (column.attribute) {
          queryString = `${queryString}&sort=${column.attribute}`
          if (column.type) {
            queryString = `${queryString},${column.type}`
          }
        }
        return queryString
      }, '')


      if (fullSortQuery.length > 0) {
        fullQuery = `${fullQuery}${fullSortQuery}`
      }
    }

    // If there is facets to generate add them
    if (facettesQuery) {
      fullQuery = `${fullQuery}&${facettesQuery}`
    }

    // return full query
    return fullQuery
  }

  /**
   * Create columns configuration for the dataobject entities table result component using the given props
   * attributesConf and attributesRegroupementsConf.
   *
   * @returns {Array}
   */
  getDataObjectsColumns = () => {
    const columns = []
    // Read module configuration to get attributes to display
    const sorted = sortBy(this.props.attributesConf, a => a.order ? a.order : 0)
    forEach(sorted, (attributeConf) => {
      if (attributeConf.visibility === true) {
        let attribute
        let fullyQualifiedAttributePathInEntity

        // Check if attribute is a standard attribute
        if (AttributeConfigurationController.isStandardAttribute(attributeConf)) {
          // If attribute is a standard attribute, generate special configuration because those attributes
          // are not AttributeModels. Thoses attributes are not defined in the entity model.
          attribute = AttributeConfigurationController.getStandardAttributeConf(attributeConf.attributeFullQualifiedName)
          // Get the attribute path in the results entities.
          fullyQualifiedAttributePathInEntity = AttributeModelController.getStandardAttributeEntityPathName(attributeConf.attributeFullQualifiedName)
        } else {
          // Else, search AttributeModel associated to the attributeConfiguration
          attribute = find(this.props.attributeModels,
            att => AttributeModelController.getAttributeFullyQualifiedName(att) === attributeConf.attributeFullQualifiedName)
          // Calculate attribute path in entity with fragment management.
          // The path is like properties.<fragment>.<name> or properties.<name> if framment is default
          fullyQualifiedAttributePathInEntity = attribute ?
            AttributeModelController.getAttributeFullyQualifiedNameWithoutDefaultFragment(attribute) : null
        }
        if (attribute) {
          const customCell = getTypeRender(attribute.content.type)
          const isSpecialAttr =
            attribute.content.type === AttributeModelController.ATTRIBUTE_TYPES.THUMBMAIL ||
            attribute.content.type === AttributeModelController.ATTRIBUTE_TYPES.DOWNLOAD_LINK
          const columnConf = {
            label: attribute.content.label,
            attributes: [fullyQualifiedAttributePathInEntity],
            sortable: !isSpecialAttr,
            hideLabel: isSpecialAttr,
            fixed: isSpecialAttr ? 50 : undefined,
            customCell: customCell ? {
              component: customCell,
              props: {},
            } : undefined,
          }
          columns.push(columnConf)
        }
      }
    })

    // Read module configuration to get attributes regroupements to display
    forEach(this.props.attributesRegroupementsConf, (attributeConf) => {
      if (attributeConf.visibility === true) {
        const attributes = reduce(attributeConf.attributes, (results, attributeId) => {
          const attribute = find(this.props.attributeModels, att => att.content.id === attributeId)
          if (attribute) {
            results.push(AttributeModelController.getAttributeFullyQualifiedNameWithoutDefaultFragment(attribute))
          }
          return results
        }, [])
        if (attributes && attributes.length > 0) {
          columns.push({
            label: attributeConf.label,
            attributes,
            sortable: false,
          })
        }
      }
    })
    return columns
  }

  /**
   * Create columns configuration for dataset entities table result component
   * @returns {Array}
   */
  getDataSetsColumns = () => {
    const columns = []
    columns.push({
      label: 'Dataset cell',
      attributes: [],
      customCell: {
        component: DatasetCellComponent,
        props: {
          onClick: this.selectDataset,
          attributes: this.props.attributeModels,
          styles: this.context.moduleTheme.user.datasetCells,
          onSearchTag: this.searchTag,
        },
      },
    })
    return columns
  }

  /**
   * Callback when an entity checkbox is modified.
   * @param selectionMode: selection mode, from Table (one of TableSelectionModes.select and TableSelectionModes.deselect)
   * @param entities: selected entities when in select mode, deselected entities when in deselected mode
   */
  resultSelection = (selectionMode, entities) => {
    // TODO Manage entities selection / deselection
    switch (selectionMode) {
      case TableSelectionModes.includeSelected:
        console.log('Include entities => ', entities)
        break
      case TableSelectionModes.excludeSelected:
      default:
        console.log('Exlude entities => ', entities)
        break
    }
  }

  /**
   * Function to add sort parameters to the current search request with the given attributes from columns.
   * @param column
   * @param type
   */
  sortResultsByColumn = (column, type) => {
    const attributeToSort = column.attributes[0]
    const sortedColumns = concat([], this.state.sortedColumns)
    const col = find(sortedColumns, lcol => lcol.attribute === attributeToSort)
    if (!col) {
      sortedColumns.push({
        attribute: attributeToSort,
        type,
      })
    } else {
      switch (type) {
        case 'ASC':
          col.type = 'ASC'
          break
        case 'DESC':
          col.type = 'DESC'
          break
        default:
          remove(sortedColumns, lcol => lcol.attribute === attributeToSort)
      }
    }
    this.setState({ sortedColumns })
  }


  isInObjectMode = () => this.state.target === SearchResultsTargetsEnum.DATAOBJECT_RESULTS

  /**
   * Format the given search query for opensearch format
   * @param query
   * @returns {string}
   */
  formatSearchQuery = query => `q=(${query})`

  /**
   * Update component state by reading specifics query parameters
   */
  updateFromUrlQuery = () => {
    // Read query parameters form current URL
    const query = browserHistory ? browserHistory.getCurrentLocation().query : null
    if (query && query.t && this.state.target !== query.t) {
      this.onChangeTarget(query.t)
    }
    if (query && query.ds && this.state.selectedDataset !== query.ds) {
      // TODO fetch dataset from server and select it
    }

    if (query && query.tag) {
      this.setState({ searchTag: query.tag })
    } else {
      this.setState({ searchTag: undefined })
    }
    if (query && !query.ds && this.state.selectedDataset) {
      this.setState({ selectedDataset: null })
    }
  }

  /**
   * Run a new search with the give tag
   * @param tag
   */
  searchTag = (tag) => {
    let queries = browserHistory.getCurrentLocation().query
    if (tag) {
      queries = merge({}, queries, { tag })
    } else {
      queries = omit(queries, ['tag'])
    }
    this.setState({
      searchTag: tag,
    }, () => {
      browserHistory.push({
        pathname: browserHistory.getCurrentLocation().pathname,
        query: queries,
      })
    })
  }

  /**
   * Callback when a dataset is selected.
   * Add the urn of the dataset in the search query and switch to data objects view
   * @param dataset
   */
  selectDataset = (dataset, target) => {
    let queries = browserHistory.getCurrentLocation().query
    queries = merge({}, queries, { t: target || SearchResultsTargetsEnum.DATAOBJECT_RESULTS })

    if (dataset && dataset.content && dataset.content.ipId) {
      browserHistory.push({
        pathname: browserHistory.getCurrentLocation().pathname,
        query: merge({}, queries, { ds: dataset.content.ipId }),
      })
    } else if (dataset === null) {
      browserHistory.push({
        pathname: browserHistory.getCurrentLocation().pathname,
        query: omit(queries, ['ds']),
      })
    } else {
      throw new Error('Error no valid dataset selected')
    }
    this.setState({
      selectedDataset: dataset,
      searchTag: undefined,
    })
  }

  toggleShowFacetsSearch = () => {
    this.setState({
      showingFacetsSearch: !this.state.showingFacetsSearch,
    })
  }

  /**
   * Returns result tabs actions for results table
   */
  renderTableTabs = () => {
    const { intl: { formatMessage } } = this.context
    const { hideDatasets } = this.props
    return [
      <FlatButton
        key="dataobjects.tab"
        label={formatMessage({ id: 'navigation.dataobjects.label' })}
        onTouchTap={this.onClickDataobjectsTarget}
        icon={<DataLibrary />}
        secondary={this.isInObjectMode()}
      />,
      <FlatButton
        key="datasets.tab"
        label={formatMessage({ id: 'navigation.datasets.label' })}
        onTouchTap={this.onClickDatasetTarget}
        icon={<DatasetLibrary />}
        secondary={!this.isInObjectMode()}
        disabled={hideDatasets}
      />,
    ]
  }

  /**
   * Returns options for results table
   */
  renderTableOptions = () => {
    const { enableFacettes } = this.props
    const { showingFacetsSearch } = this.state
    const { intl: { formatMessage } } = this.context
    return [
      <ShowableAtRender
        key="facet.filter.option"
        show={enableFacettes && this.isInObjectMode()}
      >
        <FlatButton
          label={formatMessage({ id: 'navigation.filter.by.facets' })}
          onTouchTap={this.toggleShowFacetsSearch}
          icon={<ShowFacetsSearch />}
          secondary={showingFacetsSearch}
        />
      </ShowableAtRender>,
    ]
  }

  /**
   * Returns dedicated facets filtering area (when shown)
   */
  renderTableFacets = () => {
    const { showingFacetsSearch, filters } = this.state
    if (!showingFacetsSearch) {
      // switch to default table hedaer display when not showing filters
      return null
    }
    const { appName, project, attributeModels } = this.props
    const searchFacetsModule = {
      name: 'search-facets',
      active: true,
      applicationId: appName,
      conf: {
        onFiltersChanged: this.onFiltersChanged,
        filters,
        show: showingFacetsSearch && this.isInObjectMode(),
        resultsSelectors: CatalogEntitySelector,
        attributeModels,
      },
    }
    return (<LazyModuleComponent
      project={project}
      appName={appName}
      module={searchFacetsModule}
    />)
  }

  render() {
    const { moduleTheme: { datasetCellStyles } } = this.context
    const { target, selectedDataset } = this.state

    let columns = []
    let lineHeight
    let cellsStyle
    let tableHeaderArea
    let displayCheckbox
    let displayColumnsHeader
    let showParameters
    if (this.isInObjectMode()) {
      columns = this.getDataObjectsColumns()
      lineHeight = 50
      cellsStyle = null
      tableHeaderArea = this.renderTableFacets()
      displayCheckbox = true
      displayColumnsHeader = true
      showParameters = true
    } else {
      columns = this.getDataSetsColumns()
      lineHeight = 160
      cellsStyle = datasetCellStyles
      tableHeaderArea = null // default header display
      displayCheckbox = false
      displayColumnsHeader = false
      showParameters = false
    }

    const entityAction = target === SearchResultsTargetsEnum.DATAOBJECT_RESULTS ? CatalogDataobjectEntityActions : CatalogDatasetEntityActions

    return (
      <Card>
        <NavigationComponent
          breadcrumbInitialContextLabel={this.props.breadcrumbInitialContextLabel}
          selectedTag={this.state.searchTag}
          onUnselectDataset={this.onUnselectDataset}
          onUnselectAll={this.onUnselectAll}
          selectedDataset={selectedDataset}
        />
        <CardMedia>
          <TableContainer
            key={target}
            PageActions={entityAction}
            PageSelector={CatalogEntitySelector}
            pageSize={20}
            displayCheckbox={displayCheckbox}
            columns={columns}
            onSelectionChange={this.resultSelection}
            requestParams={{ queryParams: this.getFullQuery() }}
            tableConfiguration={{
              displayColumnsHeader,
              cellsStyle,
              lineHeight,
              displayCheckbox,
              onSortByColumn: this.sortResultsByColumn,
            }}
            tablePaneConfiguration={{
              resultsTabsButtons: this.renderTableTabs(),
              customTableOptions: this.renderTableOptions(),
              customTableHeaderArea: tableHeaderArea,
              displayTableHeader: true,
              showParameters,
            }}
          />
        </CardMedia>
      </Card>
    )
  }
}

export default SearchResultsComponent
