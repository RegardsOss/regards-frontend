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
import compose from 'lodash/fp/compose'
import { UIDomain } from '@regardsoss/domain'
import { CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient, AuthenticateResultShape } from '@regardsoss/authentication-utils'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ApplicationErrorContainer } from '@regardsoss/global-system-error'
import { AnchorComponent } from '@regardsoss/components'
import InstanceSidebarComponent from '../menu/components/InstanceSidebarComponent'
import ProjectSidebarComponent from '../menu/components/ProjectSidebarComponent'
import NotificationsManagerContainer from './NotificationsManagerContainer'
import messages from '../i18n'
import styles from '../styles'

/**
 * React components to manage Administration application.
 * This components display admin layout or login form if the user is not connected
 */
export class AdminLayout extends React.Component {
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static propTypes = {
    content: PropTypes.element,
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    location: CommonShapes.LocationShape.isRequired,
    // from mapStateToProps
    auth: AuthenticateResultShape.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    auth: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
  })

  state = {
    menuModuleConf: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (oldProps.project !== newProps.project || !this.state.menuModuleConf) {
      const isOnInstanceDashboard = !newProps.project
      this.setState({
        menuModuleConf: {
          type: modulesManager.AllDynamicModuleTypes.MENU,
          active: true,
          conf: {
            displayMode: isOnInstanceDashboard ? UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_INSTANCE : UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_PROJECT,
            title: 'REGARDS admin dashboard',
            displayAuthentication: true,
            displayNotificationsSelector: true,
            displayLocaleSelector: true,
            displayThemeSelector: true,
          },
        },
      })
    }
  }

  getSidebar = (isInstanceDashboard) => {
    const {
      params: { project }, location, auth,
    } = this.props
    if (isInstanceDashboard) {
      return (<InstanceSidebarComponent
        currentPath={location.pathname}
      />)
    }
    return (<ProjectSidebarComponent
      projectName={project}
      currentPath={location.pathname}
      role={auth.role}
    />)
  }

  render() {
    const { content, params: { project } } = this.props
    const { moduleTheme: { adminApp } } = this.context
    const { menuModuleConf } = this.state
    const isOnInstanceDashboard = !project
    // install notification manager and application error containers when starting app
    return (
      <NotificationsManagerContainer isOnInstanceDashboard={isOnInstanceDashboard}>
        <AnchorComponent>
          <div className="selenium-adminLayout" style={adminApp.layout.app}>
            <div>
              <LazyModuleComponent
                appName="admin"
                project={project}
                module={menuModuleConf}
              />
            </div>
            <div>
              <I18nProvider messages={messages}>
                {this.getSidebar(isOnInstanceDashboard)}
              </I18nProvider>
              <div className={adminApp.layout.contentContainer.classes} style={adminApp.layout.contentContainer.styles}>
                {content}
              </div>
            </div>
          </div>
          <ApplicationErrorContainer />
        </AnchorComponent>
      </NotificationsManagerContainer>
    )
  }
}

export default compose(connect(AdminLayout.mapStateToProps), withModuleStyle(styles))(AdminLayout)
