import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Role } from '@regardsoss/model'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import RoleActions from '../model/RoleActions'
import ResourceAccessActions from '../model/ResourceAccessActions'
import RoleSelectors from '../model/RoleSelectors'
import ResourceAccessSelectors from '../model/ResourceAccessSelectors'
import ResourceAccessFormComponent from '../components/ResourceAccessFormComponent'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string.isRequired,
      role_name: React.PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    role: Role,
    isRoleFetching: React.PropTypes.bool,
    // from fetchRole
    fetchRole: React.PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchRole(this.props.params.role_name)
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/role/list`
  }

  getForm = () => {
    const { role, isRoleFetching } = this.props
    if (isRoleFetching && !role) {
      return (<FormLoadingComponent />)
    }
    if (role) {
      return (
        <ResourceAccessFormComponent
          microserviceList={['rs-admin', 'rs-access', 'rs-dam']}
          backUrl={this.getBackUrl()}
          currentRole={role}
        />)
    }
    return (<FormEntityNotFoundComponent />)
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-user-role-resource-access-management/src/i18n">
        {this.getForm()}
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  role: RoleSelectors.getById(state, ownProps.params.role_name),
  isRoleFetching: RoleSelectors.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchRole: roleName => dispatch(RoleActions.fetchEntity(roleName, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourceAccessFormContainer)

