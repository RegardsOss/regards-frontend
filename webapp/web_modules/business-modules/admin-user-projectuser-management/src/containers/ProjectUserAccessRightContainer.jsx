/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import get from 'lodash/get'
import { DataManagementShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { projectUserSignalSelectors } from '../clients/ProjectUserSignalClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import ProjectUserAccessRightComponent from '../components/list/ProjectUserAccessRightComponent'

/**
 * @author Théo Lasserre
 */
export class ProjectUserAccessRightContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    csvLink: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    // from mapStateToProps
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    groups: DataManagementShapes.AccessGroupList.isRequired,
    isFetchingViewData: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    onDeleteAccount: PropTypes.func.isRequired,
    fetchGroups: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      pageMeta: projectUserSelectors.getMetaData(state),
      isFetchingViewData: projectUserSelectors.isFetching(state),
      isFetchingActions: projectUserSignalSelectors.isFetching(state),
      groups: accessGroupSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      onDeleteAccount: (userId) => dispatch(projectUserActions.deleteEntity(userId)),
      fetchGroups: () => dispatch(accessGroupActions.fetchPagedEntityList()),
    }
  }

  state = { isFetching: false }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    // Fetch view data
    const { fetchGroups } = this.props
    fetchGroups()
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount = () => {
    this.setState({ isFetching: false })
  }

  /**
   * User callback: edit project user
   * @param userId user id
   */
  onEdit = (userId) => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/user/project-user/${userId}/edit`)
  }

  onDeleteAccount = (accountId, onRefresh) => {
    const { onDeleteAccount } = this.props
    this.performAll([onDeleteAccount(accountId)], onRefresh)
  }

  /**
   * Set actions fetching state
   * @param {bool} isFetchingActions is fetching actions?
   */
  setFetching = (isFetching) => this.setState({ isFetching })

  /**
   * Marks fetching true, performs all promises as parameter, update waiting users state then marks fetching false
   * @param promises promises
   */
  performAll = (promises, onRefresh) => {
    this.setFetching(true)
    const onDone = () => { this.setFetching(false) }
    Promise.all(promises).then(() => Promise.all([
      onRefresh(),
    ]).then(onDone).catch(onDone)).catch(onDone)
  }

  renderListComp = (filterSortingAndVisibilityProps) => {
    const {
      csvLink, onRefresh, pageMeta,
      isFetchingViewData, isFetchingActions, groups,
    } = this.props
    const { isFetching } = this.state
    return (
      <ProjectUserAccessRightComponent
        {...filterSortingAndVisibilityProps}
        csvLink={csvLink}
        onRefresh={onRefresh}
        totalElements={get(pageMeta, 'totalElements', 0)}
        isLoading={isFetchingViewData || isFetchingActions || isFetching}
        onEdit={this.onEdit}
        groups={groups}
      />
    )
  }

  render() {
    return (
      <TableFilterSortingAndVisibilityContainer
        pageActions={projectUserActions}
        pageSelectors={projectUserSelectors}
        defaultFiltersState={ProjectUserAccessRightComponent.DEFAULT_FILTERS_STATE}
        onDeleteAccount={this.onDeleteAccount}
      >
        {this.renderListComp}
      </TableFilterSortingAndVisibilityContainer>
    )
  }
}
export default connect(
  ProjectUserAccessRightContainer.mapStateToProps,
  ProjectUserAccessRightContainer.mapDispatchToProps)(ProjectUserAccessRightContainer)
