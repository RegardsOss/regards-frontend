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
import { UIDomain } from '@regardsoss/domain'
import { AccessProjectClient } from '@regardsoss/client'
import { AdminShapes } from '@regardsoss/shape'
import { adminLayoutSelectors } from '../../../clients/LayoutListClient'
import { adminModuleSelectors } from '../../../clients/ModulesListClient'
import { HomeConfigurationShape, NavigationEditionItem } from '../../../shapes/ModuleConfiguration'
import DynamicModulesProviderContainer from '../../common/DynamicModulesProviderContainer'
import NavigationModelResolutionContainer from './NavigationModelResolutionContainer'
import NavigationLayoutComponent from '../../../components/user/navigation/NavigationLayoutComponent'

// global UI layout selectors
const layoutSelectors = AccessProjectClient.getLayoutSelectors()
// global UI module selectors
const moduleSelectors = AccessProjectClient.getModuleSelectors()

/**
 * Navigation menu container
 * @author Raphaël Mechali
 */
export class NavigationMenuContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    currentModuleId: PropTypes.number,
    displayMode: PropTypes.oneOf(UIDomain.MENU_DISPLAY_MODES),
    homeConfiguration: HomeConfigurationShape,
    navigationConfiguration: PropTypes.arrayOf(NavigationEditionItem),
    currentRole: PropTypes.string,
    roleList: AdminShapes.RoleList.isRequired,
  }

  /**
   * Builds URL for modules, returns no link when links should not be displayed
   * @param {id:number, description:string, type:string} module module as embedded in navigation items
   * @return {string} link URL or null if module link should not be dispayed to module or null if no link should be provided
   */
  buildLinkURL = (module) => {
    const { project, displayMode } = this.props
    if (displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.USER && module) {
      // this is a module and we are in user application, return valid link
      return UIDomain.getModuleURL(project, module.id)
    }
    return null
  }

  render() {
    const {
      homeConfiguration, navigationConfiguration, displayMode,
      currentModuleId, currentRole, roleList,
    } = this.props
    return (
      // resolve modules: note that, when in admin, we use specific admin selectors to access this module loaded data
      // whereas we use global UI selectors for user app (as user app loads in common parts that layout and modules data)
      <DynamicModulesProviderContainer
        layoutSelectors={displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW ? adminLayoutSelectors : layoutSelectors}
        moduleSelectors={displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW ? adminModuleSelectors : moduleSelectors}
        keepOnlyActive
      >
        {/* insert the modules to navigation module resolution container */}
        <NavigationModelResolutionContainer
          homeConfiguration={homeConfiguration}
          navigationConfiguration={navigationConfiguration}
          currentModuleId={currentModuleId}
          currentRole={currentRole}
          roleList={roleList}
        >
          {/* main navigation view component */}
          <NavigationLayoutComponent buildLinkURL={this.buildLinkURL} />
        </NavigationModelResolutionContainer>
      </DynamicModulesProviderContainer>
    )
  }
}

export default NavigationMenuContainer
