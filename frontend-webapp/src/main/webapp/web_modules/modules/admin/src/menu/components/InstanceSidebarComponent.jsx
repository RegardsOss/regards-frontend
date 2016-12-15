import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import Divider from 'material-ui/Divider'
import Settings from 'material-ui/svg-icons/action/settings'
import { FormattedMessage } from 'react-intl'
import Weekend from 'material-ui/svg-icons/content/weekend'
import { I18nProvider } from '@regardsoss/i18n'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import HateoasSidebarElement from './HateoasSidebarElement'

/**
 * React sidebar components. Display the admin application menu
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
  }

  render() {
    const { muiTheme } = this.context
    const { onLogout } = this.props
    const style = {
      sidebarContainer: {
        classes: muiTheme.adminApp.layout.sidebarContainer.classes.join(' '),
        styles: muiTheme.adminApp.layout.sidebarContainer.styles,
      },
      link: {
        styles: muiTheme.linkWithoutDecoration,
      },
    }
    return (
      <I18nProvider messageDir="modules/admin/src/menu/i18n">
        <Drawer open containerStyle={style.sidebarContainer.styles} className={style.sidebarContainer.classes}>
          <HateoasSidebarElement
            endpointKey="projects_url"
            key="0"
            to={'/admin/project/list'}
            linkStyle={style.link.styles}
            primaryText={<FormattedMessage id="menu.projects" />}
            leftIcon={<Settings />}
          />
          <HateoasSidebarElement
            endpointKey="projects_users_url"
            key="1"
            to={'/admin/account/list'}
            linkStyle={style.link.styles}
            primaryText={<FormattedMessage id="menu.accounts" />}
            leftIcon={<SupervisorAccount />}
          />
          <HateoasSidebarElement
            endpointKey="projects_users_url"
            key="2"
            to={'/admin/database/list'}
            linkStyle={style.link.styles}
            primaryText={<FormattedMessage id="menu.databases" />}
            leftIcon={<Weekend />}
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
