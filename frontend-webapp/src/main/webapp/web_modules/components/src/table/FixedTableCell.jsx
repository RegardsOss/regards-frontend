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
class FixedTableCell extends React.PureComponent {

  static propTypes = {
    rowIndex: React.PropTypes.number,
    col: React.PropTypes.shape({
      attributes: React.PropTypes.arrayOf(React.PropTypes.string),
      label: React.PropTypes.string,
    }).isRequired,
    getCellValue: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const attribute = this.props.getCellValue(this.props.rowIndex, this.props.col)
    const styles = Styles(this.context.muiTheme)
    return (
      <Cell
        {...omit(this.props, ['col', 'getCellValue'])}
        style={styles.cell}
      >
        <div style={styles.cellContent}>
          <div>{attribute}</div>
        </div>
      </Cell>
    )
  }
}

export default FixedTableCell
