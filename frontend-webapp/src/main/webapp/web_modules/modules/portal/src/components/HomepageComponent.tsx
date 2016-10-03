import * as React from "react"
import { map } from "lodash"
import { NewsItemComponent } from "@regardsoss/components"
import ProjectComponent from "../projects/components/ProjectComponent"

interface DatamanagementProps {
  params: any
  theme: any
  intl: any
  newsList: any
  projects: any
}

/**
 * Show the list of users for the current project
 */
class DatamanagementComponent extends React.Component<DatamanagementProps, any> {

  render (): JSX.Element {
    const theme = this.props.theme

    const {newsList, projects} = this.props
    const styleNews: React.CSSProperties = {
      display: "flex",
      justifyContent: "space-around"
    }


    const styleProjects: React.CSSProperties = {
      marginTop: "10px",
      marginBottom: "10px",
    }
    return (
      <div>
        <div style={styleNews}>

          {map(newsList, (news: any, id: number) => (
            <div
              key={id}
              className="col-sm-30"
            >
              <NewsItemComponent
                news={news}
              />
            </div>
          ))}
        </div>

        {map(projects, (project: any, id: number) => (
          <div
            style={styleProjects}
            key={id}
          >
            <ProjectComponent
              project={project}
              isAccessible={id === 0}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default DatamanagementComponent

