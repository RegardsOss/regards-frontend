/**
 * LICENSE_PLACEHOLDER
 **/
import Drawer from 'material-ui/Drawer'
import Settings from 'material-ui/svg-icons/action/settings'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
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
      </Drawer>
    )
  }
}

export default InstanceSidebarComponent
