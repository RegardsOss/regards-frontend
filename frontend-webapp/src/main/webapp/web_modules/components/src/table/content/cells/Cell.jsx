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
import omit from 'lodash/omit'
import values from 'lodash/values'
import { Cell as FixedDataTableCell } from 'fixed-data-table-2'
import { themeContextType } from '@regardsoss/theme'
import TableSelectionModes from '../../model/TableSelectionModes'
import ColumnConfigurationController from '../columns/model/ColumnConfigurationController'

/**
 * Display a cell into the table
 * @author Sébastien binda
 */
class Cell extends React.PureComponent {

  static propTypes = {
    rowIndex: PropTypes.number,
    isLastColumn: PropTypes.bool.isRequired,
    col: PropTypes.shape({
      attributes: PropTypes.arrayOf(PropTypes.string),
      label: PropTypes.string,
    }).isRequired,
    getEntity: PropTypes.func,
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    overridenCellsStyle: PropTypes.objectOf(PropTypes.string),
    lineHeight: PropTypes.number,
    onToggleRowSelection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getCellValue = (rowIndex, column) => {
    const { lineHeight } = this.props
    const isSelectedRow = this.isSelectedRow(rowIndex)
    const entity = this.props.getEntity(rowIndex)
    return ColumnConfigurationController.getConfiguredColumnValueForEntity(column, entity, lineHeight, isSelectedRow, this.handleToggleSelectRow, rowIndex)
  }

  /**
   * Is row as parameter selected?
   * @param rowIndex row index
   * @return true if row is selected
   */
  isSelectedRow = (rowIndex) => {
    const { selectionMode, toggledElements } = this.props
    return (selectionMode === TableSelectionModes.includeSelected && !!toggledElements[rowIndex]) ||
      (selectionMode === TableSelectionModes.excludeSelected && !toggledElements[rowIndex])
  }

  handleToggleSelectRow = () => this.props.onToggleRowSelection(this.props.rowIndex)

  render() {
    const attribute = this.getCellValue(this.props.rowIndex, this.props.col)

    const styles = this.context.moduleTheme

    let cellStyle
    let cellContentStyle
    if (this.props.overridenCellsStyle) {
      cellStyle = this.props.overridenCellsStyle
      cellContentStyle = styles.cellEvenContent
    } else if (this.props.rowIndex % 2) {
      // even cell
      cellStyle = this.props.isLastColumn ? styles.lastCellEven : styles.cellEven
      cellContentStyle = styles.cellEvenContent
    } else {
      // odd cell
      cellStyle = this.props.isLastColumn ? styles.lastCellOdd : styles.cellOdd
      cellContentStyle = styles.cellOddContent
    }
    const childrenProperties = omit(this.props, 'getEntity', 'col', 'lineHeight', 'overridenCellsStyle', 'isLastColumn',
      'toggledElements', 'selectionMode', 'onToggleRowSelection')
    return (
      <FixedDataTableCell style={cellStyle} {...childrenProperties} >
        <div style={cellContentStyle}>{attribute}</div>
      </FixedDataTableCell>
    )
  }
}

export default Cell
