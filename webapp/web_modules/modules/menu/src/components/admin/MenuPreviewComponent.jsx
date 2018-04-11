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
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { themeContextType } from '@regardsoss/theme'

/**
 * Menu preview component
 * @author Raphaël Mechali
 */
class MenuPreviewComponent extends React.Component {
  static propTypes = {
    appName: PropTypes.string,
    project: PropTypes.string,
    moduleConfiguration: AccessShapes.Module,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { appName, project, moduleConfiguration } = this.props
    const { moduleTheme: { admin: { previewStyle } } } = this.context
    const previewModule = {
      type: modulesManager.VisibleModuleTypes.MENU,
      active: true,
      conf: {
        ...moduleConfiguration,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
      },
    }
    return (
      <div style={previewStyle}>
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={previewModule}
          admin={false}
        />
      </div>
    )
  }
}
export default MenuPreviewComponent
