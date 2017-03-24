/**
 * LICENSE_PLACEHOLDER
 **/
import { omit } from 'lodash'
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
  rowIndex: React.PropTypes.number,
  onToggleSelectRow: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.func.isRequired,
}

CheckBoxCell.contextTypes = {
  ...themeContextType,
}

export default CheckBoxCell
