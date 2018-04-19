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
import { CommonShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import ProjectAboutPageLinkComponent from '../../components/user/ProjectAboutPageLinkComponent'

/**
* About project page link container
* @author Raphaël Mechali
*/
export class ProjectAboutPageLinkContainer extends React.Component {
  static propTypes = {
    // CONTEXT: app name
    appName: PropTypes.string.isRequired,
    // CONTEXT: project
    project: PropTypes.string,
    // about page URL (if not provided, hide this component)
    projectAboutPage: CommonShapes.URL,
  }

  render() {
    const { projectAboutPage, appName, project } = this.props
    return (
      <ShowableAtRender show={!!projectAboutPage} >
        <ProjectAboutPageLinkComponent
          appName={appName}
          project={project}
          projectAboutPage={projectAboutPage}
        />
      </ShowableAtRender>
    )
  }
}
export default ProjectAboutPageLinkContainer