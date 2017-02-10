/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { values } from 'lodash'
import { i18nContextType } from '@regardsoss/i18n'
import ResetPasswordActions from '../model/ResetPasswordActions'
import ResetPasswordSelectors from '../model/ResetPasswordSelectors'
import UnlockAccountActions from '../model/UnlockAccountActions'
import UnlockAccountSelectors from '../model/UnlockAccountSelectors'
import AccountRequestFormComponent, { requestFormIds, mailFieldId } from '../components/AccountRequestFormComponent'

/**
 * Container for account request forms. See below for specific form export
 */
export class AccountRequestFormContainer extends React.Component {

  static propTypes = {
    // Form initial value
    initialMail: React.PropTypes.string,
    // back callback
    onBack: React.PropTypes.func.isRequired,
    // done callback
    onDone: React.PropTypes.func.isRequired,
    // request form ID (used internally)
    requestFormId: React.PropTypes.oneOf(values(requestFormIds)).isRequired,

    // from map state to props
    isFetching: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    errorStatus: React.PropTypes.number,
    // from dispatch to props
    fetchRequestAction: React.PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillReceiveProps = (nextProps) => {
    // Detect is last fetch is DONE and OK
    const { isFetching, onDone } = this.props
    if (isFetching && !nextProps.hasError && !nextProps.isFetching) {
      onDone(this.submittedMail)
    }
  }

  onRequestAction = (formValues) => {
    // store current mail value
    this.submittedMail = formValues[mailFieldId]
    const { fetchRequestAction } = this.props
    fetchRequestAction(this.submittedMail)
  }

  render() {
    const { initialMail, onBack, hasError, errorStatus, requestFormId } = this.props
    // should show error message?
    const errorMessage = hasError ?
      this.context.intl.formatMessage(
        {
          id: `${requestFormId}.send.failed`,
        }, {
          status: errorStatus,
        }) : null
    return (
      <AccountRequestFormComponent
        onRequestAction={this.onRequestAction}
        errorMessage={errorMessage}
        requestFormId={requestFormId}
        onBack={onBack}
        initialMail={initialMail}
      />
    )
  }
}

/**
 * Map state to props for connected form container
 * @param selectors selector
 * @return map state to props
 */
const buildMapStateToProps = selectors => (state) => {
  const error = selectors.getError(state)
  return {
    isFetching: selectors.isFetching(state),
    errorStatus: error.status,
    hasError: error.hasError,
  }
}

/**
 * Map dispatch to props builder: takes fetch method as parameter, which depends on the form action
 * @param fetchMethod form fetch method
 * @return map dispatch to props method
  */
const buildMapDispatchToProps = fetchMethod => dispatch => ({
  fetchRequestAction: mail => dispatch(fetchMethod(mail)),
})

/** Export connected Ask reset password form container */
const AskResetPasswordForm = props => <AccountRequestFormContainer requestFormId={requestFormIds.resetPasswordRequest} {...props} />
export const AskResetPasswordFormContainer = connect(
    buildMapStateToProps(ResetPasswordSelectors),
    buildMapDispatchToProps(ResetPasswordActions.sendAskResetPassword))(AskResetPasswordForm)

/** Export connected ask unlock account form container */
const AskUnlockAccountForm = props => <AccountRequestFormContainer requestFormId={requestFormIds.unlockAccountRequest} {...props} />
export const AskUnlockAccountFormContainer = connect(
    buildMapStateToProps(UnlockAccountSelectors),
    buildMapDispatchToProps(UnlockAccountActions.sendAskUnlockAccount))(AskUnlockAccountForm)

