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
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { AccessDomain } from '@regardsoss/domain'
import URLPictureResolver from '../picture/URLPictureResolver'
import styles from './styles'

/**
 * Default module icon component: handles display mode and distant URLs.
 * Note this component reports style, color and such properties below (problem of integration between MUI and ReactSVG,
 * requires to customize SVG box at runtime)
 * @author Raphaël Mechali
 */
export class ModuleIcon extends React.Component {
  static propTypes = {
    iconDisplayMode: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
    defaultIconURL: PropTypes.string.isRequired,
    customIconURL: PropTypes.string,
  }

  static defaultProps = {
    iconDisplayMode: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      iconDisplayMode, defaultIconURL, customIconURL, ...otherProps
    } = this.props
    let iconURL
    switch (iconDisplayMode) {
      case AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM:
        iconURL = customIconURL || defaultIconURL
        break
      case AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT:
        iconURL = defaultIconURL
        break
      default:
        // No icon
        return null
    }
    return <URLPictureResolver url={iconURL} {...otherProps} />
  }
}
export default withModuleStyle(styles)(ModuleIcon)
