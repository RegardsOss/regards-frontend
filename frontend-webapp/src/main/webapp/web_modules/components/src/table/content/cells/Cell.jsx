/**
 * LICENSE_PLACEHOLDER
 **/
import { Cell as FixedDataTableCell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'

/**
 * Cell rendering for FixedTable
 * @author Sébastien Binda
 */
const Cell = ({ getCellValue, overridenCellsStyle, isLastColumn, col, rowIndex, ...otherProperies }, context) => {
  const attribute = getCellValue(rowIndex, col)
  const styles = context.moduleTheme

  let cellStyle
  let cellContentStyle
  if (overridenCellsStyle) {
    cellStyle = overridenCellsStyle
    cellContentStyle = styles.cellEvenContent
  } else if (rowIndex % 2) {
    // even cell
    cellStyle = isLastColumn ? styles.lastCellEven : styles.cellEven
    cellContentStyle = styles.cellEvenContent
  } else {
    // odd cell
    cellStyle = isLastColumn ? styles.lastCellOdd : styles.cellOdd
    cellContentStyle = styles.cellOddContent
  }
  return (
    <FixedDataTableCell style={cellStyle} {...otherProperies} >
      <div style={cellContentStyle}>{attribute}</div>
    </FixedDataTableCell>
  )
}

Cell.propTypes = {
  rowIndex: React.PropTypes.number,
  isLastColumn: React.PropTypes.bool.isRequired,
  col: React.PropTypes.shape({
    attributes: React.PropTypes.arrayOf(React.PropTypes.string),
    label: React.PropTypes.string,
  }).isRequired,
  getCellValue: React.PropTypes.func.isRequired,
  overridenCellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
}

Cell.contextTypes = {
  ...themeContextType,
}

export default Cell
