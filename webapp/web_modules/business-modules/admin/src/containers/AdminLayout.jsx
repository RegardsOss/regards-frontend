/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ApplicationErrorContainer } from '@regardsoss/global-system-error'
import { AnchorComponent } from '@regardsoss/components'
import InstanceSidebarComponent from '../menu/components/InstanceSidebarComponent'
import ProjectSidebarComponent from '../menu/components/ProjectSidebarComponent'
import NotificationsManagerContainer from './NotificationsManagerContainer'
import getModuleStyles from '../styles/styles'
import messages from '../i18n'

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
    isInstance: PropTypes.bool,
    // from mapDispatchToProps
    onLogout: PropTypes.func,
  }

  getSidebar = (isInstanceDashboard) => {
    const {
      onLogout, params: { project }, location, isInstance,
    } = this.props
    if (isInstanceDashboard) {
      return (<InstanceSidebarComponent
        currentPath={location.pathname}
        onLogout={onLogout}
      />)
    }
    return (<ProjectSidebarComponent
      onLogout={onLogout}
      projectName={project}
      currentPath={location.pathname}
      isInstance={isInstance}
    />)
  }

  render() {
    const { content, params: { project } } = this.props
    const isOnInstanceDashboard = !project
    const moduleStyles = getModuleStyles(this.context.muiTheme)
    const style = {
      app: {
        classes: moduleStyles.adminApp.layout.app.classes.join(' '),
        styles: moduleStyles.adminApp.layout.app.styles,
      },
      menu: {
        classes: moduleStyles.menu.classes.join(' '),
      },
      bodyContainer: {
        classes: moduleStyles.adminApp.layout.bodyContainer.classes.join(' '),
        styles: moduleStyles.adminApp.layout.bodyContainer.styles,
      },
      contentContainer: {
        classes: moduleStyles.adminApp.layout.contentContainer.classes.join(' '),
        styles: moduleStyles.adminApp.layout.contentContainer.styles,
      },
    }

    const menuModule = {
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
    }

    // install notification manager and application error containers when starting app
    return (
      <NotificationsManagerContainer isOnInstanceDashboard={isOnInstanceDashboard}>
        <AnchorComponent>
          <div className={`selenium-adminLayout ${style.app.classes}`} style={style.app.styles}>
            <div className={style.menu.classes}>
              <LazyModuleComponent
                appName="admin"
                project={project}
                module={menuModule}
              />
            </div>
            <div className={style.bodyContainer.classes} style={style.bodyContainer.styles}>
              <I18nProvider messages={messages}>
                {this.getSidebar(isOnInstanceDashboard)}
              </I18nProvider>
              <div className={style.contentContainer.classes} style={style.contentContainer.styles}>
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

const mapStateToProps = state => ({
  isInstance: AuthenticationClient.authenticationSelectors.isInstanceAdmin(state),
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthenticationClient.authenticationActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
