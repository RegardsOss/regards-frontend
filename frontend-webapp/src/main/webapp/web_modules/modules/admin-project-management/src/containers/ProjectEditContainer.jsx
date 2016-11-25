import { I18nProvider } from '@regardsoss/i18n'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import ProjectSelectors from '../model/ProjectSelectors'
import ProjectEditComponent from "../components/ProjectEditComponent"
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

export class ProjectReadContainer extends React.Component {
  static propTypes = {
    project: React.PropTypes.objectOf(React.PropTypes.string),
    params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  }

  handleEdit = () => {
    console.log('todo')
  }

  getBackUrl = () => {
    return '/admin/project/list'
  }

  render() {
    const { project } = this.props
    return (
      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
        <ProjectEditComponent
          project={project}
          backUrl={this.getBackUrl()}
          handleEdit={this.handleEdit}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  project: ProjectSelectors.getProjectById(state, ownProps.params.project_id),
})

export default connect(mapStateToProps)(ProjectReadContainer)
