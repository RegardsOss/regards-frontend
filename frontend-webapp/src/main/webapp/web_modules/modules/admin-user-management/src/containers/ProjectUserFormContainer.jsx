import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import ProjectUserActions from '../model/ProjectUserActions'
import ProjectUserFormComponent from '../components/ProjectUserFormComponent'
import ProjectUserSelectors from '../model/ProjectUserSelectors'

export class ProjectUserFormContainer extends React.Component {
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
        return (<ProjectUserFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentAccount={this.props.account}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<ProjectUserFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }
  handleUpdate = (values) => {
    const updatedAccount = Object.assign({}, this.props.account.content, {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    })
    Promise.resolve(this.props.updateAccount(this.props.account.content.id, updatedAccount))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createAccount({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    }))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }
  render() {
    return (
      <I18nProvider messageDir="modules/admin-user-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  account: ownProps.params.account_id ? ProjectUserSelectors.getById(state, ownProps.params.account_id) : null,
  isFetching: ProjectUserSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createAccount: values => dispatch(ProjectUserActions.createEntity(values)),
  updateAccount: (id, values) => dispatch(ProjectUserActions.updateEntity(id, values)),
  fetchAccount: accountId => dispatch(ProjectUserActions.fetchEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserFormContainer)
