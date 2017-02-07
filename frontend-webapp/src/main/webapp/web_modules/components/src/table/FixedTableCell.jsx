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
class FixedTableCell extends React.Component {

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
    let cellStyle = styles.cellOdd
    let cellContentStyle = styles.cellOddContent
    if (this.props.rowIndex % 2) {
      cellStyle = styles.cellEven
      cellContentStyle = styles.cellEvenContent
    }
    return (
      <Cell
        {...omit(this.props, ['col', 'getCellValue'])}
        style={cellStyle}
      >
        <div style={cellContentStyle}>
          <div>{attribute}</div>
        </div>
      </Cell>
    )
  }
}

export default FixedTableCell
