/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import merge from 'lodash/merge'
import Drawer from 'material-ui/Drawer'
import VerifiedUser from 'material-ui/svg-icons/action/verified-user'
import Widgets from 'material-ui/svg-icons/device/widgets'
import AddBox from 'material-ui/svg-icons/content/add-box'
import CloudQueue from 'material-ui/svg-icons/file/cloud-queue'
import Brush from 'material-ui/svg-icons/image/brush'
import Divider from 'material-ui/Divider'
import GroupWork from 'material-ui/svg-icons/action/group-work'
import Back from 'material-ui/svg-icons/navigation/arrow-back'
import MenuItem from 'material-ui/MenuItem'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { uiManagementDependencies } from '@regardsoss/admin-ui-management'
import { userDependencies } from '@regardsoss/admin-user-management'
import { modelsDependencies } from '@regardsoss/admin-board-models'
import { collectionsDependencies } from '@regardsoss/admin-board-collections'
import { acquisitionDependencies } from '@regardsoss/admin-board-acquisition'
import { accessRightDependencies } from '@regardsoss/admin-accessright-management'
import { microserviceDependencies } from '@regardsoss/admin-microservice-management'
import { ShowableAtRender, someMatchHateoasDisplayLogic, withResourceDisplayControl } from '@regardsoss/display-control'
import getModuleStyles from '../../styles/styles'
import SidebarElement from './SidebarElement'
import WaitingAccessNotificationContainer from '../containers/WaitingAccessNotificationContainer'
import messages from '../i18n'

const SidebarElementWithResourceDisplayControl = withResourceDisplayControl(SidebarElement)

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
    isInstance: PropTypes.bool,
  }

  handleRedirectToInstanceAdminDashboard = () => {
    this.props.onLogout()
    browserHistory.push('/admin/')
  }

  render() {
    const { projectName, isInstance } = this.props
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
        <SidebarElementWithResourceDisplayControl
          key="1"
          resourceDependencies={userDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/user/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.users' })}
          leftIcon={<SupervisorAccount
            color={this.context.muiTheme.svgIcon.color}
          />}
          rightIcon={<WaitingAccessNotificationContainer />}
        />
        <SidebarElementWithResourceDisplayControl
          key="2"
          resourceDependencies={modelsDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/data/models/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.datamodels' })}
          leftIcon={<Widgets
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <SidebarElementWithResourceDisplayControl
          key="3"
          resourceDependencies={collectionsDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/data/collections/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.collections' })}
          leftIcon={<GroupWork
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <SidebarElementWithResourceDisplayControl
          key="4"
          resourceDependencies={acquisitionDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/data/acquisition/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.dataacquisition' })}
          leftIcon={<AddBox
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <SidebarElementWithResourceDisplayControl
          key="5"
          resourceDependencies={accessRightDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/data/access-right/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.dataaccessrights' })}
          leftIcon={<VerifiedUser
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <SidebarElementWithResourceDisplayControl
          key="6"
          resourceDependencies={microserviceDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/microservice/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.microservices' })}
          leftIcon={<CloudQueue
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <SidebarElementWithResourceDisplayControl
          key="7"
          resourceDependencies={uiManagementDependencies}
          displayLogic={someMatchHateoasDisplayLogic}
          to={`/admin/${projectName}/ui/board`}
          currentPath={this.props.currentPath}
          primaryText={this.context.intl.formatMessage({ id: 'menu.ui.configuration' })}
          leftIcon={<Brush
            color={this.context.muiTheme.svgIcon.color}
          />}
        />
        <ShowableAtRender show={isInstance}>
          <Divider />
          <MenuItem
            primaryText={this.context.intl.formatMessage({ id: 'menu.instance' })}
            leftIcon={<Back
              color={this.context.muiTheme.svgIcon.color}
            />}
            onClick={this.handleRedirectToInstanceAdminDashboard}
          />
        </ShowableAtRender>
      </Drawer>
    )
  }
}

export default withI18n(messages)(ProjectSidebarComponent)
