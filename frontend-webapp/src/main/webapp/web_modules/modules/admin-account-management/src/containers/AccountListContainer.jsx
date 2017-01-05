import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { Account } from '@regardsoss/model'
import AccountActions from '../model/AccountActions'
import AccountSelectors from '../model/AccountSelectors'
import AccountListComponent from '../components/AccountListComponent'

/**
 * Show the list of REGARDS account
 */
export class AccountListContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    account: React.PropTypes.shape({
      content: React.PropTypes.objectOf({ Account }),
    }),
    // from mapDispatchToProps
    fetchAccountList: React.PropTypes.func,
    deleteAccount: React.PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchAccountList()
  }


  handleEdit = (accountId) => {
    const url = `/admin/account/${accountId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (accountId) => {
    this.props.deleteAccount(accountId)
  }

  render() {
    const { accountList } = this.props

    return (
      <I18nProvider messageDir="modules/admin-account-management/src/i18n">
        <AccountListComponent
          accountList={accountList}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  accountList: AccountSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAccountList: () => dispatch(AccountActions.fetchPagedEntityList(dispatch, 0, 100)),
  deleteAccount: accountId => dispatch(AccountActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountListContainer)
