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
  const styles = Styles(context.muiTheme)
  let cellStyle = styles.cellOdd
  let cellContentStyle = styles.cellOddContent
  if (props.rowIndex % 2) {
    cellStyle = styles.cellEven
    cellContentStyle = styles.cellEvenContent
  }
  return (
    <Cell
      {...omit(props, ['col', 'getCellValue'])}
      style={cellStyle}
    >
      <div style={cellContentStyle}>
        <div>{attribute}</div>
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
