/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'

/**
 * Column header cell rendering for FixedTable
 * @author Sébastien Binda
 */
class FixedTableCell extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    lineHeight: React.PropTypes.number,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const theme = this.context.muiTheme
    const lineHeight = this.props.lineHeight ? this.props.lineHeight - 1 : 40
    return (
      <div
        style={{
          lineHeight: `${lineHeight}px`,
          backgroundColor: theme.table.backgroundColor,
          color: theme.tableHeaderColumn.textColor,
          fontFamily: theme.rawTheme.fontFamily,
          display: 'flex',
          justifyContent: 'center',
          borderBottom: `1px solid ${theme.tableRow.borderColor}`,
          borderRight: `1px solid ${theme.tableRow.borderColor}`,
        }}
      >
        <div>{this.props.label}</div>
      </div>
    )
  }
}

export default FixedTableCell
