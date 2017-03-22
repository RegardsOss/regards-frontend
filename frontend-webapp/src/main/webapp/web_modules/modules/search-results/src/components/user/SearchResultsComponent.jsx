/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import concat from 'lodash/concat'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import values from 'lodash/values'
import remove from 'lodash/remove'
import {browserHistory} from 'react-router'
import {Card, CardMedia} from 'material-ui/Card'
import {LazyModuleComponent} from '@regardsoss/modules'
import {FixedTableContainer, ShowableAtRender} from '@regardsoss/components'
import {
  AttributeModel,
  AttributeConfiguration,
  AttributesRegroupementConfiguration,
  SearchResultsTargetsEnum,
} from '@regardsoss/model'
import CatalogEntitySelector from '../../models/catalog/CatalogEntitySelector'
import CatalogDataobjectEntityActions from '../../models/catalog/CatalogDataobjectEntityActions'
import CatalogDatasetEntityActions from '../../models/catalog/CatalogDatasetEntityActions'
import NavigationComponent from './NavigationComponent'
import ThumbmailCellComponent from './ThumbmailCellComponent'
import DatasetCellComponent from './DatasetCellComponent'

/**
 * Constant to define where to find dynamic attributes in the data objects returned by the search endpoint
 * @type {string}
 */
