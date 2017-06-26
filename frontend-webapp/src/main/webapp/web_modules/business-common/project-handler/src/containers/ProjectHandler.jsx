/**
 * LICENSE_PLACEHOLDER
 **/
import has from 'lodash/has'
import root from 'window-or-global'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import ProjectClient from '../clients/ProjectClient'

/**
 * Handler to manage project of the current interface.
 */
class ProjectHandler extends React.Component {

  static propTypes = {
    projectName: PropTypes.string,
    title: PropTypes.string,
    // From mapStateToProps
    project: AdminShapes.Project,
    fetchProject: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchProject(this.props.projectName).then(
      (ActionResult) => {
        if (!has(ActionResult, 'error') && root && root.document && root.document.querySelector) {
          // Update meta tag of the current html page
          root.document.querySelector('meta[name="title"]').setAttribute('content', this.props.project.content.name)
          root.document.querySelector('meta[name="description"]').setAttribute('content', this.props.project.content.description)
          const title = `${this.props.project.content.label} ${this.props.title}`
          if (root.document.title !== title) {
            root.document.title = title
          }
        }
      },
    )
  }


  render() {
    return null
  }

}

const mapStateToProps = (state, ownProps) => ({
  project: ProjectClient.projectSelectors.getById(state, ownProps.projectName),
})

const mapDispatchToProps = dispatch => ({
  fetchProject: project => dispatch(ProjectClient.projectActions.fetchEntity(project)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHandler)
