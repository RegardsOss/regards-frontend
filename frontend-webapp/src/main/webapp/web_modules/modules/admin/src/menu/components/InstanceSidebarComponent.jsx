/**
 * LICENSE_PLACEHOLDER
 **/
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import Divider from 'material-ui/Divider'
import Settings from 'material-ui/svg-icons/action/settings'
import { FormattedMessage } from 'react-intl'
import Brush from 'material-ui/svg-icons/image/brush'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import { I18nProvider } from '@regardsoss/i18n'
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
    muiTheme: React.PropTypes.object.isRequired,
  }

  /**
   * @type {{onLogout: function}}
   */
  static propTypes = {
    onLogout: React.PropTypes.func.isRequired,
    currentPath: React.PropTypes.string,
  }

  render() {
    const { muiTheme } = this.context
    const { onLogout } = this.props
    const moduleStyles = getModuleStyles(muiTheme)

    return (
      <I18nProvider messageDir="modules/admin/src/menu/i18n">
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
            primaryText={<FormattedMessage id="menu.projects" />}
            leftIcon={<Settings />}
          />
          <HateoasSidebarElement
            endpointKey="projects_users_url"
            key="1"
            to={'/admin/account/list'}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.accounts" />}
            leftIcon={<SupervisorAccount />}
            rightIcon={<WaitingAccountsNotificationContainer />}
          />
          <HateoasSidebarElement
            endpointKey="projects_users_url"
            key="3"
            to={'/admin/ui/board'}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.instance.ui.configuration" />}
            leftIcon={<Brush />}
          />
          <Divider />
          <MenuItem
            primaryText={<FormattedMessage id="menu.logout" />}
            leftIcon={<PowerSettingsNew />}
            onTouchTap={onLogout}
          />
        </Drawer>
      </I18nProvider>
    )
  }
}

export default InstanceSidebarComponent
