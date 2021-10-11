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
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { projectUserSignalSelectors } from '../clients/ProjectUserSignalClient'
import { uiSettingsActions, uiSettingsSelectors } from '../clients/UISettingsClient'
import ProjectUserQuotaComponent from '../components/list/ProjectUserQuotaComponent'

/**
 * @author Théo Lasserre
 */
export class ProjectUserQuotaContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    csvLink: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    // from mapStateToProps
    allAccounts: AccessShapes.ProjectUserList.isRequired,
    isFetchingViewData: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    uiSettings: UIShapes.UISettings.isRequired,
    // from mapDispatchToProps
    onDeleteAccount: PropTypes.func.isRequired,
    onUpdateAccount: PropTypes.func.isRequired,
    fetchUISettings: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      allAccounts: projectUserSelectors.getList(state) || {},
      isFetchingViewData: projectUserSelectors.isFetching(state),
      isFetchingActions: projectUserSignalSelectors.isFetching(state)
        || uiSettingsSelectors.isFetching(state),
      uiSettings: uiSettingsSelectors.getSettings(state),
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
      onUpdateAccount: (userId, updatedAccount) => dispatch(projectUserActions.updateEntity(userId, updatedAccount)),
      fetchUISettings: () => dispatch(uiSettingsActions.getSettings()),
    }
  }

  state = { isFetching: false }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    const { fetchUISettings } = this.props
    fetchUISettings()
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

  onSetMaxQuota = (account, maxQuota, onRefresh) => {
    const { onUpdateAccount } = this.props
    const updatedAccount = {
      ...account.content,
      maxQuota,
    }
    this.performAll([onUpdateAccount(account.content.id, updatedAccount)], onRefresh)
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
      csvLink, onRefresh, allAccounts,
      isFetchingViewData, isFetchingActions, uiSettings,
    } = this.props
    const { isFetching } = this.state
    return (
      <ProjectUserQuotaComponent
        {...filterSortingAndVisibilityProps}
        csvLink={csvLink}
        onRefresh={onRefresh}
        allAccounts={allAccounts}
        isLoading={isFetchingViewData || isFetchingActions || isFetching}
        onEdit={this.onEdit}
        uiSettings={uiSettings}
      />
    )
  }

  render() {
    return (
      <TableFilterSortingAndVisibilityContainer
        pageActions={projectUserActions}
        pageSelectors={projectUserSelectors}
        defaultFiltersState={ProjectUserQuotaComponent.DEFAULT_FILTERS_STATE}
        onSetMaxQuota={this.onSetMaxQuota}
        onDeleteAccount={this.onDeleteAccount}
      >
        {this.renderListComp}
      </TableFilterSortingAndVisibilityContainer>
    )
  }
}
export default connect(
  ProjectUserQuotaContainer.mapStateToProps,
  ProjectUserQuotaContainer.mapDispatchToProps)(ProjectUserQuotaContainer)
