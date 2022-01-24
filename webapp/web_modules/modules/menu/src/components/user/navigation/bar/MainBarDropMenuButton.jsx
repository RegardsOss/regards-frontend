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
import get from 'lodash/get'
import startsWith from 'lodash/startsWith'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import NextMenuIcon from 'mdi-material-ui/MenuRight'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton, ModuleIcon, ModuleTitleText } from '@regardsoss/components'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../domain/NavigationItemTypes'
import { NavigationItem } from '../../../../shapes/Navigation'
import defaultSectionIconURL from '../../../../img/section.svg'
import defaultLinkIconURL from '../../../../img/link.svg'

/**
 * Main bar drop down button: shows a drop down button with a menu holding children navigation items
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class MainBarDropMenuButton extends React.Component {
  static propTypes = {
    // required label
    label: PropTypes.string.isRequired,
    // optional icon
    icon: PropTypes.node,
    // required items, list size must be greater than 0 (should be filtered otherwise)
    items: PropTypes.arrayOf(NavigationItem).isRequired,
    // link URL builder
    buildLinkURL: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * @return drop down label (constant, not related to items content)
   */
  getLabel = () => this.props.label

  /**
   * Renders a menu item, no matter if it is a section, a moduleor a link
   * @param {*} item item (respects NavigationItem shape)
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
    url,
  }, buildLinkURL) => {
    const { intl: { locale }, moduleTheme: { user: { selectedNavigationMenuItem } } } = this.context
    let containerElement = null
    let defaultIconURL = null
    switch (type) {
      case NAVIGATION_ITEM_TYPES_ENUM.SECTION: {
        containerElement = <Link to={buildLinkURL(module)} />
        defaultIconURL = defaultSectionIconURL
        break
      }
      case NAVIGATION_ITEM_TYPES_ENUM.LINK: {
        containerElement = <Link to={startsWith(url, 'http') || startsWith(url, 'https') ? { pathname: url } : { pathname: `//${url}` }} target="_blank" />
        defaultIconURL = defaultLinkIconURL
        break
      }
      default: {
        containerElement = <Link to={buildLinkURL(module)} />
        defaultIconURL = UIDomain.getModuleDefaultIconURL(module.type)
      }
    }
    return (
      <MenuItem
        key={key}
        containerElement={containerElement}
        leftIcon={
          <ModuleIcon
            iconDisplayMode={iconType}
            defaultIconURL={defaultIconURL}
            customIconURL={customIconURL}
            color={selected ? selectedNavigationMenuItem.color : null}
          />
        }
        primaryText={ModuleTitleText.selectTitle(title, get(module, 'description', ''), locale)}
        menuItems={children ? children.map((subItem) => this.renderMenuItem(subItem, buildLinkURL)) : null}
        rightIcon={children ? <NextMenuIcon /> : null}
        style={selected ? selectedNavigationMenuItem : null}
      />)
  }

  render() {
    const {
      icon, items, buildLinkURL,
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
        secondary={!!items.find((item) => item.selected)}
      >

        {/* Render menu items */
          items.map((item) => this.renderMenuItem(item, buildLinkURL))
        }
      </DropDownButton>
    )
  }
}
export default MainBarDropMenuButton
