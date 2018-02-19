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
import get from 'lodash/get'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import SectionDefaultIcon from 'material-ui/svg-icons/navigation/menu'
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton, ModuleIcon, ModuleTitleText } from '@regardsoss/components'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../domain/NavigationItemTypes'
import { NavigationItem } from '../../../../shapes/Navigation'

/**
 * Main bar drop down button: shows a drop down button with a menu holding children navigation items
 * @author Raphaël Mechali
 */
class MainBarDropMenuButton extends React.Component {
  static propTypes = {
    // required label
    label: PropTypes.string.isRequired,
    // optional icon
    icon: PropTypes.node,
    // required items, list size must be greater than 0 (should be filtered otherwise)
    items: PropTypes.arrayOf(NavigationItem).isRequired,
    // current locale if any
    locale: PropTypes.string,
    // module URL builder
    buildModuleURL: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * @return drop down label (constant, not related to items content)
   */
  getLabel = () => this.props.label

  /**
   * Renders a menu item, no matter if it is a section or a module
   * @param {*} item item (respects NavigationItem shape)
   * @param {string} locale locale if any
   * @param {function} buildModuleURL module URL builder
   * @return rendered item and sub items
   */
  renderMenuItem = ({
    key,
    type,
    iconType,
    customIconURL,
    title,
    module,
    children,
  }, locale, buildModuleURL) =>
    (<MenuItem
      key={key}
      containerElement={module ? <Link to={buildModuleURL(module.id)} /> : null}
      leftIcon={
        iconType === AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT && type === NAVIGATION_ITEM_TYPES_ENUM.SECTION ?
          <SectionDefaultIcon /> :
          <ModuleIcon
            iconDisplayMode={iconType}
            defaultIconURL={UIDomain.getModuleDefaultIconURL(module.type)}
            customIconURL={customIconURL}
          />
      }
      primaryText={ModuleTitleText.selectTitle(title, get(module, 'description', ''), locale)}
      menuItems={children ? children.map(subItem => this.renderMenuItem(subItem, locale, buildModuleURL)) : null}
    />)


  render() {
    const {
      icon, items, locale, buildModuleURL,
    } = this.props
    const { moduleTheme: { user: { navigationItem } } } = this.context
    return (
      <DropDownButton
        ButtonConstructor={FlatButton}
        labelStyle={navigationItem.defaultTextStyle}
        getLabel={this.getLabel}
        value={null}
        icon={icon || null}
        hasSubMenus
      >
        {/* Render menu items */
          items.map(item => this.renderMenuItem(item, locale, buildModuleURL))
        }
      </DropDownButton>
    )
  }
}
export default MainBarDropMenuButton
