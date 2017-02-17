import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import RoleActions from '../model/RoleActions'
import RoleSelectors from '../model/RoleSelectors'
import AccessesActions from '../model/AccessesActions'
import ProjectUserCreateComponent from '../components/ProjectUserCreateComponent'

export class ProjectUserCreateContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    roleList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
        }),
      }),
    ),
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapDispatchToProps
    createProjectUser: React.PropTypes.func,
    fetchRoleList: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchRoleList()
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/list`
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createProjectUser({
      email: values.email,
      roleName: values.roleName,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.lastName,
      metaData: [],
      permissions: [],
    }))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }
  render() {
    console.log('ProjectUserCreateContainer::render')
    const { roleList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserCreateComponent
          onSubmit={this.handleCreate}
          backUrl={this.getBackUrl()}
          roleList={roleList}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  roleList: RoleSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  createProjectUser: values => dispatch(AccessesActions.createEntity(values)),
  fetchRoleList: () => dispatch(RoleActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserCreateContainer)
