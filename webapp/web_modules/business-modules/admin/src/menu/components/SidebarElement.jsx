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

/**
 * @author lmieulet
 */
import { Link } from 'react-router'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import getModuleStyles from '../../styles/styles'

class SidebarElement extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    currentPath: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
    leftIcon: PropTypes.element.isRequired,
    rightIcon: PropTypes.element,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const style = getModuleStyles()
    // removes everything after the last / (/board etc.)
    const urlToSearch = this.props.to.substring(0, this.props.to.lastIndexOf('/') + 1).toLowerCase()

    const linkStyle = this.props.currentPath.toLowerCase().includes(urlToSearch)
      ? { backgroundColor: this.context.muiTheme.palette.primary3Color } : null

    return (
      <Link to={this.props.to} style={style.menu.link}>
        <MenuItem
          style={linkStyle}
          primaryText={this.props.primaryText}
          leftIcon={this.props.leftIcon}
          rightIcon={this.props.rightIcon}
        />
      </Link>
    )
  }
}
export default SidebarElement
