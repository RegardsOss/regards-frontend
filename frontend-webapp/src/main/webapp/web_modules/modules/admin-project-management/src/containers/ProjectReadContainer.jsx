
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import ProjectSelectors from '../model/ProjectSelectors'

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
    project: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    projects: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
    theme: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  }

  handleEdit = () => {
    console.log('todo')
  }

  handleDelete = () => {
    console.log('todo')
  }

  handleBackClick = () => {
    const url = `/admin/project/list`
    browserHistory.push(url)
  }

  render() {
    return (

      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
        <ProjectListComponent
          projectList={projectList}
          createUrl={this.getCreateUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleView={this.handleView}
        />
      </I18nProvider>
    )
  }
}




const mapStateToProps = (state, ownProps) => ({
  project: ProjectSelectors.getProjectById(state, ),
})

export default connect(mapStateToProps)(ProjectReadContainer)
