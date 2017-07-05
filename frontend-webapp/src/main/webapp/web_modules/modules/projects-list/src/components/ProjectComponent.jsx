/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Lock from 'material-ui/svg-icons/action/lock-outline'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { AccessProject } from '@regardsoss/model'
import { Link } from 'react-router'
/*
interface ProjectProps {
  project: any
  isAccessible: boolean
}*/

/**
 * Show the list of users for the current project
 */
class ProjectComponent extends React.Component {

  /**
   * @type {{projects: *, theme: *}}
   */
  static propTypes = {
    project: AccessProject,
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
                  { project.content.description }
                </div>
              </CardText>
            </div>
          </div>
        </Card>
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
      <Link
        to={this.getProjectUrl()}
        style={moduleTheme.linkWithoutDecoration}
      >
        {this.renderProject()}
      </Link>
    )
  }
}

export default ProjectComponent

