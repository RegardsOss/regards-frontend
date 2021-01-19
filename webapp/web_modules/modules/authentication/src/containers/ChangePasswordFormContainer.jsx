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
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import ChangePasswordForm from '../components/ChangePasswordFormComponent'
import { sendFinishResetPassword } from '../model/operation/ResetPasswordActions'
import ResetPasswordSelectors from '../model/operation/ResetPasswordSelectors'
import { sendChangePassword } from '../model/operation/ChangePasswordActions'
import ChangePasswordSelectors from '../model/operation/ChangePasswordSelectors'
import { accountPasswordActions, accountPasswordSelectors } from '../clients/AccountPasswordClient'

/**
 * Change password form container
 */
export class ChangePasswordFormContainer extends React.Component {
  static propTypes = {
    // user email
    mail: PropTypes.string.isRequired,
    // token to finish reset password
    token: PropTypes.string,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // done callback
    onDone: PropTypes.func.isRequired,
    // token expired callback
    onTokenExpired: PropTypes.func,
    onCancel: PropTypes.func,
    errorMessage: PropTypes.string,

    // from map state to props
    isFetching: PropTypes.bool,
    changingPassword: PropTypes.bool,
    // used only in next props
    // eslint-disable-next-line
    hasError: PropTypes.bool,
    changePasswordError: PropTypes.bool,
    // from map dispatch to props
    sendChangePassword: PropTypes.func.isRequired,
    fetchRequestAction: PropTypes.func.isRequired,
    fetchPasswordRules: PropTypes.func.isRequired,
    fetchPasswordValidity: PropTypes.func.isRequired,
  }

  static contextTypes = { ...i18nContextType }

  state = {
    newPassword: null,
    errorMessage: null,
  }

  componentDidMount = () => {
    const { fetchPasswordRules } = this.props
    fetchPasswordRules()
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    // Detect last fetch finished
    const {
      isFetching, onDone, onTokenExpired, token, mail, changingPassword,
    } = this.props
    const { newPassword } = this.state
    if (isFetching && !nextProps.isFetching) {
      // redirection: error pane or OK pane?
      if (token && nextProps.hasError) {
        onTokenExpired()
      } else {
        onDone({ username: mail, password: newPassword })
      }
    }

    if (changingPassword && !nextProps.changingPassword) {
      if (!nextProps.changePasswordError) {
        onDone({ username: mail, password: newPassword })
      }
    }
  }

  onSubmit = ({ newPassword, oldPassword }) => {
    const {
      mail, token, fetchRequestAction,
    } = this.props
    this.setState({
      newPassword,
    })
    const { intl } = this.context
    if (oldPassword && !token) {
      const task = this.props.sendChangePassword(mail, oldPassword, newPassword)
      task.then((actionResults) => {
        if (actionResults.error) {
          this.setState({
            errorMessage: intl.formatMessage({ id: 'reset.password.update.error' }),
          })
        }
      })
      return task
    }
    return fetchRequestAction(token, mail, newPassword)
  }

  render() {
    const {
      passwordRules, fetchPasswordValidity, token, onCancel,
    } = this.props
    const { errorMessage } = this.state
    return (
      <ChangePasswordForm
        displayOldPasswordField={!token}
        passwordRules={passwordRules}
        fetchPasswordValidity={fetchPasswordValidity}
        onChangePassword={this.onSubmit}
        onCancel={onCancel}
        errorMessage={errorMessage || this.props.errorMessage}
      />
    )
  }
}

const mapStatesToProps = (state) => {
  const error = ResetPasswordSelectors.getError(state)
  const changePwdError = ChangePasswordSelectors.getError(state)
  return {
    isFetching: ResetPasswordSelectors.isFetching(state),
    hasError: error && error.hasError,
    passwordRules: accountPasswordSelectors.getRules(state),
    changingPassword: ChangePasswordSelectors.isFetching(state),
    changePasswordError: changePwdError && changePwdError.hasError,
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendChangePassword: (mail, oldPassword, newPassword) => dispatch(sendChangePassword(mail, oldPassword, newPassword)),
  fetchRequestAction: (token, mail, newPassword) => dispatch(sendFinishResetPassword(token, mail, newPassword)),
  fetchPasswordValidity: (newPassword) => dispatch(accountPasswordActions.fetchPasswordValidity(newPassword)),
  fetchPasswordRules: () => dispatch(accountPasswordActions.fetchPasswordRules()),
})

export default connect(mapStatesToProps, mapDispatchToProps)(ChangePasswordFormContainer)
