/**
 * LICENSE_PLACEHOLDER
 **/
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * React component to display an header before the infinite scroll list
 * @author Sébastien Binda
 */
class ListHeaderComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    title: React.PropTypes.string,
    onUnselecteddAll: React.PropTypes.func,
    onReset: React.PropTypes.func,
  }

  render() {
    const style = {
      container: {
        height: '40px',
        backgroundColor: this.context.muiTheme.palette.primary2Color,
        color: this.context.muiTheme.palette.backgroundTextColor,
      },
      title: {
        marginLeft: '15px',
        color: this.context.muiTheme.palette.backgroundTextColor,
      },
    }
    return (
      <Toolbar style={style.container}>
        <ToolbarGroup firstChild>
          <ToolbarTitle text={this.props.title} style={style.title} />
        </ToolbarGroup>
        <ToolbarGroup >
          <FontIcon className="muidocs-icon-custom-sort" />
          <IconMenu
            iconButtonElement={
              <IconButton touch>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Unselect all" onTouchTap={this.props.onUnselecteddAll} />
            <MenuItem primaryText="Reset" onTouchTap={this.props.onReset} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default ListHeaderComponent
