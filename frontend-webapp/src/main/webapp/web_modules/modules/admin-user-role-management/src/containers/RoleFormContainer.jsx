import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import RoleActions from '../model/RoleActions'
import RoleFormComponent from '../components/RoleFormComponent'
import RoleSelectors from '../model/RoleSelectors'

export class RoleFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      role_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    role: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        parentRole: React.PropTypes.shape({
          id: React.PropTypes.number,
        }),
        isDefault: React.PropTypes.bool,
        isNative: React.PropTypes.bool,
        authorizedAddresses: [],
      }),
    }),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createRole: React.PropTypes.func,
    fetchRole: React.PropTypes.func,
    updateRole: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.role_id !== undefined,
    }
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchRole(this.props.params.role_id)
    }
  }
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/project/${project}/user/role/list`
  }

  getFormComponent = () => {
    if (this.state.isEditing) {
      const { role, isFetching } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      if (role) {
        return (<RoleFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentRole={role}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<RoleFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }

  handleUpdate = (values) => {
    const updatedProject = Object.assign({}, this.props.role.content, {
      description: values.description,
      icon: values.icon,
      isPublic: values.isPublic,
    })
    Promise.resolve(this.props.updateRole(this.props.role.content.id, updatedProject))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createRole({
      name: values.name,
      description: values.description,
      icon: values.icon,
      isPublic: values.isPublic,
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
    return (
      <I18nProvider messageDir="modules/admin-user-role-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  project: ownProps.params.role_id ? RoleSelectors.getById(state, ownProps.params.role_id) : null,
  isFetching: RoleSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createRole: values => dispatch(RoleActions.createEntity(values)),
  updateRole: (id, values) => dispatch(RoleActions.updateEntity(id, values)),
  fetchRole: id => dispatch(RoleActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleFormContainer)
