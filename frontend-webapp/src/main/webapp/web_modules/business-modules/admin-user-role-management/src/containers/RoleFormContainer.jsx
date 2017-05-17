/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent, EnumInputsHelper } from '@regardsoss/form-utils'
import { Role } from '@regardsoss/model'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import RoleFormComponent from '../components/RoleFormComponent'

export class RoleFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      role_name: PropTypes.string,
    }),
    // from mapStateToProps
    roleList: PropTypes.objectOf(Role),
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    createRole: PropTypes.func,
    fetchRoleList: PropTypes.func,
    updateRole: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.role_name !== undefined,
    }
  }

  componentDidMount() {
    this.props.fetchRoleList()
  }
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/role/list`
  }

  getFormComponent = () => {
    const { roleList } = this.props
    if (this.state.isEditing) {
      const { isFetching, params } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      const role = roleList[params.role_name]
      if (role) {
        return (<RoleFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentRole={role}
          roleList={roleList}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<RoleFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
      roleList={roleList}
    />)
  }

  handleUpdate = (values) => {
    const role = this.props.roleList[this.props.params.role_name]
    const authorizedAddresses = EnumInputsHelper.formValuesIntoApiData(values, 'authorizedAddresses')
    const updatedRole = Object.assign({}, role.content, {
      authorizedAddresses,
      name: values.name,
      isCorsRequestsAuthorized: values.isCorsRequestsAuthorized,
    })
    // The PUBLIC role doesn't have any parent
    if (this.props.params.role_name !== 'PUBLIC') {
      updatedRole.parentRole = this.props.roleList[values.parentRole].content
    }
    Promise.resolve(this.props.updateRole(role.content.name, updatedRole))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleCreate = (values) => {
    const authorizedAddresses = EnumInputsHelper.formValuesIntoApiData(values, 'authorizedAddresses')
    const parentRole = this.props.roleList[values.parentRole].content
    Promise.resolve(this.props.createRole({
      name: values.name,
      isCorsRequestsAuthorized: values.isCorsRequestsAuthorized,
      authorizedAddresses,
      parentRole,
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
      <I18nProvider messageDir="business-modules/admin-user-role-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  roleList: roleSelectors.getList(state),
  isFetching: roleSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createRole: values => dispatch(roleActions.createEntity(values)),
  updateRole: (roleName, values) => dispatch(roleActions.updateEntity(roleName, values)),
  fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleFormContainer)
