/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { AdminDomain } from '@regardsoss/domain'
import { FiltersPaneHelper } from '@regardsoss/domain/ui'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { groupsCountActions, groupsCountSelectors } from '../clients/GroupsCountClient'
import AccessGroupListComponent from '../components/AccessGroupListComponent'
import messages from '../i18n'

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
    accessGroupList: DataManagementShapes.AccessGroupList.isRequired,
    isFetching: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    groupsCount: PropTypes.object,
    // from mapDispatchToProps
    fetchAccessGroupList: PropTypes.func,
    deleteAccessGroup: PropTypes.func,
    fetchGroupsCount: PropTypes.func,
  }

  static PAGE_SIZE = 2000

  UNSAFE_componentWillMount() {
    this.props.fetchAccessGroupList()
    this.props.fetchGroupsCount()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/access-group/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  /**
   * User callback: request to show group content
   */
  handleShowGroupUsers = (accessgroupName) => {
    const { params: { project } } = this.props
    FiltersPaneHelper.updateURL(AdminDomain.ProjectUserFilters.builder().withGroup(accessgroupName).build(), [],
      `/admin/${project}/user/project-user/list/accessRight`)
  }

  handleDuplicate = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/access-group/${accessgroupName}/duplicate`
    browserHistory.push(url)
  }

  handleEdit = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/access-group/${accessgroupName}/edit`
    browserHistory.push(url)
  }

  handleEditAccessRights = (accessgroupName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/access-rights/${accessgroupName}`
    browserHistory.push(url)
  }

  handleDelete = (accessgroupName) => {
    this.props.deleteAccessGroup(accessgroupName)
  }

  render() {
    const { accessGroupList, isFetching, groupsCount } = this.props
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <AccessGroupListComponent
            accessGroupList={accessGroupList}
            handleShowGroupUsers={this.handleShowGroupUsers}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleEditAccessRights={this.handleEditAccessRights}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
            groupsCount={groupsCount}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroupList: accessGroupSelectors.getList(state),
  isFetching: accessGroupSelectors.isFetching(state),
  groupsCount: groupsCountSelectors.getGroupsCount(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccessGroupList: () => dispatch(accessGroupActions.fetchPagedEntityList(0, AccessGroupListContainer.PAGE_SIZE)),
  deleteAccessGroup: (id) => dispatch(accessGroupActions.deleteEntity(id)),
  fetchGroupsCount: () => dispatch(groupsCountActions.fetchGroupsCount()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupListContainer)
