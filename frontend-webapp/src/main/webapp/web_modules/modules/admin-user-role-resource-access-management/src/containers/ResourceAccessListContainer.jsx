import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import RoleActions from '../model/RoleActions'
import RoleSelectors from '../model/RoleSelectors'
import RoleListComponent from '../components/RoleListComponent'

/**
 * React container to manage resource access list in order
 * to see which role can use that resource.
 */
export class RoleListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    this.props.fetchRoleList()
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  render() {
    const { roleList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-user-role-management/src/i18n">
        <RoleListComponent
          roleList={roleList}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
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

