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
import values from 'lodash/values'
import { i18nContextType } from '@regardsoss/i18n'
import { sendAskResetPassword } from '../model/operation/ResetPasswordActions'
import ResetPasswordSelectors from '../model/operation/ResetPasswordSelectors'
import { sendAskUnlockAccount } from '../model/operation/UnlockAccountActions'
import UnlockAccountSelectors from '../model/operation/UnlockAccountSelectors'
import AccountRequestFormComponent, { requestFormIds, mailFieldId } from '../components/AccountRequestFormComponent'

/**
 * Container for account request forms. See below for specific form export
 */
export class AccountRequestFormContainer extends React.Component {
  static propTypes = {
    // Form initial value
    initialMail: PropTypes.string,
    // back callback
    onBack: PropTypes.func.isRequired,
    // done callback
    onDone: PropTypes.func.isRequired,
    // request form ID (used internally)
    requestFormId: PropTypes.oneOf(values(requestFormIds)).isRequired,

    // from map state to props
    isFetching: PropTypes.bool,
    hasError: PropTypes.bool,
    errorStatus: PropTypes.number,
    // from dispatch to props
    fetchRequestAction: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Detect if last fetch is DONE and OK
    const { isFetching, onDone } = this.props
    if (isFetching && !nextProps.hasError && !nextProps.isFetching) {
      onDone(this.submittedMail)
    }
  }

  onRequestAction = (formValues) => {
    // store current mail value
    this.submittedMail = formValues[mailFieldId]
    const { fetchRequestAction } = this.props
    return fetchRequestAction(this.submittedMail)
  }

  render() {
    const {
      initialMail, onBack, hasError, errorStatus, requestFormId,
    } = this.props
    // should show error message?
    const errorMessage = hasError
      ? this.context.intl.formatMessage({
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
const buildMapStateToProps = (selectors) => (state) => {
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
const buildMapDispatchToProps = (fetchMethod) => (dispatch) => ({
  fetchRequestAction: (mail) => dispatch(fetchMethod(mail)),
})

/** Export connected Ask reset password form container */
const AskResetPasswordForm = (props) => <AccountRequestFormContainer requestFormId={requestFormIds.resetPasswordRequest} {...props} />
export const AskResetPasswordFormContainer = connect(
  buildMapStateToProps(ResetPasswordSelectors),
  buildMapDispatchToProps(sendAskResetPassword),
)(AskResetPasswordForm)

/** Export connected ask unlock account form container */
const AskUnlockAccountForm = (props) => <AccountRequestFormContainer requestFormId={requestFormIds.unlockAccountRequest} {...props} />
export const AskUnlockAccountFormContainer = connect(
  buildMapStateToProps(UnlockAccountSelectors),
  buildMapDispatchToProps(sendAskUnlockAccount),
)(AskUnlockAccountForm)
