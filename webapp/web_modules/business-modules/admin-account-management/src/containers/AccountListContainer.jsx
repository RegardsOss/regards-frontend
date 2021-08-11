/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { browserHistory } from 'react-router'
import { AdminInstanceShapes, CommonShapes, AdminShapes } from '@regardsoss/shape'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import { accountWaitingActions, accountWaitingSelectors } from '../clients/AccountWaitingClient'
import { acceptAccountActions } from '../clients/AcceptAccountClient'
import { enableAccountActions } from '../clients/EnableAccountClient'
import { refuseAccountActions } from '../clients/RefuseAccountClient'
import { accountTableActions } from '../clients/AccountTableClient'
import { originActions, originSelectors } from '../clients/OriginsClient'
import { projectActions, projectSelectors } from '../clients/ProjectsClient'
import AccountListComponent from '../components/AccountListComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * Show the list of REGARDS account
 */
export class AccountListContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    allAccounts: PropTypes.shape({
      content: PropTypes.objectOf({
        Account: AdminInstanceShapes.Account,
      }),
    }),
    waitingAccounts: PropTypes.shape({
      content: PropTypes.objectOf({
        Account: AdminInstanceShapes.Account,
      }),
    }),
    isFetching: PropTypes.bool.isRequired,
    pageMeta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    origins: CommonShapes.ServiceProviderList.isRequired,
    projects: AdminShapes.ProjectList.isRequired,
    // from mapDispatchToProps
    fetchAccountList: PropTypes.func.isRequired,
    fetchWaitingAccountList: PropTypes.func.isRequired,
    sendAcceptUser: PropTypes.func.isRequired,
    sendRefuseUser: PropTypes.func.isRequired,
    sendEnableUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    fetchOrigins: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  state = { isFetchingActions: false }

  UNSAFE_componentWillMount() {
    const { throwError, fetchOrigins, fetchProjects } = this.props
    Promise.resolve(fetchOrigins()).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to retrieve account\'s origins list')
      }
    })
    Promise.resolve(fetchProjects()).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to retrieve projects list')
      }
    })
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount = () => {
    this.setState({ isFetchingActions: false })
  }

  /**
   * Account deletion confirmed callback: performs delete then updates list
   */
  onDelete = (accountId) => {
    this.performAll([this.props.deleteAccount(accountId)])
  }

  /**
   * Account edition callback: shows edit form
   */
  onEdit = (accountId) => {
    const url = `/admin/accounts/management/${accountId}/edit`
    browserHistory.push(url)
  }

  /**
   * On back callback
   */
  onBack = () => {
    browserHistory.push('/admin/accounts/board')
  }

  /**
   * Account acceptation callback: performs accept then updates list
   */
  onAccept = (accountEmail) => {
    this.performAll([this.props.sendAcceptUser(accountEmail)])
  }

  /**
   * User refusal confirmed callback: performs delete then updates list
   */
  onRefuse = (accountEmail) => {
    this.performAll([this.props.sendRefuseUser(accountEmail)])
  }

  /**
   * User enabled callback: performs enabled then updates list
   */
  onEnable = (accountEmail) => {
    this.performAll([this.props.sendEnableUser(accountEmail)])
  }

  /**
   * Set actions fetching state
   * @param {bool} isFetchingActions is fetching actions?
   */
  setFetchingActions = (isFetchingActions) => this.setState({ isFetchingActions })

  /**
   * Marks fetching true, performs all promises as parameter, update waiting users state then marks fetching false
   * @param promises promises
   */
  performAll = (promises) => {
    this.setFetchingActions(true)
    const onDone = () => { this.setFetchingActions(false) }
    Promise.all(promises).then(() => Promise.all([
      this.props.fetchWaitingAccountList(),
      this.props.fetchAccountList(),
    ]).then(onDone).catch(onDone)).catch(onDone)
  }

  onRefresh = (contextRequestURLParameters) => {
    const {
      pageMeta, clearSelection, fetchAccountList,
    } = this.props
    const lastPage = (pageMeta && pageMeta.number) || 0
    const fetchPageSize = AccountListContainer.PAGE_SIZE * (lastPage + 1)
    clearSelection()
    fetchAccountList(0, fetchPageSize, {}, { ...contextRequestURLParameters })
  }

  render() {
    const {
      allAccounts, waitingAccounts, isFetching, origins, projects,
    } = this.props
    const { isFetchingActions } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <AccountListComponent
            allAccounts={allAccounts}
            waitingAccounts={waitingAccounts}
            isFetchingActions={isFetchingActions}
            isFetching={isFetching}
            pageSize={AccountListContainer.PAGE_SIZE}
            origins={origins}
            projects={projects}
            onRefresh={this.onRefresh}
            onEdit={this.onEdit}
            onAccept={this.onAccept}
            onRefuse={this.onRefuse}
            onEnable={this.onEnable}
            onDelete={this.onDelete}
            onBack={this.onBack}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  allAccounts: accountSelectors.getList(state) || {},
  waitingAccounts: accountWaitingSelectors.getList(state) || {},
  isFetching: accountSelectors.isFetching(state) || accountWaitingSelectors.isFetching(state),
  pageMeta: accountSelectors.getMetaData(state),
  origins: originSelectors.getList(state),
  projects: projectSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccountList: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(accountActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
  fetchWaitingAccountList: () => dispatch(accountWaitingActions.fetchWaitingAccountsEntityList()),
  sendAcceptUser: (accountEmail) => dispatch(acceptAccountActions.sendAccept(accountEmail)),
  sendEnableUser: (accountEmail) => dispatch(enableAccountActions.sendEnable(accountEmail)),
  sendRefuseUser: (accountEmail) => dispatch(refuseAccountActions.sendRefuse(accountEmail)),
  deleteAccount: (accountId) => dispatch(accountActions.deleteEntity(accountId)),
  clearSelection: () => dispatch(accountTableActions.unselectAll()),
  fetchOrigins: () => dispatch(originActions.fetchPagedEntityList()),
  throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
  fetchProjects: () => dispatch(projectActions.fetchPagedEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountListContainer)
