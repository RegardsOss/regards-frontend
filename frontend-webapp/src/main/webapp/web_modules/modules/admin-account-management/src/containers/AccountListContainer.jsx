import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import AccountActions from '../model/AccountActions'
import AccountSelectors from '../model/AccountSelectors'
import AccountListComponent from '../components/AccountListComponent'

/**
 * Show the list of REGARDS account
 */
export class AccountListContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    accountList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          lastName: React.PropTypes.string,
          email: React.PropTypes.string,
          firstName: React.PropTypes.string,
          status: React.PropTypes.string,
        }),
      }),
    ),
    // from mapDispatchToProps
    fetchAccountList: React.PropTypes.func,
    deleteAccount: React.PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchAccountList()
  }

  getCreateUrl = () => ('/admin/account/create')

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
          createUrl={this.getCreateUrl()}
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
  fetchAccountList: () => dispatch(AccountActions.fetchEntityList()),
  deleteAccount: accountId => dispatch(AccountActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountListContainer)
