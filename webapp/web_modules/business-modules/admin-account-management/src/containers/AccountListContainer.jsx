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
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AdminInstanceDomain } from '@regardsoss/domain'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AdminInstanceShapes, AdminShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import { accountWaitingActions, accountWaitingSelectors } from '../clients/AccountWaitingClient'
import { acceptAccountActions } from '../clients/AcceptAccountClient'
import { enableAccountActions } from '../clients/EnableAccountClient'
import { refuseAccountActions } from '../clients/RefuseAccountClient'
import { originActions, originSelectors } from '../clients/OriginsClient'
import { projectActions, projectSelectors } from '../clients/ProjectsClient'
import AccountListComponent from '../components/AccountListComponent'
import ACCOUNT_FILTERS from '../domain/AccountFilters'
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
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    origins: PropTypes.arrayOf(PropTypes.string),
    projects: AdminShapes.ProjectList.isRequired,
    // from mapDispatchToProps
    fetchAccountList: PropTypes.func.isRequired,
    fetchWaitingAccountList: PropTypes.func.isRequired,
    sendAcceptUser: PropTypes.func.isRequired,
    sendRefuseUser: PropTypes.func.isRequired,
    sendEnableUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    fetchOrigins: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      allAccounts: accountSelectors.getList(state) || {},
      waitingAccounts: accountWaitingSelectors.getList(state) || {},
      isFetching: accountSelectors.isFetching(state) || accountWaitingSelectors.isFetching(state),
      pageMeta: accountSelectors.getMetaData(state),
      origins: originSelectors.getArray(state),
      projects: projectSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchWaitingAccountList: (pageNumber, size) => dispatch(accountWaitingActions.fetchWaitingAccountsEntityList(pageNumber, size)),
      fetchAccountList: (pageNumber, size, pathParam, queryParams) => dispatch(accountActions.fetchPagedEntityList(pageNumber, size, pathParam, queryParams)),
      sendAcceptUser: (accountEmail) => dispatch(acceptAccountActions.sendAccept(accountEmail)),
      sendEnableUser: (accountEmail) => dispatch(enableAccountActions.sendEnable(accountEmail)),
      sendRefuseUser: (accountEmail) => dispatch(refuseAccountActions.sendRefuse(accountEmail)),
      deleteAccount: (accountId) => dispatch(accountActions.deleteEntity(accountId)),
      fetchOrigins: () => dispatch(originActions.fetchEntityList()),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
      fetchProjects: () => dispatch(projectActions.fetchPagedEntityList()),
    }
  }

  state = {
    isFetchingActions: false,
  }

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
    const { fetchWaitingAccountList } = this.props
    const { query } = browserHistory.getCurrentLocation()
    const statusQuery = get(query, ACCOUNT_FILTERS.STATUS)
    // prevent multiple network call
    if (statusQuery && statusQuery === AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING) {
      const fetchPageSize = this.getFetchPageSize()
      fetchWaitingAccountList(0, fetchPageSize).then((actionResult) => {
        if (!actionResult.error) {
          this.setState({ isFetchingActions: false })
        }
      })
    }
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
   * Account deletion confirmed callback: performs delete then updates list
   */
  onDelete = (accountId, onRefresh) => {
    this.perform(this.props.deleteAccount(accountId), onRefresh)
  }

  /**
   * Account acceptation callback: performs accept then updates list
   */
  onAccept = (accountEmail, onRefresh) => {
    this.perform(this.props.sendAcceptUser(accountEmail), onRefresh)
  }

  /**
   * User refusal confirmed callback: performs delete then updates list
   */
  onRefuse = (accountEmail, onRefresh) => {
    this.perform(this.props.sendRefuseUser(accountEmail), onRefresh)
  }

  /**
   * User enabled callback: performs enabled then updates list
   */
  onEnable = (accountEmail, onRefresh) => {
    this.perform(this.props.sendEnableUser(accountEmail), onRefresh)
  }

  /**
   * Set actions fetching state
   * @param {bool} isFetchingActions is fetching actions?
   */
  setFetchingActions = (isFetchingActions) => this.setState({ isFetchingActions })

  /**
   * Marks fetching true, performs promise as parameter, update waiting users state then marks fetching false
   * @param promise
   */
  perform = (promise, onRefresh) => {
    this.setFetchingActions(true)
    const onDone = () => { this.setFetchingActions(false) }
    Promise.resolve(promise).then(() => Promise.all([
      this.props.fetchWaitingAccountList(),
      onRefresh(),
    ]).then(onDone).catch(onDone)).catch(onDone)
  }

  getFetchPageSize = () => {
    const { pageMeta } = this.props
    const lastPage = (pageMeta && pageMeta.number) || 0
    return TableFilterSortingAndVisibilityContainer.PAGE_SIZE * (lastPage + 1)
  }

  onRefresh = (requestParameters) => {
    const { fetchAccountList } = this.props
    const fetchPageSize = this.getFetchPageSize()
    fetchAccountList(0, fetchPageSize, {}, requestParameters)
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
            key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT}
            allAccounts={allAccounts}
            waitingAccounts={waitingAccounts}
            isFetchingActions={isFetchingActions}
            isFetching={isFetching}
            onEdit={this.onEdit}
            onBack={this.onBack}
            onAccept={this.onAccept}
            onRefuse={this.onRefuse}
            onEnable={this.onEnable}
            onDelete={this.onDelete}
            origins={origins}
            projects={projects}
            onRefresh={this.onRefresh}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(AccountListContainer.mapStateToProps, AccountListContainer.mapDispatchToProps)(AccountListContainer)
