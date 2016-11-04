
import { map } from 'lodash'
import { NewsItemComponent } from '@regardsoss/components'
import ProjectComponent from '../projects/components/ProjectComponent'


/**
 * Show the list of users for the current project
 */
class DatamanagementComponent extends React.Component {

  render() {
    const theme = this.props.theme

    const { newsList, projects } = this.props
    const styleNews = {
      display: 'flex',
      justifyContent: 'space-around',
    }


    const styleProjects = {
      marginTop: '10px',
      marginBottom: '10px',
    }
    return (
      <div>
        <div style={styleNews}>

          {map(newsList, (news, id) => (
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

        {map(projects, (project, id) => (
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
DatamanagementComponent.propTypes = {
  theme: React.PropTypes.objectOf(React.PropTypes.string),
  newsList: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  projects: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
}

/*
 interface DatamanagementProps {
 params: any
 theme: any
 intl: any
 newsList: any
 projects: any
 }*/
export default DatamanagementComponent

