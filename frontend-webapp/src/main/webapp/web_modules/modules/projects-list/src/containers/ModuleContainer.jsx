/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
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
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string.isRequired,
    // Set by mapStateToProps
    projects: PropTypes.objectOf(AccessProject),
    isFetching: PropTypes.bool,
    // Set by mapDispatchToProps
    fetchProjects: PropTypes.func,
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
    return (
      <div>
        <ProjectListComponent
          projects={values(this.props.projects)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  projects: ProjectsSelector(props.appName).getList(state),
  isFetching: ProjectsSelector(props.appName).isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(ProjectsAction.fetchPagedEntityList(0, 100)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
