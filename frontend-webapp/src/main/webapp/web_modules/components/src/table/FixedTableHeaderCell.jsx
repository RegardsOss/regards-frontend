/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import Styles from './FixedTableStyles'

/**
 * Column header cell rendering for FixedTable
 * @author Sébastien Binda
 */
const FixedTableHeaderCell = (props, context) => {
  const styles = Styles(context.muiTheme)
  const lineHeight = props.lineHeight - 1
  let cellStyle = styles.cellHeader
  if (props.fixed) {
    cellStyle = styles.fixedCellHeader
  }
  cellStyle.lineHeight = `${lineHeight}px`
  if (!props.label) {
    cellStyle.minHeight = `${props.lineHeight}px`
  }
  return (
    <div style={cellStyle}>
      <div>{props.label}</div>
    </div>
  )
}

FixedTableHeaderCell.propTypes = {
  label: React.PropTypes.string,
  lineHeight: React.PropTypes.number.isRequired,
  fixed: React.PropTypes.bool,
}

FixedTableHeaderCell.contextTypes = {
  ...themeContextType,
}

FixedTableHeaderCell.defaultProps = {
  fixed: false,
}

export default FixedTableHeaderCell
