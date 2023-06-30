/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import {
  AdminShapes, CommonShapes, UIShapes, DataManagementShapes,
} from '@regardsoss/shape'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { projectUserSignalActions, projectUserSignalSelectors } from '../clients/ProjectUserSignalClient'
import { projectUserEmailConfirmationSignalActions } from '../clients/ProjectUserEmailConfirmationClient'
import { uiSettingsActions, uiSettingsSelectors } from '../clients/UISettingsClient'
import { originActions, originSelectors } from '../clients/OriginsClient'
import { csvActions } from '../clients/DownloadCSVClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import ProjectUserListComponent from '../components/list/ProjectUserListComponent'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { projectUserFCUDActions } from '../clients/ProjectUserFCUDClient'

import messages from '../i18n'
import styles from '../styles'

/**
 * @author Théo Lasserre
 */
export class ProjectUserListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      visualisationMode: PropTypes.string,
    }),
    // from mapStateToProps
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    groups: DataManagementShapes.AccessGroupList.isRequired,
    origins: CommonShapes.ServiceProviderList.isRequired,
    isFetchingViewData: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    roleList: AdminShapes.RoleList.isRequired,
    uiSettings: UIShapes.UISettings.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape.isRequired, // used only in onPropertiesUpdated
    // from mapDispatchToProps
    onDownloadCSV: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    onDeleteAccount: PropTypes.func.isRequired,
    onValidateProjectUser: PropTypes.func.isRequired,
    onDenyProjectUser: PropTypes.func.isRequired,
    onSendEmailConfirmation: PropTypes.func.isRequired,
    onDisableProjectUser: PropTypes.func.isRequired,
    onEnableProjectUser: PropTypes.func.isRequired,
    fetchOrigins: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
    fetchRoleList: PropTypes.func.isRequired,
    onUpdateAccount: PropTypes.func.isRequired,
    fetchUISettings: PropTypes.func.isRequired,
    fetchGroups: PropTypes.func.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20;

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      pageMeta: projectUserSelectors.getMetaData(state),
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
      origins: originSelectors.getList(state),
      isFetchingViewData: projectUserSelectors.isFetching(state),
      isFetchingActions: projectUserSignalSelectors.isFetching(state),
      roleList: roleSelectors.getList(state),
      uiSettings: uiSettingsSelectors.getSettings(state),
      groups: accessGroupSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { authentication }) {
    return {
      fetchUsers: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(projectUserActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
      onDeleteAccount: (userId) => dispatch(projectUserFCUDActions.deleteEntity(userId)),
      onValidateProjectUser: (userId) => dispatch(projectUserSignalActions.sendAccept(userId)),
      onDenyProjectUser: (userId) => dispatch(projectUserSignalActions.sendDeny(userId)),
      onSendEmailConfirmation: (email, project) => dispatch(projectUserEmailConfirmationSignalActions.sendEmailConfirmation(email, project)),
      onDisableProjectUser: (userId) => dispatch(projectUserSignalActions.sendInactive(userId)),
      onEnableProjectUser: (userId) => dispatch(projectUserSignalActions.sendActive(userId)),
      fetchOrigins: () => dispatch(originActions.fetchPagedEntityList()),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
      fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
      onUpdateAccount: (userId, updatedAccount) => dispatch(projectUserFCUDActions.updateEntity(userId, updatedAccount)),
      fetchUISettings: () => dispatch(uiSettingsActions.getSettings()),
      fetchGroups: () => dispatch(accessGroupActions.fetchPagedEntityList()),
      onDownloadCSV: (requestParameters) => dispatch(csvActions.downloadCSV(get(authentication, 'result.access_token'), requestParameters)),
    }
  }

  state = {
    isFetching: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    const {
      throwError, fetchOrigins, fetchRoleList, fetchUISettings,
      fetchGroups,
    } = this.props
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
    Promise.resolve(fetchUISettings()).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to retrieve ui settings')
      }
    })
    Promise.resolve(fetchGroups()).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to retrieve groups')
      }
    })
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount = () => {
    this.setState({ isFetching: false })
  }

  onRefresh = (requestParameters) => {
    const {
      pageMeta, fetchUsers,
    } = this.props
    const lastPage = (pageMeta && pageMeta.number) || 0
    const fetchPageSize = ProjectUserListContainer.PAGE_SIZE * (lastPage + 1)
    fetchUsers(0, fetchPageSize, {}, { ...pick(requestParameters, 'sort') }, { ...omit(requestParameters, 'sort') })
  }

  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/board`)
  }

  onCreate = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/project-user/create`)
  }

  /**
   * User callback: edit project user
   * @param userId user id
   */
  onEdit = (userId) => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/project-user/${userId}/edit`)
  }

  onDownloadCSV = (requestParameters = {}) => {
    const { onDownloadCSV } = this.props
    return onDownloadCSV(requestParameters)
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
    const { onSendEmailConfirmation, params: { project } } = this.props
    this.perform(onSendEmailConfirmation(accountId, project), onRefresh)
  }

  onSetMaxQuota = (account, maxQuota, onRefresh) => {
    const { onUpdateAccount } = this.props
    const updatedAccount = {
      ...account.content,
      maxQuota,
    }
    this.perform([onUpdateAccount(account.content.id, updatedAccount)], onRefresh)
  }

  /**
   * Marks fetching true, performs promise as parameter, update waiting users state then marks fetching false
   * @param promise
   */
  perform = (promises, onRefresh) => {
    this.setFetching(true)
    const onDone = () => { this.setFetching(false) }
    Promise.resolve(promises).then(() => Promise.resolve(
      onRefresh(),
    ).then(onDone).catch(onDone)).catch(onDone)
  }

  /**
   * Set actions fetching state
   * @param {bool} isFetchingActions is fetching actions?
   */
  setFetching = (isFetching) => this.setState({ isFetching })

  render() {
    const {
      params: { project, visualisationMode }, origins,
      isFetchingViewData, isFetchingActions, uiSettings,
      roleList, groups,
    } = this.props
    const { isFetching } = this.state
    return (
      <I18nProvider messages={messages} stackCallingContext>
        <ModuleStyleProvider module={styles}>
          <ProjectUserListComponent
            project={project}
            onRefresh={this.onRefresh}
            onCreate={this.onCreate}
            onBack={this.onBack}
            visualisationMode={visualisationMode}
            onDeleteAccount={this.onDeleteAccount}
            onDownloadCSV={this.onDownloadCSV}
            onEnable={this.onEnableProjectUser}
            onValidate={this.onValidateProjectUser}
            onDeny={this.onDenyProjectUser}
            onDisable={this.onDisableProjectUser}
            onSendEmailConfirmation={this.onSendEmailConfirmation}
            onSetMaxQuota={this.onSetMaxQuota}
            uiSettings={uiSettings}
            origins={origins}
            isLoading={isFetchingViewData || isFetchingActions || isFetching}
            onEdit={this.onEdit}
            roleList={roleList}
            groups={groups}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  ProjectUserListContainer.mapStateToProps,
  ProjectUserListContainer.mapDispatchToProps)(ProjectUserListContainer)
