/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import AuthenticationMenuContainer from '../../containers/user/AuthenticationMenuContainer'
import NotificationListContainer from '../../containers/user/NotificationListContainer'
import CartSelectorContainer from '../../containers/user/CartSelectorContainer'
import ProjectAboutPageLinkContainer from '../../containers/user/ProjectAboutPageLinkContainer'
import NavigationMenuContainer from '../../containers/user/navigation/NavigationMenuContainer'
import ContactComponent from './ContactComponent'
import MenuSeparator from './MenuSeparator'
import { ApplicationBreadcrumbContainer } from '../../containers/user/breadcrumb/ApplicationBreadcrumbContainer'

/**
* Main menu module component
* @author Raphaël Mechali
*/
class MainMenuComponent extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration,

    // provided by root container
    currentModuleId: PropTypes.number,

    // provided by DynamicModuleProvider HOC
    dynamicModules: PropTypes.arrayOf(AccessShapes.Module),
  }

  static defaultProps = {
    dynamicModules: [],
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
      dynamicModules,
      moduleConf: {
        displayMode = UIDomain.MENU_DISPLAY_MODES_ENUM.USER, // defaults to user display for standard module case
        title,
        displayAuthentication,
        displayNotificationsSelector,
        displayCartSelector,
        displayLocaleSelector,
        displayThemeSelector,
        projectAboutPage,
        contacts,
      },
    } = this.props
    const { moduleTheme: { user: { rootStyle, optionsGroup } } } = this.context

    return (
      <div style={rootStyle}>
        {/* Application breadcrumb */}
        <ApplicationBreadcrumbContainer
          title={title}
          project={project}
          displayMode={displayMode}
          currentModuleId={currentModuleId}
          dynamicModules={dynamicModules}
        />
        {/* navigation component in user and preview modes mode (within separators) */
          displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.USER ||
            displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW ? [
              <MenuSeparator key="separator.before" />,
              <NavigationMenuContainer
                key="navigation.container"
                project={project}
                dynamicModules={dynamicModules}
              />,
              <MenuSeparator key="separator.after" />]
            :
            null
        }
        {/* Right options */}
        <div style={optionsGroup}>
          {/* Authentication access, state and options */}
          <AuthenticationMenuContainer display={displayAuthentication} appName={appName} project={project} />
          {/* Notifications */}
          <ShowableAtRender show={displayNotificationsSelector}>
            <NotificationListContainer project={project} />
          </ShowableAtRender>
          {/* User cart stateful link */}
          <ShowableAtRender show={!!displayCartSelector}>
            <CartSelectorContainer project={project} />
          </ShowableAtRender>
          {/* Contact project team */}
          <ContactComponent contacts={contacts} />
          {/* About project if any (display should be in container) */}
          <ProjectAboutPageLinkContainer projectAboutPage={projectAboutPage} appName={appName} project={project} />
          {/* UI Options: theme  */}
          <ShowableAtRender show={displayThemeSelector} >
            <SelectThemeContainer />
          </ShowableAtRender>
          {/* UI Options: locale  */}
          <ShowableAtRender show={displayLocaleSelector} >
            <SelectLocaleContainer />
          </ShowableAtRender>
        </div>
      </div >
    )
  }
}
export default MainMenuComponent
