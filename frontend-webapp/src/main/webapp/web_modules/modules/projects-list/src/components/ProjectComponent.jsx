/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Lock from 'material-ui/svg-icons/action/lock-outline'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { AccessProjectShape } from '@regardsoss/api'
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
    project: AccessProjectShape,
  }

  static contextTypes = {
    ...themeContextType,
  }


  getProjectUrl = () => (
     `/user/${this.props.project.id}/`
  )

  renderProject = () => {
    const { moduleTheme } = this.context
    const { project } = this.props
    let styleWhenDisabled = {}
    if (project.isAccessible === false) {
      styleWhenDisabled = moduleTheme.cardWhenDisabled
    }
    return (
      <Card style={styleWhenDisabled}>
        <div className="row" style={moduleTheme.container}>
          <div className="col-sm-12" style={moduleTheme.iconContainer}>
            {(() => {
              if (project.isAccessible) {
                return (<Avatar
                  src={project.icon}
                  size={0}
                  style={moduleTheme.icon}
                />)
              }
              return (
                <div>
                  <Avatar
                    src={project.icon}
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
              title={project.name}
              titleStyle={moduleTheme.title}
              style={moduleTheme.rootTitle}
            />
            <CardText>
              <div style={moduleTheme.text}>
                { project.description }
              </div>
            </CardText>
          </div>
        </div>
      </Card>
    )
  }
  render() {
    const { muiTheme } = this.context
    const { isAccessible } = this.props.project
    if (isAccessible === false) {
      return this.renderProject()
    }
    return (
      <Link
        to={this.getProjectUrl()}
        style={muiTheme.linkWithoutDecoration}
      >
        {this.renderProject()}
      </Link>
    )
  }
}

export default ProjectComponent

