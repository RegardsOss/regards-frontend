import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import AccountActions from '../model/AccountActions'
import AccountFormComponent from '../components/AccountFormComponent'
import AccountSelectors from '../model/AccountSelectors'

export class ProjectFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      account_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    account: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        lastName: React.PropTypes.string,
        email: React.PropTypes.string,
        firstName: React.PropTypes.string,
        status: React.PropTypes.string,
      }),
    }),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createAccount: React.PropTypes.func,
    fetchAccount: React.PropTypes.func,
    updateAccount: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.account_id !== undefined,
    }
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchAccount(this.props.params.account_id)
    }
  }
  getBackUrl = () => ('/admin/account/list')

  getFormComponent = () => {
    if (this.state.isEditing) {
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
    return (<AccountFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }
  handleUpdate = (values) => {
    const updatedAccount = Object.assign({}, this.props.account.content, {
      description: values.description,
      icon: values.icon,
      isPublic: values.isPublic,
    })
    Promise.resolve(this.props.updateAccount(this.props.account.content.id, updatedAccount))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createAccount({
      name: values.name,
      description: values.description,
      icon: values.icon,
      isPublic: values.isPublic,
    }))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
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
  createAccount: values => dispatch(AccountActions.createEntity(values)),
  updateAccount: (id, values) => dispatch(AccountActions.updateEntity(id, values)),
  fetchAccount: accountId => dispatch(AccountActions.fetchEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormContainer)
