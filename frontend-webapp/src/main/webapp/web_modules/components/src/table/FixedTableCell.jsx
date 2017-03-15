/**
 * LICENSE_PLACEHOLDER
 **/
import omit from 'lodash/omit'
import { Cell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'
import Styles from './FixedTableStyles'

/**
 * Cell rendering for FixedTable
 * @author Sébastien Binda
 */
const FixedTableCell = (props, context) => {
  const attribute = props.getCellValue(props.rowIndex, props.col)
  let cellStyle = {}
  let cellContentStyle = {}
  if (!props.cellsStyle) {
    const styles = Styles(context.muiTheme)
    cellStyle = styles.cellOdd
    cellContentStyle = styles.cellOddContent
    if (props.rowIndex % 2) {
      cellStyle = styles.cellEven
      cellContentStyle = styles.cellEvenContent
    }
  } else {
    cellStyle = props.cellsStyle
    cellContentStyle = props.cellsStyle
  }
  return (
    <Cell
      {...omit(props, ['col', 'getCellValue', 'cellsStyle'])}
      style={cellStyle}
    >
      <div style={cellContentStyle}>{attribute}</div>
    </Cell>
  )
}

FixedTableCell.propTypes = {
  rowIndex: React.PropTypes.number,
  col: React.PropTypes.shape({
    attributes: React.PropTypes.arrayOf(React.PropTypes.string),
    label: React.PropTypes.string,
  }).isRequired,
  getCellValue: React.PropTypes.func.isRequired,
  cellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
}

FixedTableCell.contextTypes = {
  ...themeContextType,
}

export default FixedTableCell
