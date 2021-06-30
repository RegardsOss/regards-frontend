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
import { Link } from 'react-router'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Lock from 'mdi-material-ui/Lock'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
/*
interface ProjectProps {
  project: any
  isAccessible: boolean
} */

/**
 * Show the list of users for the current project
 */
class ProjectComponent extends React.Component {
  /**
   * @type {{projects: *, theme: *}}
   */
  static propTypes = {
    project: AccessShapes.Project,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getProjectUrl = () => (
    `/user/${this.props.project.content.name}/`
  )

  renderProject = () => {
    const { moduleTheme } = this.context
    const { project } = this.props
    if (project.content.isAccessible && !project.content.isDeleted) {
      return (
        <div
          style={moduleTheme.betweenProjects}
          className="col-md-70 col-md-offset-15"
        >
          <Card>
            <div className="row" style={moduleTheme.container}>
              <div className="col-sm-12" style={moduleTheme.iconContainer}>
                {(() => {
                  if (project.content.isPublic) {
                    return (<Avatar
                      src={project.content.icon}
                      size={0}
                      style={moduleTheme.icon}
                    />)
                  }
                  return (
                    <div>
                      <Avatar
                        src={project.content.icon}
                        size={0}
                        style={moduleTheme.iconDisabled}
                      />
                      <IconButton
                        size={40}
                        iconStyle={moduleTheme.iconLock}
                        style={moduleTheme.lock}
                        disableTouchRipple
                      >
                        <Lock
                          color="white"
                        />
                      </IconButton>
                    </div>)
                })()}
              </div>
              <div className="col-sm-88" style={moduleTheme.descriptionContent}>
                <CardTitle
                  title={project.content.label}
                  titleStyle={moduleTheme.title}
                  style={moduleTheme.rootTitle}
                />
                <CardText>
                  <div style={moduleTheme.text}>
                    {project.content.description}
                  </div>
                </CardText>
              </div>
            </div>
          </Card>
        </div>
      )
    }
    return null
  }

  render() {
    const { moduleTheme } = this.context
    const { isAccessible } = this.props.project.content
    if (isAccessible === false) {
      return this.renderProject()
    }
    return (
      <Link to={this.getProjectUrl()} style={moduleTheme.linkWithoutDecoration}>
        {this.renderProject()}
      </Link>
    )
  }
}

export default ProjectComponent
