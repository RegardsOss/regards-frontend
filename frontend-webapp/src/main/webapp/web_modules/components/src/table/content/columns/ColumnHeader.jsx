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
class ColumnHeader extends React.Component {

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

  render() {
    const { cellHeader, lastCellHeader, sortButton: { iconStyle, buttonStyle } } = this.context.moduleTheme
    const { sortable, isLastColumn, lineHeight, label } = this.props
    const { sortType } = this.state

    const cellStyle = isLastColumn ? lastCellHeader : cellHeader
    const height = `${lineHeight - 1}px`
    const minHeight = height
    return (
      <div style={{ ...cellStyle, height, minHeight }}>
        {
          sortable ? (
            <IconButton
              iconStyle={iconStyle}
              style={buttonStyle}
              onTouchTap={this.runSort}
            >
              {(() => {
                switch (sortType) {
                  case 'ASC':
                    return <SortAsc />
                  case 'DESC':
                    return <SortDesc />
                  default:
                    return <Sort />
                }
              })()
              }
            </IconButton>
          ) : null
        }
        <div>{label}</div>
      </div>
    )
  }
}

ColumnHeader.defaultProps = {
  fixed: false,
}

export default ColumnHeader
