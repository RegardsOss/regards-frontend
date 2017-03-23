/**
 * LICENSE_PLACEHOLDER
 **/
import { Cell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'
import Styles from './FixedTableStyles'

/**
 * Cell rendering for FixedTable
 * @author Sébastien Binda
 */
const FixedTableCell = ({ getCellValue, overridenCellsStyle, isLastColumn, col, rowIndex, ...otherProperies }, context) => {
  const attribute = getCellValue(rowIndex, col)
  const styles = Styles(context.muiTheme)

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
    <Cell style={cellStyle} {...otherProperies} >
      <div style={cellContentStyle}>{attribute}</div>
    </Cell>
  )
}

FixedTableCell.propTypes = {
  rowIndex: React.PropTypes.number,
  isLastColumn: React.PropTypes.bool.isRequired,
  col: React.PropTypes.shape({
    attributes: React.PropTypes.arrayOf(React.PropTypes.string),
    label: React.PropTypes.string,
  }).isRequired,
  getCellValue: React.PropTypes.func.isRequired,
  overridenCellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
}

FixedTableCell.contextTypes = {
  ...themeContextType,
}

export default FixedTableCell
