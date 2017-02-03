/**
 * LICENSE_PLACEHOLDER
 **/
import { omit } from 'lodash'
import { Cell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'

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
    }),
    getCellValue: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const attribute = this.props.getCellValue(this.props.rowIndex, this.props.col)
    const theme = this.context.muiTheme
    return (
      <Cell
        {...omit(this.props, ['col', 'getCellValue'])}
        style={{
          backgroundColor: theme.table.backgroundColor,
          borderBottom: `1px solid ${theme.tableRow.borderColor}`,
          borderRight: `1px solid ${theme.tableRow.borderColor}`,
        }}
      >
        <div
          style={{
            backgroundColor: theme.table.backgroundColor,
            color: theme.tableRow.textColor,
            fontFamily: theme.rawTheme.fontFamily,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>{attribute}</div>
        </div>
      </Cell>
    )
  }
}

export default FixedTableCell
