/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import connect from '@regardsoss/redux'
import { AccessProjectShape } from '@regardsoss/api'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import ProjectListComponent from '../components/ProjectListComponent'
import ProjectsSelector from '../model/ProjectsSelector'
import ProjectsAction from '../model/ProjectsAction'
/**
 * Display news and project list on the homepage
 */
export class ModuleContainer extends React.Component {

  static propTypes = {
    // Set by mapStateToProps
    projects: React.PropTypes.objectOf(AccessProjectShape),
    isFetching: React.PropTypes.bool,
    // Set by mapDispatchToProps
    fetchProjects: React.PropTypes.func,
  }
  componentWillMount() {
    this.props.fetchProjects()
  }
  /**
   * @returns {React.Component}
   */
  render() {
    if (!this.props.projects && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    const projects = []
    forEach(this.props.projects, project => projects.push(project.content))

    return (
      <div>
        <ProjectListComponent projects={projects} />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  projects: ProjectsSelector.getList(state),
  isFetching: ProjectsSelector.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(ProjectsAction.fetchEntityList(dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
