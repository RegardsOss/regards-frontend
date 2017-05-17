/**
 * LICENSE_PLACEHOLDER
 **/
import Checkbox from 'material-ui/Checkbox'
import { Cell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'

/**
 * Cell rendering for FixedTable checkbox cell
 * @author Sébastien Binda
 */
const CheckBoxCell = ({ onToggleSelectRow, isSelected, rowIndex, ...otherProps }, context) => {
  const styles = context.moduleTheme
  let cellStyle = styles.cellOdd
  let cellContentStyle = styles.cellOddContent
  if (rowIndex % 2) {
    cellStyle = styles.cellEven
    cellContentStyle = styles.cellEvenContent
  }
  return (
    <Cell
      {...otherProps}
      style={cellStyle}
    >
      <div style={cellContentStyle}>
        <Checkbox
          onCheck={() => onToggleSelectRow(rowIndex)}
          defaultChecked={isSelected(rowIndex)}
        />
      </div>
    </Cell>
  )
}

CheckBoxCell.propTypes = {
  rowIndex: PropTypes.number,
  onToggleSelectRow: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
}

CheckBoxCell.contextTypes = {
  ...themeContextType,
}

export default CheckBoxCell
