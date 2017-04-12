import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { Account } from '@regardsoss/model'
import AccountActions from '../model/AccountActions'
import AccountSelectors from '../model/AccountSelectors'
import WaitingAccountEntitiesSelectors from '../model/WaitingAccountEntitiesSelectors'
import WaitingAccountEntitiesActions from '../model/WaitingAccountEntitiesActions'
import WaitingAccountSignalActions from '../model/WaitingAccountSignalActions'
import AccountListComponent from '../components/AccountListComponent'

/**
 * Show the list of REGARDS account
 */
export class AccountListContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    allAccounts: React.PropTypes.shape({
      content: React.PropTypes.objectOf({ Account }),
    }),
    waitingAccounts: React.PropTypes.shape({
      content: React.PropTypes.objectOf({ Account }),
    }),
    isFetchingContent: React.PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchAccountList: React.PropTypes.func.isRequired,
    fetchWaitingAccountList: React.PropTypes.func.isRequired,
    sendAcceptUser: React.PropTypes.func.isRequired,
    deleteAccount: React.PropTypes.func.isRequired,
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
      <I18nProvider messageDir="modules/admin-account-management/src/i18n">
        <AccountListComponent
          allAccounts={allAccounts}
          waitingAccounts={waitingAccounts}
          initialFecthing={initialFecthing}
          isFetchingActions={isFetchingActions}
          onAccept={this.onAccept}
          onEdit={this.onEdit}
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
  deleteAccount: accountId => dispatch(AccountActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountListContainer)
