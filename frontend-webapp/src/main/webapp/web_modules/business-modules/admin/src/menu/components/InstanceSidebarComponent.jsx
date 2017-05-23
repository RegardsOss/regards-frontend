/**
 * LICENSE_PLACEHOLDER
 **/
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import Divider from 'material-ui/Divider'
import Settings from 'material-ui/svg-icons/action/settings'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import Brush from 'material-ui/svg-icons/image/brush'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import getModuleStyles from '../../styles/styles'
import HateoasSidebarElement from './HateoasSidebarElement'
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
    onLogout: PropTypes.func.isRequired,
    currentPath: PropTypes.string,
  }

  render() {
    const { muiTheme } = this.context
    const { onLogout } = this.props
    const moduleStyles = getModuleStyles(muiTheme)

    return (
      <I18nProvider messageDir="business-modules/admin/src/menu/i18n">
        <Drawer
          open
          containerStyle={moduleStyles.adminApp.layout.sidebarContainer.styles}
          className={moduleStyles.adminApp.layout.sidebarContainer.classes.join(' ')}
        >
          <HateoasSidebarElement
            endpointKey="projects_url"
            key="0"
            to={'/admin/projects/list'}
            currentPath={this.props.currentPath}
            primaryText={this.context.intl.formatMessage({ id: 'menu.projects' })}
            leftIcon={<Settings />}
          />
          <HateoasSidebarElement
            endpointKey="projects_users_url"
            key="1"
            to={'/admin/account/list'}
            currentPath={this.props.currentPath}
            primaryText={this.context.intl.formatMessage({ id: 'menu.accounts' })}
            leftIcon={<SupervisorAccount />}
            rightIcon={<WaitingAccountsNotificationContainer />}
          />
          <HateoasSidebarElement
            endpointKey="projects_users_url"
            key="3"
            to={'/admin/ui/board'}
            currentPath={this.props.currentPath}
            primaryText={this.context.intl.formatMessage({ id: 'menu.instance.ui.configuration' })}
            leftIcon={<Brush />}
          />
          <Divider />
          <MenuItem
            primaryText={this.context.intl.formatMessage({ id: 'menu.logout' })}
            leftIcon={<PowerSettingsNew />}
            onTouchTap={onLogout}
          />
        </Drawer>
      </I18nProvider>
    )
  }
}

export default InstanceSidebarComponent
