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
    requestFormId: React.PropTypes.oneOf(values(requestFormIds)),

    // from map state to props
    isFectching: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    errorStatus: React.PropTypes.string,
    // from dispatch to props
    fetchRequestAction: React.PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillReceiveProps = (nextProps) => {
    console.error('Did I receive props????? ', nextProps)
    // verify submission state: if done without error, invoke onDone() (only when data is fully defined, marking a real state change)
    const { isFectching, onDone } = this.props
    const wasFetching = typeof isFectching === 'boolean' && isFectching
    const isNoLongerFetching = typeof nextProps.isFetching === 'boolean' && !nextProps.isFectching
    if (wasFetching && isNoLongerFetching && !nextProps.hasError) {
      onDone(this.submittedMail)
    } else {
      console.error('Fetch status was: ', wasFetching, ' is not:', isNoLongerFetching, ' error:', nextProps.hasError)
    }
  }

  onRequestAction = (formValues) => {
    // store current mail value
    this.submittedMail = formValues[mailFieldId]
    const { fetchRequestAction } = this.props
    fetchRequestAction(this.submittedMail)
  }

  render() {
    const { errorStatus, requestFormId, ...otherProps } = this.props
    const errorMessage = errorStatus && this.context.intl.formatMessage(
      {
        id: `${requestFormId}.send.failed`,
      }, {
        status: errorStatus,
      })

    return (
      <AccountRequestFormComponent
        onRequestAction={this.onRequestAction}
        error={errorMessage}
        requestFormId={requestFormId}
        {...otherProps}
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
    errorStatus: error && error.status,
    hasError: error && error.hasError,
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

