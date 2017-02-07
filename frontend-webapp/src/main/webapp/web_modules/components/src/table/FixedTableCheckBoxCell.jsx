/**
 * LICENSE_PLACEHOLDER
 **/
import { omit } from 'lodash'
import Checkbox from 'material-ui/Checkbox'
import { Cell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'
import Styles from './FixedTableStyles'

/**
 * Cell rendering for FixedTable checkbox column
 * @author Sébastien Binda
 */
class FixedTableCheckBoxCell extends React.Component {

  static propTypes = {
    rowIndex: React.PropTypes.number,
    selectRow: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const styles = Styles(this.context.muiTheme)
    return (
      <Cell
        {...omit(this.props, ['selectRow', 'isSelected'])}
        style={styles.checkBoxCell}
      >
        <div style={styles.cellContent}>
          <Checkbox
            onCheck={() => { this.props.selectRow(this.props.rowIndex) }}
            defaultChecked={this.props.isSelected(this.props.rowIndex)}
          />
        </div>
      </Cell>
    )
  }
}

export default FixedTableCheckBoxCell
