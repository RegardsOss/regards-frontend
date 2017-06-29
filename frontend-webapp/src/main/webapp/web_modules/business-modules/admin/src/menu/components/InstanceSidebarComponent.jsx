/**
 * LICENSE_PLACEHOLDER
 **/
import Drawer from 'material-ui/Drawer'
import Settings from 'material-ui/svg-icons/action/settings'
import Brush from 'material-ui/svg-icons/image/brush'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import { } from '@regardsoss/admin-user-management'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import getModuleStyles from '../../styles/styles'
import SidebarElement from './SidebarElement'
import WaitingAccountsNotificationContainer from '../containers/WaitingAccountsNotificationContainer'

/**
 * React sidebar components. Display the admin application menu
 *
 * @author Sébastien Binda
 */
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
          to={'/admin/projects/list'}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.projects' })}
          leftIcon={<Settings />}
        />
        <SidebarElement
          key="1"
          to={'/admin/account/list'}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.accounts' })}
          leftIcon={<SupervisorAccount />}
          rightIcon={<WaitingAccountsNotificationContainer />}
        />
        <SidebarElement
          key="3"
          to={'/admin/ui/board'}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.instance.ui.configuration' })}
          leftIcon={<Brush />}
        />
      </Drawer>
    )
  }
}

export default InstanceSidebarComponent
