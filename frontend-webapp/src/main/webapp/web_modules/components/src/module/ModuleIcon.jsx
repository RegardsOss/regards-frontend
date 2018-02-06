/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { AccessDomain } from '@regardsoss/domain'
import SVGURLIcon from '../picture/SVGURLIcon'
import styles from './styles'

/**
 * Default module icon component: handles display mode and distant URLs
 * @author Raphaël Mechali
 */
class ModuleIcon extends React.Component {
  static propTypes = {
    iconDisplayMode: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES).isRequired,
    defaultIconURL: PropTypes.string,
    customIconURL: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { iconDisplayMode, defaultIconURL, customIconURL } = this.props
    const { moduleTheme: { moduleTitle } } = this.context
    let iconURL
    switch (iconDisplayMode) {
      case AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM:
        iconURL = customIconURL
        break
      case AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT:
        iconURL = defaultIconURL
        break
      default:
        // No icon
        return null
    }

    return ( // TODO-NOW handle Non SVG icons
      <SVGURLIcon style={moduleTitle.iconStyle} path={iconURL} />
    )
  }
}
export default withModuleStyle(styles)(ModuleIcon)
