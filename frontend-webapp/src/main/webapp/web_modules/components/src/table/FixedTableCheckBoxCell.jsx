/**
 * LICENSE_PLACEHOLDER
 **/
import { omit } from 'lodash'
import Checkbox from 'material-ui/Checkbox'
import { Cell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'

/**
 * Cell rendering for FixedTable checkbox column
 * @author Sébastien Binda
 */
const FixedTableCheckBoxCell = (props, context) => {
  const styles = context.moduleTheme
  let cellStyle = styles.cellOdd
  let cellContentStyle = styles.cellOddContent
  if (props.rowIndex % 2) {
    cellStyle = styles.cellEven
    cellContentStyle = styles.cellEvenContent
  }
  return (
    <Cell
      {...omit(props, ['selectRow', 'isSelected']) }
      style={cellStyle}
    >
      <div style={cellContentStyle}>
        <Checkbox
          onCheck={() => {
            props.selectRow(props.rowIndex)
          }}
          defaultChecked={props.isSelected(props.rowIndex)}
        />
      </div>
    </Cell>
  )
}

FixedTableCheckBoxCell.propTypes = {
  rowIndex: React.PropTypes.number,
  selectRow: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.func.isRequired,
}

FixedTableCheckBoxCell.contextTypes = {
  ...themeContextType,
}

export default FixedTableCheckBoxCell
