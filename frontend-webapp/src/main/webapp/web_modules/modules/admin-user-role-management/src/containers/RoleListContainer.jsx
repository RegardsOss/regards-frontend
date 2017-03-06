/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Role } from '@regardsoss/model'
import RoleActions from '../model/RoleActions'
import RoleSelectors from '../model/RoleSelectors'
import RoleListComponent from '../components/RoleListComponent'

/**
 * React container to manage project role list.
 *
 */
export class RoleListContainer extends React.Component {

  static propTypes = {
    roleList: React.PropTypes.objectOf(Role),
    fetchRoleList: React.PropTypes.func,
    deleteRole: React.PropTypes.func,
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string.isRequired,
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

  handleDelete =(roleId) => {
    this.props.deleteRole(roleId)
  }

  render() {
    const { roleList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-user-role-management/src/i18n">
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
  roleList: RoleSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchRoleList: () => dispatch(RoleActions.fetchEntityList()),
  deleteRole: id => dispatch(RoleActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleListContainer)

