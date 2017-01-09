/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import { connect } from '@regardsoss/redux'
import { AccessProject } from '@regardsoss/model'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import ProjectListComponent from '../components/ProjectListComponent'
import ProjectsSelector from '../model/ProjectsSelector'
import ProjectsAction from '../model/ProjectsAction'
/**
 * Display news and project list on the homepage
 */
export class ModuleContainer extends React.Component {

  static propTypes = {
    // Set by module loader
    appName: React.PropTypes.string.isRequired,
    // Set by mapStateToProps
    projects: React.PropTypes.objectOf(AccessProject),
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

const mapStateToProps = (state, props) => ({
  projects: ProjectsSelector(props.appName).getList(state),
  isFetching: ProjectsSelector(props.appName).isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(ProjectsAction.fetchPagedEntityList(dispatch, 0, 100)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
