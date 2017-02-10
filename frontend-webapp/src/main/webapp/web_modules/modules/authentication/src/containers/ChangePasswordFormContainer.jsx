/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import ChangePasswordForm from '../components/ChangePasswordFormComponent'
import ResetPasswordActions from '../model/ResetPasswordActions'
import ResetPasswordSelectors from '../model/ResetPasswordSelectors'

/**
 * Change password form container
 */
export class ChangePasswordFormContainer extends React.Component {

  static propTypes = {
    // user email
    mail: React.PropTypes.string.isRequired,
    // token to finish reset password
    token: React.PropTypes.string.isRequired,
    // done callback
    onDone: React.PropTypes.func.isRequired,
    // token expired callback
    onTokenExpired: React.PropTypes.func.isRequired,

    // from map state to props
    isFetching: React.PropTypes.bool,
    // used only in next props
    // eslint-disable-next-line
    hasError: React.PropTypes.bool,
    // from map dispatch to props
    fetchRequestAction: React.PropTypes.func,
  }

  static contextTypes= { ...i18nContextType }

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
    fetchRequestAction(token, mail, { newPassword })
  }

  render() {
    return (
      <ChangePasswordForm onChangePassword={this.onSubmit} />
    )
  }
}

const mapStatesToProps = (state) => {
  const error = ResetPasswordSelectors.getError(state)
  return {
    isFetching: ResetPasswordSelectors.isFetching(state),
    hasError: error && error.hasError,
  }
}


const mapDispatchToProps = dispatch => ({
  fetchRequestAction: (token, mail, newPassword) => dispatch(ResetPasswordActions.sendFinishResetPassword(token, mail, newPassword)),
})

export default connect(mapStatesToProps, mapDispatchToProps)(ChangePasswordFormContainer)
