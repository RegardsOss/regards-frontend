import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import RoleActions from '../model/RoleActions'
import RoleSelectors from '../model/RoleSelectors'
import RoleListComponent from '../components/RoleListComponent'

/**
 * React container to manage project role list.
 *
 */
export class RoleListContainer extends React.Component {

  static propTypes = {
    roleList: React.PropTypes.objectOf(
      React.PropTypes.shape({
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
    ),
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

  handleEdit = (roleId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/role/${roleId}/edit`
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

