/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import Drawer from 'material-ui/Drawer'
import VerifiedUser from 'material-ui/svg-icons/action/verified-user'
import AddBox from 'material-ui/svg-icons/content/add-box'
import CloudQueue from 'material-ui/svg-icons/file/cloud-queue'
import Widgets from 'material-ui/svg-icons/device/widgets'
import Brush from 'material-ui/svg-icons/image/brush'
import { FormattedMessage } from 'react-intl'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import { I18nProvider } from '@regardsoss/i18n'
import uiPluginsDependencies from '@regardsoss/admin-ui-plugins-management/src/dependencies'
import uiConfigurationDependencies from '@regardsoss/admin-ui-configuration/src/dependencies'
import usersDependencies from '@regardsoss/admin-user-management/src/dependencies'
import dataManagementDependencies from '@regardsoss/admin-data-management/src/dependencies'
import dataAccessDependencies from '@regardsoss/admin-accessright-management/src/dependencies'
import microservicesDependencies from '@regardsoss/admin-microservice-management/src/dependencies'
import { someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import getModuleStyles from '../../styles/styles'
import HateoasSidebarElement from './HateoasSidebarElement'
import WaitingAccessNotificationContainer from '../containers/WaitingAccessNotificationContainer'

console.log('DEP', dataManagementDependencies)

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
    currentPath: React.PropTypes.string,
  }

  render() {
    const { projectName } = this.props
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

        <Drawer
          open containerStyle={merge({ width: '100%' }, style.sidebarContainer.styles)} className={style.sidebarContainer.classes}
        >
          <HateoasSidebarElement
            key="1"
            requiredEndpoints={usersDependencies}
            hateoasDisplayLogic={someMatchHateoasDisplayLogic}
            to={`/admin/${projectName}/user/board`}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.users" />}
            leftIcon={<SupervisorAccount />}
            rightIcon={<WaitingAccessNotificationContainer />}
          />
          <HateoasSidebarElement
            key="2"
            requiredEndpoints={dataManagementDependencies}
            to={`/admin/${projectName}/data/board`}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.datamanagement" />}
            leftIcon={<AddBox />}
          />
          <HateoasSidebarElement
            key="3"
            requiredEndpoints={dataAccessDependencies}
            to={`/admin/${projectName}/access-right/edit`}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.dataaccessrights" />}
            leftIcon={<VerifiedUser />}
          />
          <HateoasSidebarElement
            key="4"
            requiredEndpoints={uiPluginsDependencies}
            to={`/admin/${projectName}/ui-plugins/plugins`}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.plugins" />}
            leftIcon={<Widgets />}
          />
          <HateoasSidebarElement
            key="5"
            requiredEndpoints={microservicesDependencies}
            to={`/admin/${projectName}/microservice/board`}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.microservices" />}
            leftIcon={<CloudQueue />}
          />
          <HateoasSidebarElement
            key="6"
            requiredEndpoints={uiConfigurationDependencies}
            hateoasDisplayLogic={someMatchHateoasDisplayLogic}
            to={`/admin/${projectName}/ui-configuration/applications`}
            currentPath={this.props.currentPath}
            primaryText={<FormattedMessage id="menu.ui.configuration" />}
            leftIcon={<Brush />}
          />
        </Drawer>
      </I18nProvider>
    )
  }
}

export default ProjectSidebarComponent
