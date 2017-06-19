import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { AdminShapes } from '@regardsoss/shape'
import AccountActions from '../model/AccountActions'
import AccountSelectors from '../model/AccountSelectors'
import WaitingAccountEntitiesSelectors from '../model/WaitingAccountEntitiesSelectors'
import WaitingAccountEntitiesActions from '../model/WaitingAccountEntitiesActions'
import WaitingAccountSignalActions from '../model/WaitingAccountSignalActions'
import RefuseAccountSignalActions from '../model/RefuseAccountSignalActions'
import AccountListComponent from '../components/AccountListComponent'

/**
 * Show the list of REGARDS account
 */
export class AccountListContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    allAccounts: PropTypes.shape({
      content: PropTypes.objectOf({
        Account: AdminShapes.Account,
      }),
    }),
    waitingAccounts: PropTypes.shape({
      content: PropTypes.objectOf({
        Account: AdminShapes.Account,
      }),
    }),
    isFetchingContent: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchAccountList: PropTypes.func.isRequired,
    fetchWaitingAccountList: PropTypes.func.isRequired,
    sendAcceptUser: PropTypes.func.isRequired,
    sendRefuseUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.props.fetchAccountList()
    this.props.fetchWaitingAccountList()
    this.setState({ initialFecthing: true, isFetchingActions: false })
  }

  componentWillReceiveProps = (nextProps) => {
    // mark initial fetching done (ignore next ones)
    if (this.props.isFetchingContent && !nextProps.isFetchingContent) {
      this.setInitialFetching(false)
    }
  }

  onDelete = (accountId) => {
    this.performAll([this.props.deleteAccount(accountId)])
  }

  onEdit = (accountId) => {
    const url = `/admin/account/${accountId}/edit`
    browserHistory.push(url)
  }

  onAccept = (accountEmail) => {
    this.performAll([this.props.sendAcceptUser(accountEmail)])
  }

  onRefuse = (accountEmail) => {
    this.performAll([this.props.sendRefuseUser(accountEmail)])
  }

  setInitialFetching = initialFecthing => this.updateState({ initialFecthing })

  setFetchingActions = isFetchingActions => this.updateState({ isFetchingActions })

  updateState = newValues => this.setState({ ...this.state, ...newValues })

  /**
  * Marks fetching true, performs all promises as parameter, update waiting users state then marks fetching false
  * @param promises promises
  */
  performAll = (promises) => {
    this.setFetchingActions(true)
    const onDone = () => { this.setFetchingActions(false) }
    Promise.all(promises).then(() =>
      Promise.all(this.props.fetchWaitingAccountList(), this.props.fetchAccountList()).then(onDone).catch(onDone)).catch(onDone)
  }

  render() {
    const { allAccounts, waitingAccounts } = this.props
    const { isFetchingActions, initialFecthing } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-account-management/src/i18n">
        <AccountListComponent
          allAccounts={allAccounts}
          waitingAccounts={waitingAccounts}
          initialFecthing={initialFecthing}
          isFetchingActions={isFetchingActions}
          onEdit={this.onEdit}
          onAccept={this.onAccept}
          onRefuse={this.onRefuse}
          onDelete={this.onDelete}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  allAccounts: AccountSelectors.getList(state) || {},
  waitingAccounts: WaitingAccountEntitiesSelectors.getList(state) || {},
  isFetchingContent: AccountSelectors.isFetching(state) || WaitingAccountEntitiesSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAccountList: () => dispatch(AccountActions.fetchPagedEntityList()),
  fetchWaitingAccountList: () => dispatch(WaitingAccountEntitiesActions.fetchWaitingAccountsEntityList()),
  sendAcceptUser: accountEmail => dispatch(WaitingAccountSignalActions.sendAccept(accountEmail)),
  sendRefuseUser: accountEmail => dispatch(RefuseAccountSignalActions.sendRefuse(accountEmail)),
  deleteAccount: accountId => dispatch(AccountActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountListContainer)
