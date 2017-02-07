/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import Styles from './FixedTableStyles'

/**
 * Column header cell rendering for FixedTable
 * @author Sébastien Binda
 */
class FixedTableCell extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    lineHeight: React.PropTypes.number.isRequired,
    fixed: React.PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const styles = Styles(this.context.muiTheme)
    const lineHeight = this.props.lineHeight - 1
    let cellStyle = styles.cellHeader
    if (this.props.fixed) {
      cellStyle = styles.fixedCellHeader
    }
    cellStyle.lineHeight = `${lineHeight}px`
    if (!this.props.label) {
      cellStyle.minHeight = `${this.props.lineHeight}px`
    }
    return (
      <div style={cellStyle}>
        <div>{this.props.label}</div>
      </div>
    )
  }
}

FixedTableCell.defaultProps = {
  fixed: false,
}

export default FixedTableCell
