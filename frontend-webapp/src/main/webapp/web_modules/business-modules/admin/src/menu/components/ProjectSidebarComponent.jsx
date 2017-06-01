/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import Drawer from 'material-ui/Drawer'
import VerifiedUser from 'material-ui/svg-icons/action/verified-user'
import AddBox from 'material-ui/svg-icons/content/add-box'
import CloudQueue from 'material-ui/svg-icons/file/cloud-queue'
import Brush from 'material-ui/svg-icons/image/brush'
import Divider from 'material-ui/Divider'
import Back from 'material-ui/svg-icons/navigation/arrow-back'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import { uiManagementDependencies } from '@regardsoss/admin-ui-management'
import { userDependencies } from '@regardsoss/admin-user-management'
import { dataManagementDependencies } from '@regardsoss/admin-data-management'
import { accessRightDependencies } from '@regardsoss/admin-accessright-management'
import { microserviceDependencies } from '@regardsoss/admin-microservice-management'
import { someMatchHateoasDisplayLogic, allMatchHateoasDisplayLogic, HateoasDisplayDecorator } from '@regardsoss/display-control'
import MenuItem from 'material-ui/MenuItem'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import getModuleStyles from '../../styles/styles'
import HateoasSidebarElement from './HateoasSidebarElement'
import WaitingAccessNotificationContainer from '../containers/WaitingAccessNotificationContainer'
import { projectActions } from '../clients/ProjectClient'
/**
 * React sidebar components. Display the admin application menu
 */
class ProjectSidebarComponent extends React.Component {

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
    projectName: PropTypes.string.isRequired,
    currentPath: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
  }

  handleRedirectToInstanceAdminDashboard = () => {
    this.props.onLogout()
    browserHistory.push('/admin/')
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
      <Drawer
        open
        containerStyle={merge({ width: '100%' }, style.sidebarContainer.styles)}
        className={style.sidebarContainer.classes}
      >
        <HateoasSidebarElement
          key="1"
          requiredEndpoints={userDependencies}
          hateoasDisplayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/user/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.users' })}
          leftIcon={<SupervisorAccount
            color={this.context.muiTheme.svgIcon.color}
          />}
          rightIcon={<WaitingAccessNotificationContainer />}
        />
        <HateoasSidebarElement
          key="2"
          requiredEndpoints={dataManagementDependencies}
          hateoasDisplayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/data/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.datamanagement' })}
          leftIcon={<AddBox
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <HateoasSidebarElement
          key="3"
          requiredEndpoints={accessRightDependencies}
          hateoasDisplayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/access-right/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.dataaccessrights' })}
          leftIcon={<VerifiedUser
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <HateoasSidebarElement
          key="4"
          requiredEndpoints={microserviceDependencies}
          to={`/admin/${projectName}/microservice/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.microservices' })}
          leftIcon={<CloudQueue
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <HateoasSidebarElement
          key="5"
          requiredEndpoints={uiManagementDependencies}
          hateoasDisplayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/ui/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.ui.configuration' })}
          leftIcon={<Brush
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <Divider />
        <HateoasDisplayDecorator
          requiredEndpoints={[projectActions.getDependency(RequestVerbEnum.GET)]}
          hateoasDisplayLogic={allMatchHateoasDisplayLogic}
        >
          <MenuItem
            primaryText={this.context.intl.formatMessage({ id: 'menu.instance' })}
            leftIcon={<Back
              color={this.context.muiTheme.svgIcon.color}
            />}
            onTouchTap={this.handleRedirectToInstanceAdminDashboard}
          />
        </HateoasDisplayDecorator>
      </Drawer>
    )
  }
}

export default ProjectSidebarComponent
