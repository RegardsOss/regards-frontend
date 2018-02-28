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
import { UIDomain } from '@regardsoss/domain'
import { AccessProjectClient } from '@regardsoss/client'
import { connect } from '@regardsoss/redux'
import { i18nSelectors } from '@regardsoss/i18n'
import { adminLayoutSelectors } from '../../../clients/LayoutListClient'
import { adminModuleSelectors } from '../../../clients/ModulesListClient'
import { HomeConfigurationShape, NavigationEditionItem } from '../../../shapes/ModuleConfiguration'
import DynamicModulesProviderContainer from '../../../containers/common/DynamicModulesProviderContainer'
import NavigationModelResolutionContainer from './NavigationModelResolutionContainer'
import NavigationLayoutComponent from '../../../components/user/navigation/NavigationLayoutComponent'

// global UI layout selectors
const layoutSelectors = AccessProjectClient.LayoutSelectors()
// global UI module selectors
const moduleSelectors = AccessProjectClient.ModuleSelectors()

/**
 * Navigation menu container
 * @author Raphaël Mechali
 */
export class NavigationMenuContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      locale: i18nSelectors.getLocale(state),
    }
  }

  static propTypes = {
    project: PropTypes.string,
    currentModuleId: PropTypes.number,
    displayMode: PropTypes.oneOf(UIDomain.MENU_DISPLAY_MODES),
    homeConfiguration: HomeConfigurationShape,
    navigationConfiguration: PropTypes.arrayOf(NavigationEditionItem).isRequired,
    // from mapStateToProps
    locale: PropTypes.string.isRequired,
  }

  /**
   * Builds module URL
   * @param {number} moduleId module ID
   * @return {string} link URL to module
   */
  buildModuleURL = (moduleId) => {
    const { project } = this.props
    return UIDomain.getModuleURL(project, moduleId)
  }


  render() {
    const {
      homeConfiguration, navigationConfiguration, displayMode, currentModuleId, locale,
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
          clearNonNavigable
        >
          {/* main navigation view component */}
          <NavigationLayoutComponent buildModuleURL={this.buildModuleURL} locale={locale} />
        </NavigationModelResolutionContainer>
      </DynamicModulesProviderContainer>
    )
  }
}

export default connect(NavigationMenuContainer.mapStateToProps)(NavigationMenuContainer)

