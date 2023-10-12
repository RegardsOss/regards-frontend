/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SelectLocaleContainer } from '@regardsoss/i18n-ui'
import { SelectThemeContainer } from '@regardsoss/theme-ui'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import AuthenticationContainer from '../../containers/user/authentication/AuthenticationContainer'
import NotificationListContainer from '../../containers/user/notification/NotificationListContainer'
import CartSelectorContainer from '../../containers/user/CartSelectorContainer'
import ProjectAboutPageLinkContainer from '../../containers/user/ProjectAboutPageLinkContainer'
import NavigationMenuContainer from '../../containers/user/navigation/NavigationMenuContainer'
import AppTitleComponent from './title/AppTitleComponent'
import DateMenuComponent from './DateMenuComponent'
import ContactComponent from './ContactComponent'
import MenuSeparator from './MenuSeparator'

const NotificationListContainerWithResource = withResourceDisplayControl(NotificationListContainer)
/**
* Main menu module component
* @author Raphaël Mechali
*/
class MainMenuComponent extends React.Component {
  static propTypes = {
    currentModuleId: PropTypes.number,
    authenticationName: PropTypes.string,
    currentRole: PropTypes.string,
    borrowableRoles: AdminShapes.RoleList.isRequired,
    roleList: AdminShapes.RoleList.isRequired,
    isInstance: PropTypes.bool.isRequired,

    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      appName,
      project,
      currentModuleId,
      authenticationName,
      currentRole,
      borrowableRoles,
      roleList,
      isInstance,
      moduleConf: {
        displayMode = UIDomain.MENU_DISPLAY_MODES_ENUM.USER, // defaults to user display for standard module case
        displayAuthentication,
        displayNotificationsSelector,
        displayCartSelector,
        displayLocaleSelector,
        displayThemeSelector,
        projectAboutPage,
        projectAboutPageTitleFr,
        projectAboutPageTitleEn,
        contacts,
        home,
        navigation,
      },
    } = this.props
    const { moduleTheme: { user: { rootStyle, optionsGroup } } } = this.context
    return (
      <div style={rootStyle}>
        {
          displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.USER
            || displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW ? [
              /* navigation component in user and preview modes mode (separator after) */
              <NavigationMenuContainer
                key="navigation.container"
                displayMode={displayMode}
                currentModuleId={currentModuleId}
                project={project}
                currentRole={currentRole}
                roleList={roleList}
                homeConfiguration={home}
                navigationConfiguration={navigation}
              />,
              <MenuSeparator key="separator.after" />]
            : ( // title in administration views
              <AppTitleComponent
                project={project}
                displayMode={displayMode}
              />
            )
        }
        {/* Right options */}
        <div style={optionsGroup}>
          <DateMenuComponent />
          {/* Authentication access, state and options */}
          <ShowableAtRender show={displayAuthentication}>
            <AuthenticationContainer
              appName={appName}
              project={project}
              authenticationName={authenticationName}
              currentRole={currentRole}
              borrowableRoles={borrowableRoles}
              isInstance={isInstance}
            />
          </ShowableAtRender>
          {/* Notifications */}
          <ShowableAtRender show={displayNotificationsSelector}>
            <NotificationListContainerWithResource
              resourceDependencies={NotificationListContainer.requiredDependencies}
              project={project}
            />
          </ShowableAtRender>
          {/* User cart stateful link */}
          <ShowableAtRender show={!!displayCartSelector}>
            <CartSelectorContainer project={project} />
          </ShowableAtRender>
          {/* Contact project team */}
          <ContactComponent contacts={contacts} />
          {/* About project if any (display should be in container) */}
          <ProjectAboutPageLinkContainer
            projectAboutPage={projectAboutPage}
            appName={appName}
            project={project}
            displayMode={displayMode}
            title={{
              fr: projectAboutPageTitleFr,
              en: projectAboutPageTitleEn,
            }}
            projectAboutPageTitleFr={projectAboutPageTitleFr}
            projectAboutPageTitleEn={projectAboutPageTitleEn}
          />
          {/* UI Options: theme  */}
          <ShowableAtRender show={displayThemeSelector}>
            <SelectThemeContainer
              roleList={roleList}
              currentRole={currentRole}
              authenticationName={authenticationName}
            />
          </ShowableAtRender>
          {/* UI Options: locale  */}
          <ShowableAtRender show={displayLocaleSelector}>
            <SelectLocaleContainer />
          </ShowableAtRender>
        </div>
      </div>
    )
  }
}
export default MainMenuComponent
