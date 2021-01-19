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
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModulePane } from '@regardsoss/components'
import { dependencies } from '../../user-dependencies'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import TitleAndTabsContainer from '../../containers/user/tabs/TitleAndTabsContainer'
import TabsContentContainer from '../../containers/user/tabs/TabsContentContainer'
import FeedbackDisplayContainer from '../../containers/user/feedback/FeedbackDisplayContainer'

/**
 * Search results module view
 */
class ModuleComponent extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // resolved attribute models containing standard attributes
    attributeModels: DataManagementShapes.AttributeModelList,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      project,
      appName,
      id: moduleId,
      description,
      page,
      moduleConf,
    } = this.props
    const { moduleTheme: { user: { rootModuleContainer } } } = this.context
    return (
      <div style={rootModuleContainer}>
        {/* Main pane */}
        <DynamicModulePane
          requiredDependencies={dependencies}
          id={moduleId}
          moduleConf={moduleConf}
          titleComponent={
            // Title and tabs selection displayer
            <TitleAndTabsContainer
              moduleId={moduleId}
              description={description}
              page={page}
            />
          }
          {...this.props}
        >
          {/* Tabs content displayer */}
          <TabsContentContainer
            project={project}
            appName={appName}
            moduleId={moduleId}
          />
        </DynamicModulePane>
        {/* Feedback handling for long actions in module */}
        <FeedbackDisplayContainer />
      </div>
    )
  }
}
export default ModuleComponent
