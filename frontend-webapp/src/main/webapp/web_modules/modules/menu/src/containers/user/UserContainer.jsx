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
import { browserHistory } from 'react-router'
import { AccessProjectClient } from '@regardsoss/client'
import { CommonShapes } from '@regardsoss/shape'
import { modulesManager } from '@regardsoss/modules'
import DynamicModulesProviderContainer from '../common/DynamicModulesProviderContainer'
import MainMenuComponent from '../../components/user/MainMenuComponent'

// default user modules selectors
const moduleSelectors = AccessProjectClient.ModuleSelectors()

/**
 * Main component of module menu (user part)
 * @author Sébastien binda
 **/
class UserContainer extends React.Component {
  static propTypes = {
    // Set by module loader (LazyModuleComponent)
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    // Module configuration.
    moduleConf: PropTypes.shape({
      title: PropTypes.string,
      contacts: PropTypes.string,
      displayAuthentication: PropTypes.bool,
      displayCartSelector: PropTypes.bool,
      displayNotificationsSelector: PropTypes.bool,
      displayLocaleSelector: PropTypes.bool,
      displayThemeSelector: PropTypes.bool,
      projectAboutPage: CommonShapes.URL,
    }),
  }


  render() {
    const {
      project, appName,
      moduleConf: {
        title, displayAuthentication, displayThemeSelector, displayNotificationsSelector,
        displayCartSelector, displayLocaleSelector, projectAboutPage, contacts,
      },
    } = this.props
    const currentModuleId = modulesManager.getPathModuleId(browserHistory.getCurrentLocation().pathname)
    return (
      // Resolve the list of active dynamic modules for breadcrumb and navigation
      <DynamicModulesProviderContainer moduleSelectors={moduleSelectors} keepOnlyActive >
        {/* Insert main render component */}
        <MainMenuComponent
          project={project}
          appName={appName}

          title={title}
          displayAuthentication={displayAuthentication}
          displayNotificationsSelector={displayNotificationsSelector}
          displayCartSelector={displayCartSelector}
          displayThemeSelector={displayThemeSelector}
          displayLocaleSelector={displayLocaleSelector}
          projectAboutPage={projectAboutPage}
          contacts={contacts}

          currentModuleId={currentModuleId}
        />
      </DynamicModulesProviderContainer>
    )
  }
}

export default UserContainer