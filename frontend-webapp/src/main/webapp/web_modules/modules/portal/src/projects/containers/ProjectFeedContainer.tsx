import * as React from "react"
import { map } from "lodash"
import ProjectComponent from "../components/ProjectComponent"

interface ProjectFeedProps {
  params: any,
  theme: any,
  projects: any
}

/**
 * Show the list of users for the current project
 */
class ProjectFeedContainer extends React.Component<ProjectFeedProps, any> {


  render (): JSX.Element {
    const {projects} = this.props
    const style: React.CSSProperties = {
      marginTop: "10px",
      marginBottom: "10px",
    }
    return (
      <div>
        {map(projects, (project: any, id: number) => (
          <div
            style={style}
            key={id}
          >
            <ProjectComponent
              project={project}
              isAccessible={id ===0}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default ProjectFeedContainer

