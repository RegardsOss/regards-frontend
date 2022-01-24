/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'mdi-material-ui/ChevronDown'
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
    title: PropTypes.string,
    onUnselecteddAll: PropTypes.func,
    onReset: PropTypes.func,
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
        <ToolbarGroup>
          <FontIcon className="muidocs-icon-custom-sort" />
          <IconMenu
            iconButtonElement={
              <IconButton touch>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Unselect all" onClick={this.props.onUnselecteddAll} />
            <MenuItem primaryText="Reset" onClick={this.props.onReset} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default ListHeaderComponent
