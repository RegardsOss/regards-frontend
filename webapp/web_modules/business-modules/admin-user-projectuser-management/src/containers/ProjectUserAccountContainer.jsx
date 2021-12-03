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
import { AdminShapes, CommonShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { projectUserSignalActions, projectUserSignalSelectors } from '../clients/ProjectUserSignalClient'
import { projectUserEmailConfirmationSignalActions } from '../clients/ProjectUserEmailConfirmationClient'
import { originActions, originSelectors } from '../clients/OriginsClient'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import ProjectUserAccountComponent from '../components/list/ProjectUserAccountComponent'

/**
 * @author Théo Lasserre
 */
export class ProjectUserAccountContainer extends React.Component {
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
    origins: CommonShapes.ServiceProviderList.isRequired,
    isFetchingViewData: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    roleList: AdminShapes.RoleList.isRequired,
    // from mapDispatchToProps
    onDeleteAccount: PropTypes.func.isRequired,
    onValidateProjectUser: PropTypes.func.isRequired,
    onDenyProjectUser: PropTypes.func.isRequired,
    onSendEmailConfirmation: PropTypes.func.isRequired,
    onDisableProjectUser: PropTypes.func.isRequired,
    onEnableProjectUser: PropTypes.func.isRequired,
    fetchOrigins: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
    fetchRoleList: PropTypes.func.isRequired,
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
      origins: originSelectors.getList(state),
      isFetchingViewData: projectUserSelectors.isFetching(state),
      isFetchingActions: projectUserSignalSelectors.isFetching(state),
      roleList: roleSelectors.getList(state),
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
      onValidateProjectUser: (userId) => dispatch(projectUserSignalActions.sendAccept(userId)),
      onDenyProjectUser: (userId) => dispatch(projectUserSignalActions.sendDeny(userId)),
      onSendEmailConfirmation: (email) => dispatch(projectUserEmailConfirmationSignalActions.sendEmailConfirmation(email)),
      onDisableProjectUser: (userId) => dispatch(projectUserSignalActions.sendInactive(userId)),
      onEnableProjectUser: (userId) => dispatch(projectUserSignalActions.sendActive(userId)),
      fetchOrigins: () => dispatch(originActions.fetchPagedEntityList()),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
      fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
    }
  }

  state = { isFetching: false }

  UNSAFE_componentWillMount() {
    const { throwError, fetchOrigins, fetchRoleList } = this.props
    Promise.resolve(fetchOrigins()).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to retrieve account\'s origins list')
      }
    })
    Promise.resolve(fetchRoleList()).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to retrieve role list')
      }
    })
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
    this.perform(onDeleteAccount(accountId), onRefresh)
  }

  onEnableProjectUser = (accountId, onRefresh) => {
    const { onEnableProjectUser } = this.props
    this.perform(onEnableProjectUser(accountId), onRefresh)
  }

  onValidateProjectUser = (accountId, onRefresh) => {
    const { onValidateProjectUser } = this.props
    this.perform(onValidateProjectUser(accountId), onRefresh)
  }

  onDenyProjectUser = (accountId, onRefresh) => {
    const { onDenyProjectUser } = this.props
    this.perform(onDenyProjectUser(accountId), onRefresh)
  }

  onDisableProjectUser = (accountId, onRefresh) => {
    const { onDisableProjectUser } = this.props
    this.perform(onDisableProjectUser(accountId), onRefresh)
  }

  onSendEmailConfirmation = (accountId, onRefresh) => {
    const { onSendEmailConfirmation } = this.props
    this.perform(onSendEmailConfirmation(accountId), onRefresh)
  }

  /**
   * Set actions fetching state
   * @param {bool} isFetchingActions is fetching actions?
   */
  setFetching = (isFetching) => this.setState({ isFetching })

  /**
   * Marks fetching true, performs promise as parameter, update waiting users state then marks fetching false
   * @param promise
   */
  perform = (promise, onRefresh) => {
    this.setFetching(true)
    const onDone = () => { this.setFetching(false) }
    Promise.resolve(promise).then(() => Promise.resolve(
      onRefresh(),
    ).then(onDone).catch(onDone)).catch(onDone)
  }

  renderListComp = (filterSortingAndVisibilityProps) => {
    const {
      csvLink, onRefresh, pageMeta, origins,
      isFetchingViewData, isFetchingActions,
      roleList,
    } = this.props
    const { isFetching } = this.state
    return (
      <ProjectUserAccountComponent
        {...filterSortingAndVisibilityProps}
        csvLink={csvLink}
        onRefresh={onRefresh}
        totalElements={get(pageMeta, 'totalElements', 0)}
        origins={origins}
        isLoading={isFetchingViewData || isFetchingActions || isFetching}
        onEdit={this.onEdit}
        roleList={roleList}
      />
    )
  }

  render() {
    return (
      <TableFilterSortingAndVisibilityContainer
        pageActions={projectUserActions}
        pageSelectors={projectUserSelectors}
        defaultFiltersState={ProjectUserAccountComponent.DEFAULT_FILTERS_STATE}
        onDeleteAccount={this.onDeleteAccount}
        onEnable={this.onEnableProjectUser}
        onValidate={this.onValidateProjectUser}
        onDeny={this.onDenyProjectUser}
        onDisable={this.onDisableProjectUser}
        onSendEmailConfirmation={this.onSendEmailConfirmation}
      >
        {this.renderListComp}
      </TableFilterSortingAndVisibilityContainer>
    )
  }
}
export default connect(
  ProjectUserAccountContainer.mapStateToProps,
  ProjectUserAccountContainer.mapDispatchToProps)(ProjectUserAccountContainer)
