/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { AccessProject } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import ProjectComponent from './ProjectComponent'

/**
 * Show the list of users for the current project
 */
class ProjectListComponent extends React.Component {
  /**
   * @type {{projects: *, theme: *}}
   */
  static propTypes = {
    projects: React.PropTypes.arrayOf(AccessProject),
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    ...themeContextType,
  }

  /**
   * @returns {React.Component}
   */
  render() {
    // const { projects } = this.props
    const { moduleTheme } = this.context

    return (
      <div>
        {map(this.props.projects, (project, id) => (
          <div
            style={moduleTheme.betweenProjects}
            key={id}
            className="col-md-70 col-md-offset-15"
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
export default ProjectListComponent

