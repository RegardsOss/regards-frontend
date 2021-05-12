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
import values from 'lodash/values'
import trim from 'lodash/trim'

import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FormErrorMessage } from '@regardsoss/components'
import {
  Field, RenderTextField, ValidationHelpers, reduxForm,
} from '@regardsoss/form-utils'

const emailValidator = [ValidationHelpers.required, ValidationHelpers.email]

/** Possible form Ids, matching with corresponding request */
export const requestFormIds = {
  unlockAccountRequest: 'ask.unlock.account.form',
  resetPasswordRequest: 'ask.reset.password.form',
}

export const mailFieldId = 'mail'

/**
 * Account request form component (the user enters his mail address and emits the request to admin here)
 */
export class AccountRequestFormComponent extends React.Component {
  static propTypes = {
    // Submit error
    errorMessage: PropTypes.string,
    // calls reset password action
    onRequestAction: PropTypes.func.isRequired,
    // action form text id: prefixes all keys
    requestFormId: PropTypes.oneOf(values(requestFormIds)).isRequired,
    // back
    onBack: PropTypes.func.isRequired,
    // Form initial value
    initialMail: PropTypes.string,
    // from reduxFormSelector
    currentMailValue: PropTypes.string,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType, ...i18nContextType }

  UNSAFE_componentWillMount = () => {
    const initialValues = {}
    initialValues[mailFieldId] = this.props.initialMail
    this.props.initialize(initialValues)
  }

  /** User callback: back operation */
  onBack = () => {
    const { onBack, currentMailValue } = this.props
    onBack(currentMailValue)
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const {
      requestFormId, errorMessage, submitting,
      invalid, onRequestAction, handleSubmit,
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <form
          className={requestFormId === requestFormIds.unlockAccountRequest ? 'selenium-unlockAccountForm' : 'selenium-resetPasswordForm'}
          onSubmit={handleSubmit(onRequestAction)}
        >
          <Card>
            <CardTitle
              title={formatMessage({ id: `${requestFormId}.title` })}
              subtitle={formatMessage({ id: `${requestFormId}.message` })}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <Field
                name={mailFieldId}
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'account.request.form.mail' })}
                validate={emailValidator}
                normalize={trim}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={submitting || invalid}
                label={this.context.intl.formatMessage({ id: 'account.request.form.send' })}
                primary
                type="submit"
              />
              <RaisedButton
                className="selenium-backButton"
                disabled={submitting}
                label={this.context.intl.formatMessage({ id: 'account.request.form.back' })}
                primary
                onClick={this.onBack}
              />
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}

// prepare redux form
const form = 'account-request-form'
const connectedReduxForm = reduxForm({
  form,
})(AccountRequestFormComponent)

// connect with selector to select the last mail value
const selector = formValueSelector(form)
export default connect((state) => ({
  currentMailValue: selector(state, mailFieldId),
}))(connectedReduxForm)
