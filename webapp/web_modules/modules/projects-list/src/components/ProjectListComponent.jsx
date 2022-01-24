/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import ProjectComponent from './ProjectComponent'

/**
 * Show the list of users for the current project
 */
class ProjectListComponent extends React.Component {
  /**
   * @type {{projects: *, theme: *}}
   */
  static propTypes = {
    projects: AccessShapes.ProjectArray,
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    ...themeContextType,
  }

  /**
   * @returns {React.Component}
   */
  render() {
    return (
      <div>
        {map(this.props.projects, (project, id) => (
          <ProjectComponent
            key={id}
            project={project}
          />
        ))}
      </div>
    )
  }
}
export default ProjectListComponent
