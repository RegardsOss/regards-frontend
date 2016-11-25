
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import * as actions from '../model/ProjectActions'
import ProjectCreateComponent from '../components/ProjectCreateComponent'

export class ProjectCreateContainer extends React.Component {
  static propTypes = {
    createProject: React.PropTypes.func,
  }

  getBackUrl = () => ('/admin/project/list')

  handleCreate = (values) => {
    this.props.createProject({
      name: values.name,
      description: values.description,
      icon: values.icon,
      isPublic: values.isPublic
    })
    const url = this.getBackUrl()
    browserHistory.push(url)
  }


  render() {
    return (
      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
        <ProjectCreateComponent
          handleCreate={this.handleCreate}
          backUrl={this.getBackUrl()}
        />
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createProject: (values) => dispatch(actions.createProject(values)),
})

export default connect(null, mapDispatchToProps)(ProjectCreateContainer)
