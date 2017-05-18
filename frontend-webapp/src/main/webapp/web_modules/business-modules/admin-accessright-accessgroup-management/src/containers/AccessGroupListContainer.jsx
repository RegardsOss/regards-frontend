/**
 * LICENSE_PLACEHOLDER
 **/
import keys from 'lodash/keys'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessGroup } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import AccessGroupListComponent from '../components/AccessGroupListComponent'

/**
 * Show the group list
 */
export class AccessGroupListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    accessGroupList: PropTypes.objectOf(AccessGroup).isRequired,
    isFetching: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchAccessGroupList: PropTypes.func,
    deleteAccessGroup: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchAccessGroupList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/access-right/access-group/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/access-right/board`
  }

  handleDuplicate = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/access-right/access-group/${accessgroupName}/duplicate`
    browserHistory.push(url)
  }

  handleEdit = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/access-right/access-group/${accessgroupName}/edit`
    browserHistory.push(url)
  }

  handleEditAccessRights = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/access-right/access-rights/${accessgroupName}`
    browserHistory.push(url)
  }

  handleDelete =(accessgroupName) => {
    this.props.deleteAccessGroup(accessgroupName)
  }

  render() {
    const { accessGroupList, isFetching } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-accessright-accessgroup-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
          isEmpty={!isFetching && accessGroupList && keys(accessGroupList).length === 0}
          emptyMessage={<FormattedMessage id="group.list.empty" />}
        >
          <AccessGroupListComponent
            accessGroupList={accessGroupList}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleEditAccessRights={this.handleEditAccessRights}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroupList: accessGroupSelectors.getList(state),
  isFetching: accessGroupSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAccessGroupList: () => dispatch(accessGroupActions.fetchPagedEntityList(0, 100)),
  deleteAccessGroup: id => dispatch(accessGroupActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupListContainer)
