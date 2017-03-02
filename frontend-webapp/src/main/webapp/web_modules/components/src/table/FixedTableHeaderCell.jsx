/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import SortDesc from 'material-ui/svg-icons/navigation/arrow-drop-up'
import SortAsc from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Sort from 'material-ui/svg-icons/action/swap-vert'
import {themeContextType} from '@regardsoss/theme'
import Styles from './FixedTableStyles'

/**
 * Column header cell rendering for FixedTable
 * @author Sébastien Binda
 */
class FixedTableHeaderCell extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    lineHeight: React.PropTypes.number.isRequired,
    fixed: React.PropTypes.bool,
    sortable: React.PropTypes.bool,
    sortAction : React.PropTypes.func,
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
      case 'ASC' :
        this.props.sortAction(null)
        this.setState({sortType: null})
        break
      case 'DESC':
        this.props.sortAction('ASC')
        this.setState({sortType: 'ASC'})
        break
      default:
        this.props.sortAction('DESC')
        this.setState({sortType: 'DESC'})
    }
  }
  renderSortAction = () => {
    if (this.props.sortable) {
      const iconStyle = {
        width: 20,
        height: 20,
      }
      const buttonStyle = {
        width: 25,
        height: 25,
        padding: 0
      }
      let icon = <Sort/>
      switch (this.state.sortType) {
        case 'ASC' :
          icon = <SortAsc/>
          break
        case 'DESC':
          icon = <SortDesc/>
          break
        default:
          icon = <Sort/>
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
        {this.renderSortAction()}
        <div>{this.props.label}</div>
      </div>
    )
  }
}

FixedTableHeaderCell.defaultProps = {
  fixed: false,
}

export default FixedTableHeaderCell
