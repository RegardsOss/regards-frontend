/**
 * LICENSE_PLACEHOLDER
 **/
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import Divider from 'material-ui/Divider'
import Chat from 'material-ui/svg-icons/communication/chat'
import VerifiedUser from 'material-ui/svg-icons/action/verified-user'
import AddBox from 'material-ui/svg-icons/content/add-box'
import CloudQueue from 'material-ui/svg-icons/file/cloud-queue'
import Widgets from 'material-ui/svg-icons/device/widgets'
import Brush from 'material-ui/svg-icons/image/brush'
import Reply from 'material-ui/svg-icons/content/reply'
import { FormattedMessage } from 'react-intl'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import { I18nProvider } from '@regardsoss/i18n'
import { uiPluginsDependencies } from '@regardsoss/admin-ui-plugins-management'
import { uiConfigurationDependencies } from '@regardsoss/admin-ui-configuration'
import { HateoasDisplayDecorator, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import SidebarElement from './SidebarElement'
import getModuleStyles from '../../styles/styles'

/**
 * React sidebar components. Display the admin application menu
 */
class ProjectSidebarComponent extends React.Component {

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
    projectName: React.PropTypes.string,
    onLogout: React.PropTypes.func.isRequired,
  }

  render() {
    const { onLogout, projectName } = this.props
    const moduleStyles = getModuleStyles(this.context.muiTheme)
    const style = {
      sidebarContainer: {
        classes: moduleStyles.adminApp.layout.sidebarContainer.classes.join(' '),
        styles: moduleStyles.adminApp.layout.sidebarContainer.styles,
      },
      link: {
        styles: moduleStyles.linkWithoutDecoration,
      },
    }

    return (
      <I18nProvider messageDir="modules/admin/src/menu/i18n">

        <Drawer open containerStyle={style.sidebarContainer.styles} className={style.sidebarContainer.classes}>
          <SidebarElement
            key="1"
            to={`/admin/${projectName}/user/board`}
            primaryText={<FormattedMessage id="menu.users" />}
            leftIcon={<SupervisorAccount />}
          />
          <SidebarElement
            key="2"
            to={`/admin/${projectName}/data/board`}
            primaryText={<FormattedMessage id="menu.datamanagement" />}
            leftIcon={<AddBox />}
          />
          <SidebarElement
            key="3"
            to={`/admin/${projectName}/data/list`}
            primaryText={<FormattedMessage id="menu.dataaccessrights" />}
            leftIcon={<VerifiedUser />}
          />
          <HateoasDisplayDecorator
            requiredEndpoints={uiPluginsDependencies}
          >
            <SidebarElement
              key="4"
              to={`/admin/${projectName}/ui-plugins/plugins`}
              primaryText={<FormattedMessage id="menu.plugins" />}
              leftIcon={<Widgets />}
            />
          </HateoasDisplayDecorator>
          <SidebarElement
            key="5"
            to={`/admin/${projectName}/microservice/board`}
            primaryText={<FormattedMessage id="menu.microservices" />}
            leftIcon={<CloudQueue />}
          />
          <HateoasDisplayDecorator
            requiredEndpoints={uiConfigurationDependencies}
            hateoasDisplayLogic={someMatchHateoasDisplayLogic}
          >
            <SidebarElement
              key="6"
              to={`/admin/${projectName}/ui-configuration/applications`}
              primaryText={<FormattedMessage id="menu.ui.configuration" />}
              leftIcon={<Brush />}
            />
          </HateoasDisplayDecorator>
          <SidebarElement
            key="7"
            to={`/admin/${projectName}/datamanagement`}
            primaryText={<FormattedMessage id="menu.news" />}
            leftIcon={<Chat />}
          />

          <Divider />
          <MenuItem
            primaryText={<FormattedMessage id="menu.logout" />}
            leftIcon={<PowerSettingsNew />}
            onTouchTap={onLogout}
          />
          <Divider />
          <Link to={'/admin'} style={style.link.styles}>
            <MenuItem primaryText={<FormattedMessage id="menu.back" />} leftIcon={<Reply />} />
          </Link>
        </Drawer>
      </I18nProvider>
    )
  }
}

export default ProjectSidebarComponent
