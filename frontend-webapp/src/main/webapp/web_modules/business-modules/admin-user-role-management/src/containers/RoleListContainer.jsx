/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Role } from '@regardsoss/model'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import RoleListComponent from '../components/RoleListComponent'

/**
 * React container to manage project role list.
 *
 */
export class RoleListContainer extends React.Component {

  static propTypes = {
    roleList: PropTypes.objectOf(Role),
    fetchRoleList: PropTypes.func,
    deleteRole: PropTypes.func,
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    this.props.fetchRoleList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/role/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  handleEdit = (roleName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/role/${roleName}/edit`
    browserHistory.push(url)
  }

  handleEditResourceAccess = (roleName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/role-resource-access/${roleName}/edit`
    browserHistory.push(url)
  }

  handleDelete =(roleName) => {
    this.props.deleteRole(roleName)
  }

  render() {
    const { roleList } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-user-role-management/src/i18n">
        <RoleListComponent
          roleList={roleList}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleEditResourceAccess={this.handleEditResourceAccess}
          handleOpen={this.handleOpen}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  roleList: roleSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
  deleteRole: roleName => dispatch(roleActions.deleteEntity(roleName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleListContainer)

