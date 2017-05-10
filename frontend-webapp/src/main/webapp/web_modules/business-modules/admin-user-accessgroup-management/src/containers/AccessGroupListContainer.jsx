/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessGroup } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessGroupActions from '../model/AccessGroupActions'
import AccessGroupSelectors from '../model/AccessGroupSelectors'
import AccessGroupListComponent from '../components/AccessGroupListComponent'

/**
 * Show the group list
 */
export class AccessGroupListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    accessGroupList: React.PropTypes.objectOf(AccessGroup),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchAccessGroupList: React.PropTypes.func,
    deleteAccessGroup: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchAccessGroupList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/accessgroup/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  handleDuplicate = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/accessgroup/${accessgroupName}/duplicate`
    browserHistory.push(url)
  }

  handleEdit = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/accessgroup/${accessgroupName}/edit`
    browserHistory.push(url)
  }

  handleDelete =(accessgroupName) => {
    this.props.deleteAccessGroup(accessgroupName)
  }

  render() {
    const { accessGroupList, isFetching } = this.props
    return (
      <I18nProvider messageDir="modules/admin-user-accessgroup-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <AccessGroupListComponent
            accessGroupList={accessGroupList}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroupList: AccessGroupSelectors.getList(state),
  isFetching: AccessGroupSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAccessGroupList: () => dispatch(AccessGroupActions.fetchPagedEntityList(0, 100)),
  deleteAccessGroup: id => dispatch(AccessGroupActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupListContainer)
