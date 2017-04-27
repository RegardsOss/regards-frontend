/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { TableColumnConfiguration } from '@regardsoss/components'

/**
 * Special option to display None value.
 * @type {{label: string}}
 */
const noSortOption = {
  label: 'NoSortOption',
}

/**
 * Component to display a select field with all the sortable attributes.
 * A selection on an attribute run a new search with the orderBy option.
 *
 * @author Sébastien Binda
 */
class TableSortFilter extends React.Component {

  static propTypes = {
    // List of displayable columns. A column is a configuration for an attribute or attributeRegroupement.
    tableColumns: React.PropTypes.arrayOf(TableColumnConfiguration),
    // Callback to run sort function
    onSortByColumn: React.PropTypes.func.isRequired,
    // Label for the column sort field
    prefixLabel: React.PropTypes.string.isRequired,
    // Label for the "None" attribute selected.
    noneLabel: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: noSortOption,
    }
    noSortOption.label = props.noneLabel
  }

  /**
   * Handle the change of selected column for sorting
   * @param event
   * @param index
   * @param value : Column to sort for
   */
  handleChange = (event, index, value) => {
    this.setState({ value }, () => {
      this.handleSort(this.state.value)
    })
  }

  /**
   * Run sort action
   * @param column
   */
  handleSort = (column) => {
    if (column.label === noSortOption.label) {
      this.props.onSortByColumn(null, null, true)
    } else {
      this.props.onSortByColumn(column, 'ASC', true)
    }
  }

  render() {
    const { tableColumns } = this.props

    const sortableColumns = []
    sortableColumns.push(<MenuItem key={0} value={noSortOption} primaryText={noSortOption.label} />)
    forEach(tableColumns, (column, key) => {
      if (column.sortable) {
        sortableColumns.push(<MenuItem key={key} value={column} primaryText={column.label} />)
      }
    })

    if (sortableColumns.length === 1) {
      return null
    }
    return (
      <div
        style={{
          display: 'inline-block',
          marginBottom: 10,
        }}
      >
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          selectionRenderer={(value) => {
            if (value.label === noSortOption.label) {
              return `${this.props.prefixLabel} ${this.props.noneLabel}`
            }
            return `${this.props.prefixLabel} ${value.label}`
          }}
        >
          {sortableColumns.map(col => col)}
        </DropDownMenu>

      </div>
    )
  }

}

export default TableSortFilter