const DATA_ATTRIBUTES_FIELD = 'properties'
const DEFAULT_FRAGMENT = 'default'
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
    target: React.PropTypes.oneOf(values(SearchResultsTargetsEnum)).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      sortedColumns: [],
      target: props.target,
      selectedDataset: null,
      showingFacetsSearch: false,
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
      query: merge({}, queries, {t: target}),
    })
    this.setState({
      target,
    })
  }

  /**
   * Unselect current selected dataset.
   */
  onUnselectDataset = () => {
    this.selectDataset(null)
  }

  /**
   * Return the fully qualified name of the given attribute. The fully qualified name is :
   * <attribute.fragment.name>.<attribute.name>
   *
   * @param attribute
   * @returns {string}
   */
  getFullyQualifiedAttributeName = (attribute) => {
    if (!attribute.content.fragment || !attribute.content.fragment.name ||
      attribute.content.fragment.name === DEFAULT_FRAGMENT) {
      return `${DATA_ATTRIBUTES_FIELD}.${attribute.content.name}`
    }
    return `${DATA_ATTRIBUTES_FIELD}.${attribute.content.fragment.name}.${attribute.content.name}`
  }

  /**
   * Create full query by adding sort options and target options
   * @returns {string}
   */
  getFullQuery = () => {

    // Get query with search parameters
    let fullQuery = this.props.searchQuery ? this.props.searchQuery : ''

    // If any dataset is associated to the current search, add there urn into tags property
    if (this.state.selectedDataset) {
      if (fullQuery !== '') {
        fullQuery = `${fullQuery} AND tags:${this.state.selectedDataset.content.ip_id}`
      } else {
        fullQuery = `tags:${this.state.selectedDataset.content.ip_id}`
      }
    }
    if (fullQuery !== '') {
      fullQuery = this.formatSearchQuery(fullQuery)
    }

    // If the search need to be sorted, add sort parameters
    if (this.state.sortedColumns.length > 0) {
      const fullSortQuery = reduce(this.state.sortedColumns, (sortQuery, column) => {
        if (column.attribute) {
          sortQuery = `${sortQuery}&sort=${column.attribute}`
          if (column.type) {
            sortQuery = `${sortQuery},${column.type}`
          }
        }
        return sortQuery
      }, '')


      if (fullSortQuery.length > 0) {
        fullQuery = `${fullQuery}${fullSortQuery}`
      }
    }

    // If there is facets to generate add them
    if (this.props.facettesQuery) {
      fullQuery = `${fullQuery}&${this.props.facettesQuery}`
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

    // TODO Manage standard attributes with search-form configuration
    columns.push({
      label: 'Image',
      attributes: ['files'],
      customCell: {component: ThumbmailCellComponent, props: {}},
      fixed: 40,
      hideLabel: true,
    })
    columns.push({label: 'Identifier', attributes: ['ip_id']})
    columns.push({label: 'Label', attributes: ['label'], sortable: true})

    // Read module configuration to get attributes to display
    forEach(this.props.attributesConf, (attributeConf) => {
      if (attributeConf.visibility === true) {
        const attribute = find(this.props.attributeModels, att => att.content.id === attributeConf.id)
        if (attribute) {
          columns.push({
            label: attribute.content.label,
            attributes: [this.getFullyQualifiedAttributeName(attribute)],
            sortable: true,
          })
        }
      }
    })

    // Read module configuration to get attributes regroupements to display
    forEach(this.props.attributesRegroupementsConf, (attributeConf) => {
      if (attributeConf.visibility === true) {
        const attributes = reduce(attributeConf.attributes, (results, attributeId) => {
          const attribute = find(this.props.attributeModels, att => att.content.id === attributeId)
          if (attribute) {
            results.push(this.getFullyQualifiedAttributeName(attribute))
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
      label: 'Label',
      attributes: ['label', 'ip_id', 'properties'],
      sortable: false,
      customCell: {component: DatasetCellComponent, props: {onClick: this.selectDataset}},
      hideLabel: true,
    })
    return columns
  }

  /**
   * Callback when an entity checkbox is modified.
   * @param selectedEntities
   */
  resultSelection = (selectedEntities) => {
    // TODO Manage entities selection
    console.log('Selected entities', selectedEntities)
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
    this.setState({
      sortedColumns,
    })
  }

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
    if (!query.ds && this.state.selectedDataset) {
      this.setState({selectedDataset: null})
    }
  }

  /**
   * Callback when a dataset is selected.
   * Add the urn of the dataset in the search query and switch to data objects view
   * @param dataset
   */
  selectDataset = (dataset) => {
    this.onChangeTarget(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)

    const queries = browserHistory.getCurrentLocation().query
    if (dataset && dataset.content && dataset.content.ip_id) {
      browserHistory.push({
        pathname: browserHistory.getCurrentLocation().pathname,
        query: merge({}, queries, {ds: dataset.content.ip_id}),
      })
    } else {
      browserHistory.push({
        pathname: browserHistory.getCurrentLocation().pathname,
        query: omit(queries, ['ds']),
      })
    }
    this.setState({
      selectedDataset: dataset,
    })
  }

  toggleShowFacetsSearch = () => {
    this.setState({
      ...this.state,
      showingFacetsSearch: !this.state.showingFacetsSearch,
    })
  }

  render() {
    let columns = []
    let lineSize = 50
    let cellsStyle = null
    switch (this.state.target) {
      case SearchResultsTargetsEnum.DATAOBJECT_RESULTS:
        columns = this.getDataObjectsColumns()
        break
      case SearchResultsTargetsEnum.DATASET_RESULTS:
        columns = this.getDataSetsColumns()
        lineSize = 120
        cellsStyle = {backgroundColor: 'transparent'}
        break
      default:
        console.error(`Undefined target type for entity search results : ${this.state.target}`)
    }

    const {target, selectedDataset, showingFacetsSearch} = this.state
    const {appName, project, enableFacettes} = this.props
    const searchFacetsModule = {
      name: 'search-facets',
      active: true,
      applicationId: appName,
      conf: {
        show: showingFacetsSearch && target === SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
        resultsSelectors: CatalogEntitySelector,
      },
    }

    const entityAction = target === SearchResultsTargetsEnum.DATAOBJECT_RESULTS ? CatalogDataobjectEntityActions : CatalogDatasetEntityActions

    return (
      <Card>
        <NavigationComponent
          selectedTarget={target}
          onChangeTarget={this.onChangeTarget}
          onUnselectDataset={this.onUnselectDataset}
          selectedDataset={selectedDataset}
          enableFacettes={enableFacettes}
          showingFacetsSearch={showingFacetsSearch}
          onToggleShowFacetsSearch={this.toggleShowFacetsSearch}
        />
        <CardMedia>
          <ShowableAtRender show={enableFacettes}>
            <LazyModuleComponent
              project={project}
              appName={appName}
              module={searchFacetsModule}
            />
          </ShowableAtRender>
          <FixedTableContainer
            key={target}
            PageActions={entityAction}
            PageSelector={CatalogEntitySelector}
            pageSize={20}
            lineHeight={lineSize}
            displayCheckbox={target === SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
            displayHeader={target === SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
            columns={columns}
            onSelectionChange={this.resultSelection}
            onSortByColumn={this.sortResultsByColumn}
            requestParams={{queryParams: this.getFullQuery()}}
            cellsStyle={cellsStyle}
          />
        </CardMedia>
      </Card>
    )
  }
}

export default SearchResultsComponent
