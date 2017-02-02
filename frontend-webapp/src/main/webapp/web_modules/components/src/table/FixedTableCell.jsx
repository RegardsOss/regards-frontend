/**
 * LICENSE_PLACEHOLDER
 **/
import { omit } from 'lodash'
import { Cell } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'

/**
 * Cell rendering for FixedTable
 */
class FixedTableCell extends React.Component {

  static propTypes = {
    rowIndex: React.PropTypes.number,
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    col: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getAttribute = () => {
    const entity = this.props.data[this.props.rowIndex]
    if (entity && entity.content) {
      if (entity.content[this.props.col]) {
        return entity.content[this.props.col]
      }
      return entity.content.attributes[this.props.col]
    }
    return ''
  }


  render() {
    const attribute = this.getAttribute()
    const theme = this.context.muiTheme
    return (
      <Cell
        {...omit(this.props, ['col'])}
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
