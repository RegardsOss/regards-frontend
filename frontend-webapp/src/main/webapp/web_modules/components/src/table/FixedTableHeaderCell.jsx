/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import SortDesc from 'material-ui/svg-icons/navigation/arrow-drop-up'
import SortAsc from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Sort from 'material-ui/svg-icons/action/swap-vert'
import { themeContextType } from '@regardsoss/theme'

/**
 * Column header cell rendering for FixedTable
 * @author Sébastien Binda
 */
class FixedTableHeaderCell extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    lineHeight: React.PropTypes.number.isRequired,
    sortable: React.PropTypes.bool,
    sortAction: React.PropTypes.func,
    isLastColumn: React.PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      sortType: null,
    }
  }


  runSort = () => {
    switch (this.state.sortType) {
      case 'ASC':
        this.props.sortAction(null)
        this.setState({ sortType: null })
        break
      case 'DESC':
        this.props.sortAction('ASC')
        this.setState({ sortType: 'ASC' })
        break
      default:
        this.props.sortAction('DESC')
        this.setState({ sortType: 'DESC' })
    }
  }

  renderSortAction = () => {
    const { sortableColumn: { iconStyle, buttonStyle } } = this.context.moduleTheme
    if (this.props.sortable) {
      let icon = <Sort />
      switch (this.state.sortType) {
        case 'ASC':
          icon = <SortAsc />
          break
        case 'DESC':
          icon = <SortDesc />
          break
        default:
          icon = <Sort />
      }
      return (
        <IconButton
          iconStyle={iconStyle}
          style={buttonStyle}
          onTouchTap={this.runSort}
        >
          {icon}
        </IconButton>
      )
    }
    return null
  }

  render() {
    const { cellHeader, lastCellHeader } = this.context.moduleTheme
    const { isLastColumn, lineHeight, label } = this.props
    const cellStyle = isLastColumn ? lastCellHeader : cellHeader
    const height = `${lineHeight - 1}px`
    const minHeight = `${lineHeight - 1}px`
    return (
      <div style={{ ...cellStyle, height, minHeight }}>
        {this.renderSortAction()}
        <div > {label}</div >
      </div >
    )
  }
}

FixedTableHeaderCell.defaultProps = {
  fixed: false,
}

export default FixedTableHeaderCell
