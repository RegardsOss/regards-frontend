/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { getMetadataArray } from '@regardsoss/user-metadata-common'
import AskProjectAccessFormComponent, { mailFieldId, useExistingAccountFieldId } from '../components/AskProjectAccessFormComponent'
import { accountPasswordActions, accountPasswordSelectors } from '../clients/AccountPasswordClient'
import { sendCreateAccount } from '../model/creation/CreateAccountActions'
import CreateAccountSelectors from '../model/creation/CreateAccountSelectors'
import { sendCreateUser } from '../model/creation/CreateUserActions'
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
    initialMail: PropTypes.string,
    // back callback
    onBack: PropTypes.func.isRequired,
    // New account done callback
    onNewAccountDone: PropTypes.func.isRequired,
    // new user done callback
    onNewUserDone: PropTypes.func.isRequired,
    // from map state to props
    isFetching: PropTypes.bool,
    newAccountFetchStatus: PropTypes.number,
    newUserFetchStatus: PropTypes.number,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // from dispatch to props
    fetchNewAccount: PropTypes.func, // create a new REGARD account
    fetchNewUser: PropTypes.func, // create a new project user ('I have already a REGARD account'...)
    fetchPasswordRules: PropTypes.func.isRequired,
    fetchPasswordValidity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Resolves metadata as expected by the backend from the form values
   * @param formValues edition form values
   * @return resolved metadata for backend
   */
  static resolveMetadata(formValues) {
    return getMetadataArray().map(({ key }) => ({
      key,
      value: formValues[key] || '',
    }))
  }

  componentDidMount() {
    const { fetchPasswordRules } = this.props
    fetchPasswordRules()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  onRequestAction = ({
    firstName, lastName, newPassword, ...formValues
  }) => {
    // store current mail value (for done operation)
    this.submittedMail = formValues[mailFieldId]
    const { fetchNewAccount, fetchNewUser } = this.props

    // extract user metadata (always, used for both)
    const metadata = AskProjectAccessFormContainer.resolveMetadata(formValues)

    // prepare request according with type
    if (formValues[useExistingAccountFieldId]) {
      // keep request type
      this.setState({ lastRequestType: requestTypes.createUser })
      // create a new project user
      return fetchNewUser(this.submittedMail, metadata)
    }
    // keep request type
    this.setState({ lastRequestType: requestTypes.createAccount })
    // create a new account, plus corresponding user
    return fetchNewAccount(this.submittedMail, firstName, lastName, newPassword, metadata)
  }

  render() {
    const {
      initialMail, onBack, newAccountFetchStatus, newUserFetchStatus, passwordRules, fetchPasswordValidity,
    } = this.props
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
        passwordRules={passwordRules}
        initialMail={initialMail}
        errorMessage={errorMessage}
        projectMetadata={getMetadataArray()}
        fetchPasswordValidity={fetchPasswordValidity}
        onRequestAction={this.onRequestAction}
        onBack={onBack}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: CreateAccountSelectors.isFetching(state) || CreateUserSelectors.isFetching(state),
  newAccountFetchStatus: CreateAccountSelectors.getError(state).status,
  newUserFetchStatus: CreateUserSelectors.getError(state).status,
  passwordRules: accountPasswordSelectors.getRules(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchNewUser: (mail, metadata) => dispatch(sendCreateUser(mail, metadata)),
  fetchNewAccount: (mail, firstName, lastName, password, metadata) => dispatch(sendCreateAccount(mail, firstName, lastName, password, metadata)),
  fetchPasswordValidity: (newPassword) => dispatch(accountPasswordActions.fetchPasswordValidity(newPassword)),
  fetchPasswordRules: () => dispatch(accountPasswordActions.fetchPasswordRules()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AskProjectAccessFormContainer)
