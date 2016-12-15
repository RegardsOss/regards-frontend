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
    const { muiTheme } = this.context
    const style = {
      text: muiTheme.portalApp.modules.common.newsStyle.text,
      title: muiTheme.portalApp.modules.common.newsStyle.title,
      rootTitle: muiTheme.portalApp.modules.common.newsStyle.rootTitle,
      icon: muiTheme.portalApp.modules.common.newsStyle.icon,
      iconDisabled: muiTheme.portalApp.modules.common.newsStyle.iconDisabled,
      iconContainer: muiTheme.portalApp.modules.common.newsStyle.iconContainer,
      descriptionContent: muiTheme.portalApp.modules.common.newsStyle.descriptionContent,
      lock: muiTheme.portalApp.modules.common.newsStyle.lock,
      iconLock: muiTheme.portalApp.modules.common.newsStyle.iconLock,
      cardWhenDisabled: muiTheme.portalApp.modules.common.newsStyle.cardWhenDisabled,
    }
    const { project, isAccessible } = this.props
    let styleWhenDisabled = {}
    if (isAccessible === false) {
      styleWhenDisabled = style.cardWhenDisabled
    }
    return (
      <Card style={styleWhenDisabled}>
        <div className="row" style={style.container}>
          <div className="col-sm-12" style={style.iconContainer}>
            {(() => {
              if (isAccessible) {
                return (<Avatar
                  src={project.icon}
                  size={0}
                  style={style.icon}
                />)
              }
              return (
                <div>
                  <Avatar
                    src={project.icon}
                    size={0}
                    style={style.iconDisabled}
                  />
                  <IconButton
                    size={40}
                    iconStyle={style.iconLock}
                    style={style.lock}
                    disableTouchRipple
                  >
                    <Lock
                      color="white"
                    />
                  </IconButton>
                </div>)
            })()}
          </div>
          <div className="col-sm-88" style={style.descriptionContent}>
            <CardTitle
              title={project.name}
              titleStyle={style.title}
              style={style.rootTitle}
            />
            <CardText>
              <div style={style.text}>
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

