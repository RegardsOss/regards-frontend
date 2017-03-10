/**
 * LICENSE_PLACEHOLDER
 **/
import { omit } from 'lodash'
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
    let cellContentStyle = styles.cellOddContent
    if (props.rowIndex % 2) {
      cellStyle = styles.cellEven
      cellContentStyle = styles.cellEvenContent
    }
  } else {
    cellStyle=props.cellsStyle
    cellContentStyle=props.cellsStyle
  }
  return (
    <Cell
      {...omit(props, ['col', 'getCellValue','cellsStyle'])}
      style={cellStyle}
    >
      <div style={cellContentStyle}>
        <div style={{width: '100%'}}>{attribute}</div>
      </div>
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
}

FixedTableCell.contextTypes = {
  ...themeContextType,
}

export default FixedTableCell
