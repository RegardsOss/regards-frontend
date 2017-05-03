/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { metadataV1 } from '@regardsoss/user-metadata-common'
import AskProjectAccessFormComponent, { mailFieldId, useExistingAccountFieldId } from '../components/AskProjectAccessFormComponent'
import CreateAccountActions from '../model/creation/CreateAccountActions'
import CreateAccountSelectors from '../model/creation/CreateAccountSelectors'
import CreateUserActions from '../model/creation/CreateUserActions'
import CreateUserSelectors from '../model/creation/CreateUserSelectors'

const requestTypes = {
  createUser: 'create.user',
  createAccount: 'create.account',
}

/**
 * Container for project access requests
 */
export class AskProjectAccessFormContainer extends React.Component {

  static propTypes = {
    // Form initial value
    initialMail: React.PropTypes.string,
    // current project (empty if admin)
    project: React.PropTypes.string.isRequired,
    // back callback
    onBack: React.PropTypes.func.isRequired,
    // New account done callback
    onNewAccountDone: React.PropTypes.func.isRequired,
    // new user done callback
    onNewUserDone: React.PropTypes.func.isRequired,
    // from map state to props
    isFetching: React.PropTypes.bool,
    newAccountFetchStatus: React.PropTypes.number,
    newUserFetchStatus: React.PropTypes.number,
    // from dispatch to props
    fetchNewAccount: React.PropTypes.func, // create a new REGARD account
    fetchNewUser: React.PropTypes.func, // create a new project user ('I have already a REGARD account'...)
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillReceiveProps = (nextProps) => {
    // Detect if last fetch is DONE and OK
    const { isFetching, onNewAccountDone, onNewUserDone } = this.props
    if (isFetching && !nextProps.isFetching) {
      // based on request type, check if it was OK
      const { lastRequestType } = this.state
      if (lastRequestType === requestTypes.createAccount && nextProps.newAccountFetchStatus < 300) {
        // create account done without error
        onNewAccountDone(this.submittedMail)
      } else if (lastRequestType === requestTypes.createUser && nextProps.newUserFetchStatus < 300) {
        // create user done without error
        onNewUserDone(this.submittedMail)
      }
    }
  }

  onRequestAction = ({ firstName, lastName, newPassword, ...formValues }) => {
    // store current mail value (for done operation)
    this.submittedMail = formValues[mailFieldId]
    const { fetchNewAccount, fetchNewUser } = this.props

    // extract user metadata (always, used for both)
    const metadata = this.resolveMetadata(formValues)

    // prepare request according with type
    if (formValues[useExistingAccountFieldId]) {
      // keep request type
      this.setState({ lastRequestType: requestTypes.createUser })
      // create a new project user
      fetchNewUser(this.submittedMail, metadata)
    } else {
      // keep request type
      this.setState({ lastRequestType: requestTypes.createAccount })
      // create a new account, plus corresponding user
      fetchNewAccount(this.submittedMail, firstName, lastName, newPassword, metadata)
    }
  }

  /**
   * Resolves metadata as expected by the backend from the form values
   * @param formValues edition form values
   * @return resolved metadata for backend
   */
  resolveMetadata = formValues => metadataV1.map(({ key }) => ({
    key,
    value: formValues[key] || '',
  }))


  render() {
    const { project, initialMail, onBack, newAccountFetchStatus, newUserFetchStatus } = this.props
    const { lastRequestType } = (this.state || {})
    const { intl } = this.context
    // select error to show in current mode
    let errorMessage = null
    const isCreateAccount = lastRequestType === requestTypes.createAccount
    const lastFetchErrorCode = isCreateAccount ? newAccountFetchStatus : newUserFetchStatus
    if (lastFetchErrorCode >= 300) {
      // find corresponding error if anyt
      const baseErrorId = `ask.create.${isCreateAccount ? 'account' : 'user'}.error`
      const specificStatusId = `${baseErrorId}.${lastFetchErrorCode}`
      if (intl.messages[specificStatusId]) {
        // found message for code
        errorMessage = intl.formatMessage({ id: specificStatusId })
      } else {
        // unknown error code
        errorMessage = intl.formatMessage({ id: `${baseErrorId}.unknown` }, { status: lastFetchErrorCode })
      }
    }

    return (
      <AskProjectAccessFormComponent
        project={project}
        initialMail={initialMail}
        errorMessage={errorMessage}
        projectMetadata={metadataV1}
        onRequestAction={this.onRequestAction}
        onBack={onBack}
      />
    )
  }
}

const mapStateToProps = state => ({
  isFetching: CreateAccountSelectors.isFetching(state) || CreateUserSelectors.isFetching(state),
  newAccountFetchStatus: CreateAccountSelectors.getError(state).status,
  newUserFetchStatus: CreateUserSelectors.getError(state).status,
})

const mapDispatchToProps = dispatch => ({
  fetchNewUser: (mail, metadata) => dispatch(CreateUserActions.sendCreateUser(mail, metadata)),
  fetchNewAccount: (mail, firstName, lastName, password, metadata) =>
    dispatch(CreateAccountActions.sendCreateAccount(mail, firstName, lastName, password, metadata)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AskProjectAccessFormContainer)

