/**
 * LICENSE_PLACEHOLDER
 **/
import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton, TableColumnConfiguration } from '@regardsoss/components'

/**
 * Component to display a select field with all the sortable attributes.
 * A selection on an attribute run a new search with the orderBy option.
 *
 * @author Sébastien Binda
 */
class TableSortFilterComponent extends React.Component {

  static propTypes = {
    // List of displayable columns. A column is a configuration for an attribute or attributeRegroupement.
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration),
    // Callback to run sort function
    onSortByColumn: PropTypes.func.isRequired,
    // Label for the column sort field
    prefixLabel: PropTypes.string.isRequired,
    // Label for the "None" attribute selected.
    noneLabel: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }


  /**
   * Handle the change of selected column for sorting
   * @param value : Column to sort for
   */
  onChange = (value) => {
    this.setState({ value })
    this.handleSort(value)
  }


  getLabel = value => !value ?
    `${this.props.prefixLabel} ${this.props.noneLabel}` :
    `${this.props.prefixLabel} ${value.label}`

  /**
   * Run sort action
   * @param column
   */
  handleSort = (column) => {
    if (!column) {
      this.props.onSortByColumn(null, null, true)
    } else {
      this.props.onSortByColumn(column, 'ASC', true)
    }
  }

  render() {
    const { tableColumns, noneLabel } = this.props
    // note that here, we are in table context, so we can use table styles
    if (!tableColumns.filter(column => column.sortable).length) {
      // no sortable column
      return null
    }

    return (
      <DropDownButton
        onChange={this.onChange}
        getLabel={this.getLabel}
        value={null}
      >
        <MenuItem key={'no.sort'} value={null} primaryText={noneLabel} />
        {
          tableColumns.map((column, key) => {
            if (column.sortable) {
              return <MenuItem key={column.label} value={column} primaryText={column.label} />
            }
            return null
          })
        }
      </DropDownButton>
    )
  }

}

export default TableSortFilterComponent
