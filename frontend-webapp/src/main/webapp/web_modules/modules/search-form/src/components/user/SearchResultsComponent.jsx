/**
 * LICENSE_PLACEHOLDER
 **/
import { concat, reduce, find, remove } from 'lodash'
import { FixedTableContainer } from '@regardsoss/components'
import CatalogEntitySelector from '../../models/catalog/CatalogEntitySelector'
import CatalogEntityActions from '../../models/catalog/CatalogEntityActions'
import ResulsTypeButtons from './ResultsTypeButtons'
import ThumbmailCellComponent from './ThumbmailCellComponent'

/**
 * React container to manage search requests and display results.
 * Search queries are generated by the FormComponent and used by this container.
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {

  static propTypes = {
    searchQuery: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      sortedColumns: [],
    }
  }

  resultSelection = (selectedEntities) => {
    console.log('Selected entities', selectedEntities)
  }

  getFullQuery = () => {
    let fullQuery = this.props.searchQuery

    if (this.state.sortedColumns.length > 0) {
      const sortQuery = reduce(this.state.sortedColumns, (sortQuery, column) => {
        if (column.type === null) {
          return sortQuery
        }
        if (sortQuery.length > 0) {
          return `${sortQuery}&${column.attribute}:${column.type}`
        }
        return `${column.attribute}:${column.type}`
      }, '')
      if (sortQuery.length > 0) {
        fullQuery = `${this.props.searchQuery}&sort=(${sortQuery})`
      }
    }
    return fullQuery
  }

  sortResultsByColumn = (column, type) => {
    const attributeToSort = column.attributes[0]
    const sortedColumns = concat([], this.state.sortedColumns)
    const col = find(sortedColumns, col => col.attribute === attributeToSort)
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
          remove(sortedColumns, col => col.attribute === attributeToSort)
      }
    }
    this.setState({
      sortedColumns,
    })
  }

  render() {
    const columns = []
    columns.push({ label: 'Image', attributes: ['files'], customCell: { component: ThumbmailCellComponent, props: {} }, fixed: 40, hideLabel: true })
    columns.push({ label: 'Internal Identifier', attributes: ['id'] })
    columns.push({ label: 'Identifier', attributes: ['sip_id'] })
    columns.push({ label: 'Label', attributes: ['label'], sortable: true })
    columns.push({ label: 'Format', attributes: ['attributes.format'], sortable: true })
    columns.push({ label: 'Language', attributes: ['attributes.language'], sortable: true })
    columns.push({ label: 'Test Group', attributes: ['attributes.language', 'label'] })

    return (
      <div>
        <ResulsTypeButtons />
        <FixedTableContainer
          PageActions={CatalogEntityActions}
          PageSelector={CatalogEntitySelector}
          pageSize={20}
          displayCheckbox
          columns={columns}
          onSelectionChange={this.resultSelection}
          onSortByColumn={this.sortResultsByColumn}
          requestParams={{ queryParams: this.getFullQuery() }}
        />
      </div>
    )
  }
}

export default SearchResultsComponent
