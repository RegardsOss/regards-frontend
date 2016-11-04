
import { map } from 'lodash'
import ProjectComponent from '../components/ProjectComponent'


/**
 * Show the list of users for the current project
 */
class ProjectFeedContainer extends React.Component {


  render() {
    const { projects } = this.props
    const style = {
      marginTop: '10px',
      marginBottom: '10px',
    }
    return (
      <div>
        {map(projects, (project, id) => (
          <div
            style={style}
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
ProjectFeedContainer.propTypes = {
  projects: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
}
export default ProjectFeedContainer

