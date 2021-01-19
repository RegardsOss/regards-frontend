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
import { browserHistory } from 'react-router'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import { accountWaitingActions, accountWaitingSelectors } from '../clients/AccountWaitingClient'
import { acceptAccountActions } from '../clients/AcceptAccountClient'
import { enableAccountActions } from '../clients/EnableAccountClient'
import { refuseAccountActions } from '../clients/RefuseAccountClient'
import AccountListComponent from '../components/AccountListComponent'
import messages from '../i18n'

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
    isFetchingContent: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchAccountList: PropTypes.func.isRequired,
    fetchWaitingAccountList: PropTypes.func.isRequired,
    sendAcceptUser: PropTypes.func.isRequired,
    sendRefuseUser: PropTypes.func.isRequired,
    sendEnableUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
  }

  state = { initialFecthing: true, isFetchingActions: false }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount = () => {
    this.setState({ initialFecthing: true, isFetchingActions: false })
    this.props.fetchAccountList()
    this.props.fetchWaitingAccountList()
  }

  /**
   * Lifecycle method component will receive props, used here to detect initial fetching finished
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    // mark initial fetching done (ignore next ones)
    if (this.props.isFetchingContent && !nextProps.isFetchingContent) {
      this.setInitialFetching(false)
    }
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
   * Sets initial fetching state
   * @param {bool} initialFetching is initially fetching?
   */
  setInitialFetching = (initialFecthing) => this.setState({ initialFecthing })

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

  render() {
    const { allAccounts, waitingAccounts } = this.props
    const { isFetchingActions, initialFecthing } = this.state
    return (
      <I18nProvider messages={messages}>
        <AccountListComponent
          allAccounts={allAccounts}
          waitingAccounts={waitingAccounts}
          initialFecthing={initialFecthing}
          isFetchingActions={isFetchingActions}
          onEdit={this.onEdit}
          onAccept={this.onAccept}
          onRefuse={this.onRefuse}
          onEnable={this.onEnable}
          onDelete={this.onDelete}
          onBack={this.onBack}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  allAccounts: accountSelectors.getList(state) || {},
  waitingAccounts: accountWaitingSelectors.getList(state) || {},
  isFetchingContent: accountSelectors.isFetching(state) || accountWaitingSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccountList: () => dispatch(accountActions.fetchPagedEntityList()),
  fetchWaitingAccountList: () => dispatch(accountWaitingActions.fetchWaitingAccountsEntityList()),
  sendAcceptUser: (accountEmail) => dispatch(acceptAccountActions.sendAccept(accountEmail)),
  sendEnableUser: (accountEmail) => dispatch(enableAccountActions.sendEnable(accountEmail)),
  sendRefuseUser: (accountEmail) => dispatch(refuseAccountActions.sendRefuse(accountEmail)),
  deleteAccount: (accountId) => dispatch(accountActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountListContainer)
