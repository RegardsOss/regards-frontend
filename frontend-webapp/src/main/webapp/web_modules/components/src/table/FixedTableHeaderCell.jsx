/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'

/**
 * Column header cell rendering for FixedTable
 */
class FixedTableCell extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const theme = this.context.muiTheme
    return (
      <div
        style={{
          lineHeight: '39px',
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
