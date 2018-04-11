/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import NextMenuIcon from 'material-ui/svg-icons/navigation-arrow-drop-right'
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton, ModuleIcon, ModuleTitleText } from '@regardsoss/components'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../domain/NavigationItemTypes'
import { NavigationItem } from '../../../../shapes/Navigation'
import defaultSectionIconURL from '../../../../img/section.svg'

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
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
    // link URL builder
    buildLinkURL: PropTypes.func.isRequired,
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
   * @param {function} buildLinkURL link URL builder
   * @return rendered item and sub items
   */
  renderMenuItem = ({
    key,
    type,
    iconType,
    customIconURL,
    selected = false,
    title,
    module,
    children,
  }, locale, buildLinkURL) => {
    const { user: { selectedNavigationMenuItem } } = this.context.moduleTheme
    return (
      <MenuItem
        key={key}
        containerElement={<Link to={buildLinkURL(module)} />}
        leftIcon={
          <ModuleIcon
            iconDisplayMode={iconType}
            defaultIconURL={
              type === NAVIGATION_ITEM_TYPES_ENUM.SECTION ? // provide default icon for section too
                defaultSectionIconURL :
                UIDomain.getModuleDefaultIconURL(module.type)}
            customIconURL={customIconURL}
            color={selected ? selectedNavigationMenuItem.color : null}
          />
        }
        primaryText={ModuleTitleText.selectTitle(title, get(module, 'description', ''), locale)}
        menuItems={children ? children.map(subItem => this.renderMenuItem(subItem, locale, buildLinkURL)) : null}
        rightIcon={children ? <NextMenuIcon /> : null}
        style={selected ? selectedNavigationMenuItem : null}
      />)
  }

  render() {
    const {
      icon, items, locale, buildLinkURL,
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
        secondary={!!items.find(item => item.selected)}
      >

        {/* Render menu items */
          items.map(item => this.renderMenuItem(item, locale, buildLinkURL))
        }
      </DropDownButton>
    )
  }
}
export default MainBarDropMenuButton
