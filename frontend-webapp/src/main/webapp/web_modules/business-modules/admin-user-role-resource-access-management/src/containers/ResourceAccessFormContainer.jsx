import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Role, Resource } from '@regardsoss/model'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { roleActions, roleSelectors } from '../client/RoleClient'
import { roleResourceActions, roleResourceSelectors } from '../client/RoleResourceClient'
import ResourceAccessFormComponent from '../components/ResourceAccessFormComponent'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      role_name: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    role: Role,
    isRoleFetching: PropTypes.bool,
    roleResources: PropTypes.arrayOf(Resource),
    isResourcesFetching: PropTypes.bool,
    // from fetchRole
    fetchRole: PropTypes.func,
    fetchRoleResources: PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchRole(this.props.params.role_name)
    this.props.fetchRoleResources(this.props.params.role_name)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.role_name !== nextProps.params.role_name) {
      this.props.fetchRole(nextProps.params.role_name)
      this.props.fetchRoleResources(nextProps.params.role_name)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/role/list`
  }

  getForm = () => {
    const { role, isRoleFetching, roleResources, isResourcesFetching } = this.props
    if ((isRoleFetching && !role) || (isResourcesFetching && !roleResources)) {
      return (<FormLoadingComponent />)
    }
    if (role) {
      return (
        <ResourceAccessFormComponent
          microserviceList={STATIC_CONFIGURATION.microservices}
          backUrl={this.getBackUrl()}
          editRoleResources={this.editRoleResources}
          currentRole={role}
          roleResources={roleResources}
        />)
    }
    return (<FormEntityNotFoundComponent />)
  }

  editRoleResources = (role) => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/role-resource-access/${role.content.name}/edit`)
  }

  render() {
    return (
      <I18nProvider messageDir="business-modules/admin-user-role-resource-access-management/src/i18n">
        {this.getForm()}
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  role: roleSelectors.getById(state, ownProps.params.role_name),
  roleResources: roleResourceSelectors.getOrderedList(state),
  isRoleFetching: roleSelectors.isFetching(state),
  isResourcesFetching: roleResourceSelectors.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchRole: roleName => dispatch(roleActions.fetchEntity(roleName)),
  fetchRoleResources: roleName => dispatch(roleResourceActions.fetchEntityList({ role_name: roleName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourceAccessFormContainer)

