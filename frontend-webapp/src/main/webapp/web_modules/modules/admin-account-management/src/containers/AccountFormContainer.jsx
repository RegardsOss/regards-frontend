import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { Account } from '@regardsoss/model'
import AccountActions from '../model/AccountActions'
import AccountFormComponent from '../components/AccountFormComponent'
import AccountSelectors from '../model/AccountSelectors'

export class AccountFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      account_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    account: React.PropTypes.objectOf({ Account }),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchAccount: React.PropTypes.func,
    updateAccount: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchAccount(this.props.params.account_id)
  }
  getBackUrl = () => ('/admin/account/list')

  getFormComponent = () => {
    const { account, isFetching } = this.props
    if (isFetching) {
      return (<FormLoadingComponent />)
    }
    if (account) {
      return (<AccountFormComponent
        onSubmit={this.handleUpdate}
        backUrl={this.getBackUrl()}
        currentAccount={this.props.account}
      />)
    }
    return (<FormEntityNotFoundComponent />)
  }
  handleUpdate = (values) => {
    const updatedAccount = Object.assign({}, this.props.account.content, {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    })
    Promise.resolve(this.props.updateAccount(this.props.account.content.id, updatedAccount))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-account-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  account: ownProps.params.account_id ? AccountSelectors.getById(state, ownProps.params.account_id) : null,
  isFetching: AccountSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  updateAccount: (id, values) => dispatch(AccountActions.updateEntity(id, values)),
  fetchAccount: accountId => dispatch(AccountActions.fetchEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountFormContainer)
