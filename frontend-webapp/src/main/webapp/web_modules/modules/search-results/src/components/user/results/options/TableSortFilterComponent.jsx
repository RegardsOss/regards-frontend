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
import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton, TableColumnConfiguration, TableSortOrders } from '@regardsoss/components'

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
      this.props.onSortByColumn(column, TableSortOrders.ASCENDING_ORDER, true)
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
