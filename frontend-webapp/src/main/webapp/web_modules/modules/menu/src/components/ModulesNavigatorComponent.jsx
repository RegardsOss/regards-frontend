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
import FlatButton from 'material-ui/FlatButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ModuleListContainer } from '@regardsoss/modules'

/**
* Displays modules navigation functionality
* @author Raphaël Mechali
*/
class ModulesNavigatorComponent extends React.Component {

  static propTypes = {
    // project name: When in this component, we are necessary in user app and therefore we MUST have a project name
    project: PropTypes.string.isRequired,
    // menu state
    menuOpen: PropTypes.bool.isRequired,
    // callbacks: menu closed / toggled visibility
    onCloseMenu: PropTypes.func.isRequired,
    onToggleMenu: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { menuOpen, onCloseMenu, onToggleMenu } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { optionsLabelStyle } } } = this.context
    return (
      <div>
        <FlatButton
          icon={<MenuIcon />}
          label={formatMessage({ id: 'menu.modules.list.button.label' })}
          title={formatMessage({ id: 'menu.modules.list.button.tooltip' })}
          onTouchTap={onToggleMenu}
          labelStyle={optionsLabelStyle}
        />
        <ModuleListContainer
          project={this.props.project}
          open={menuOpen}
          onCloseMenu={onCloseMenu}
        />
      </div>
    )
  }
}
export default ModulesNavigatorComponent
