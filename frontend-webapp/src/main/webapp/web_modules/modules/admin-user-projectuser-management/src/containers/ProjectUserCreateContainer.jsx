import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import ProjectUserActions from '../model/ProjectUserActions'
import ProjectUserCreateComponent from '../components/ProjectUserCreateComponent'

export class ProjectUserCreateContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapDispatchToProps
    createProjectUser: React.PropTypes.func,
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/list`
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createProjectUser({
      email: values.email,
      role_id: values.firstName,
      status: values.lastName,
    }))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }
  render() {
    return (
      <I18nProvider messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserCreateComponent
          onSubmit={this.handleCreate}
          backUrl={this.getBackUrl()}
        />
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createProjectUser: values => dispatch(ProjectUserActions.createEntity(values)),
})

export default connect(null, mapDispatchToProps)(ProjectUserCreateContainer)
