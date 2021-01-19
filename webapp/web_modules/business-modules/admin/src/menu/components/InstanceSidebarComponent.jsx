/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Drawer from 'material-ui/Drawer'
import Settings from 'mdi-material-ui/Cog'
import Brush from 'mdi-material-ui/Brush'
import SupervisorAccount from 'mdi-material-ui/AccountSupervisor'
import { } from '@regardsoss/admin-user-management'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import getModuleStyles from '../../styles/styles'
import SidebarElement from './SidebarElement'
import WaitingAccountsNotificationContainer from '../containers/WaitingAccountsNotificationContainer'
import messages from '../i18n'

/**
 * React sidebar components. Display the admin application menu
 *
 * @author Sébastien Binda
 */
// @withI18n(messages)
class InstanceSidebarComponent extends React.Component {
  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * @type {{onLogout: function}}
   */
  static propTypes = {
    currentPath: PropTypes.string,
  }

  render() {
    const { muiTheme } = this.context
    const moduleStyles = getModuleStyles(muiTheme)

    return (
      <Drawer
        open
        containerStyle={moduleStyles.adminApp.layout.sidebarContainer.styles}
        className={moduleStyles.adminApp.layout.sidebarContainer.classes.join(' ')}
      >
        <SidebarElement
          key="0"
          to="/admin/projects/list"
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.projects' })}
          leftIcon={<Settings color={this.context.muiTheme.svgIcon.color} />}
        />
        <SidebarElement
          key="1"
          to="/admin/accounts/board"
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.accounts' })}
          leftIcon={<SupervisorAccount color={this.context.muiTheme.svgIcon.color} />}
          rightIcon={<WaitingAccountsNotificationContainer />}
        />
        <SidebarElement
          key="3"
          to="/admin/ui/board"
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.instance.ui.configuration' })}
          leftIcon={<Brush color={this.context.muiTheme.svgIcon.color} />}
        />
      </Drawer>
    )
  }
}

export default withI18n(messages)(InstanceSidebarComponent)
