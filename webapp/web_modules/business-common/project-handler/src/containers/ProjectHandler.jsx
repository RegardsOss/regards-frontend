/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import has from 'lodash/has'
import root from 'window-or-global'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import ProjectClient from '../clients/ProjectClient'

/**
 * Handler to manage project of the current interface.
 */
class ProjectHandler extends React.Component {
  static propTypes = {
    projectName: PropTypes.string,
    title: PropTypes.string,
    // From mapStateToProps
    project: AdminShapes.Project,
    fetchProject: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchProject(this.props.projectName).then((actionResult) => {
      if (!has(actionResult, 'error') && root && root.document && root.document.querySelector) {
        // Update meta tag of the current html page
        root.document.querySelector('meta[name="title"]').setAttribute('content', this.props.project.content.name)
        root.document.querySelector('meta[name="description"]').setAttribute('content', this.props.project.content.description)
        const title = `${this.props.project.content.label} ${this.props.title}`
        if (root.document.title !== title) {
          root.document.title = title
        }
        this.setFavicon(this.props.project.content.icon)
      }
    })
  }

  setFavicon = (icon = 'img/logo_regards_grey_black.png') => {
    const link = root.document.querySelector("link[rel*='icon']") || document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = icon
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  render() {
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  project: ProjectClient.projectSelectors.getById(state, ownProps.projectName),
})

const mapDispatchToProps = (dispatch) => ({
  fetchProject: (project) => dispatch(ProjectClient.projectActions.fetchEntity(project)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHandler)
