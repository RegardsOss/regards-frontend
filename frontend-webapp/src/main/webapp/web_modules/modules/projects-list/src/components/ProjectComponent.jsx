/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Lock from 'material-ui/svg-icons/action/lock-outline'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
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

  static contextTypes = {
    ...themeContextType,
  }


  getProjectUrl = () => (
     `/project/${this.props.project.projectId}/`
  )


  renderProject = () => {
    const { moduleTheme } = this.context
    const { project, isAccessible } = this.props
    let styleWhenDisabled = {}
    if (isAccessible === false) {
      styleWhenDisabled = moduleTheme.cardWhenDisabled
    }
    return (
      <Card style={styleWhenDisabled}>
        <div className="row" style={moduleTheme.container}>
          <div className="col-sm-12" style={moduleTheme.iconContainer}>
            {(() => {
              if (isAccessible) {
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
    const { isAccessible } = this.props
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

ProjectComponent.propTypes = {
  project: React.PropTypes.shape({
    description: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    isPublic: React.PropTypes.bool.isRequired,
    projectId: React.PropTypes.string.isRequired,
  }).isRequired,
  isAccessible: React.PropTypes.bool.isRequired,
}

export default ProjectComponent

