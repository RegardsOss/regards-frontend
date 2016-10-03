import * as React from "react"
import { Card, CardTitle, CardText } from "material-ui/Card"
import Avatar from "material-ui/Avatar"
import Lock from "material-ui/svg-icons/action/lock-outline"
import IconButton from "material-ui/IconButton"
import { ThemeContextType, ThemeContextInterface } from "@regardsoss/theme"
import { grey200 } from "material-ui/styles/colors"
interface ProjectProps {
  project: any
  isAccessible: boolean
}

/**
 * Show the list of users for the current project
 */
class ProjectComponent extends React.Component<ProjectProps, any> {

  static contextTypes: Object = ThemeContextType
  context: ThemeContextInterface


  getProjectUrl = () => {
    return "/" + this.props.project.projectId + "/"
  }

  render (): JSX.Element {
    const styleText = {
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxHeight: "4.8em",
      lineHeight: "1.6em",
      textAlign: "justify"
    }
    const styleTitle = {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    }
    const styleRootTitle = {
      paddingBottom: "0"
    }
    const styleIcon = {
      height: "100px",
      width: "100px"
    }
    const styleIconDisabled = {
      height: "100px",
      width: "100px",
      filter: "grayscale(100%)"
    }
    // Bootstrap columns with the same height using flex
    // http://stackoverflow.com/a/19695851/2294168
    const styleIconContainer: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }
    const styleContainer = {
      display: "flex",
      flexWrap: "wrap"
    }
    const styleDescriptionContent = {
      display: "flex",
      flexDirection: "column"
    }
    const styleLock = {
      position: "absolute",
      bottom: "45%",
      right: "45%"
    }
    const styleIconLock = {height: 60, width: 60}
    const {project, isAccessible} = this.props
    let styleWhenDisabled: React.CSSProperties = {}
    if (isAccessible === false) {
      styleWhenDisabled = {
        backgroundColor: grey200
      }
    }
    return (
      <Card style={styleWhenDisabled}>
        <div className="row" style={styleContainer}>
          <div className="col-sm-12" style={styleIconContainer}>
            {(() => {
              if (isAccessible) {
                return <Avatar
                  src={project.icon}
                  size={0}
                  style={styleIcon}
                />
              } else {
                return (
                  <div>
                    <Avatar
                      src={project.icon}
                      size={0}
                      style={styleIconDisabled}
                    />
                    <IconButton
                      size={40}
                      iconStyle={styleIconLock}
                      style={styleLock}
                      disableTouchRipple={true}
                    >
                      <Lock
                        color="white"
                      />
                    </IconButton>
                  </div>)
              }
            })()}
          </div>
          <div className="col-sm-88" style={styleDescriptionContent}>
            <CardTitle
              title={ project.name }
              titleStyle={styleTitle}
              style={styleRootTitle}
            />
            <CardText>
              <div style={styleText}>
                { project.description }
              </div>
            </CardText>
          </div>
        </div>
      </Card>
    )
  }
}

export default ProjectComponent

