/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ResetPasswordActions from '../model/operation/ResetPasswordActions'
import ResetPasswordSelectors from '../model/operation/ResetPasswordSelectors'
import { accountPasswordActions, accountPasswordSelectors } from '../clients/AccountPasswordClient'


/**
 * Change password form container
 */
export class ChangePasswordFormContainer extends React.Component {

  static propTypes = {
    // user email
    mail: PropTypes.string.isRequired,
    // token to finish reset password
    token: PropTypes.string.isRequired,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // done callback
    onDone: PropTypes.func.isRequired,
    // token expired callback
    onTokenExpired: PropTypes.func.isRequired,

    // from map state to props
    isFetching: PropTypes.bool,
    // used only in next props
    // eslint-disable-next-line
    hasError: PropTypes.bool,
    // from map dispatch to props
    fetchRequestAction: PropTypes.func,
    fetchPasswordRules: PropTypes.func.isRequired,
    fetchPasswordValidity: PropTypes.func.isRequired,
  }

  static contextTypes = { ...i18nContextType }

  componentDidMount = () => {
    const { fetchPasswordRules } = this.props
    fetchPasswordRules()
  }

  componentWillReceiveProps = (nextProps) => {
    // Detect last fetch finished
    const { isFetching, onDone, onTokenExpired } = this.props
    if (isFetching && !nextProps.isFetching) {
      // redirection: error pane or OK pane?
      if (nextProps.hasError) {
        onTokenExpired()
      } else {
        onDone()
      }
    }
  }

  onSubmit = ({ newPassword }) => {
    const { mail, token, fetchRequestAction } = this.props
    return fetchRequestAction(token, mail, newPassword)
  }

  render() {
    const { passwordRules, fetchPasswordValidity } = this.props
    return (
      <ChangePasswordForm
        passwordRules={passwordRules}
        fetchPasswordValidity={fetchPasswordValidity}
        onChangePassword={this.onSubmit}
      />
    )
  }
}

const mapStatesToProps = (state) => {
  const error = ResetPasswordSelectors.getError(state)
  return {
    isFetching: ResetPasswordSelectors.isFetching(state),
    hasError: error && error.hasError,
    passwordRules: accountPasswordSelectors.getRules(state),
  }
}


const mapDispatchToProps = dispatch => ({
  fetchRequestAction: (token, mail, newPassword) => dispatch(ResetPasswordActions.sendFinishResetPassword(token, mail, newPassword)),
  fetchPasswordValidity: newPassword => dispatch(accountPasswordActions.fetchPasswordValidity(newPassword)),
  fetchPasswordRules: () => dispatch(accountPasswordActions.fetchPasswordRules()),
})

export default connect(mapStatesToProps, mapDispatchToProps)(ChangePasswordFormContainer)
