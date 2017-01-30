/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { reduxForm } from 'redux-form'
import { ReduxConnectedForm } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, FormErrorMessage, Field, ErrorTypes } from '@regardsoss/form-utils'

/**
 * Reset password request form component
 */
export class TerminateResetPasswordFormComponent extends React.Component {

  static propTypes = {
    // Is token invalid now?
    tokenInvalid: React.PropTypes.bool,
    // calls reset password action
    onUpdatePassword: React.PropTypes.func.isRequired,
    onNewResetPasswordRequest: React.PropTypes.func.isRequired,
    // from reduxForm
    pristine: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const { pristine, submitting, invalid, tokenInvalid, onNewResetPasswordRequest, onUpdatePassword, handleSubmit } = this.props
    const { moduleTheme, intl } = this.context
    return (
      <div style={moduleTheme.layout}>
        <ReduxConnectedForm
          onSubmit={handleSubmit(onUpdatePassword)}
          i18nMessagesDir="modules/authentication/src/i18n"
        >
          <Card>
            <CardTitle
              title={<FormattedMessage id="reset.password.update.request.title" />}
              subtitle={
                <FormErrorMessage>
                  {tokenInvalid && intl.formatMessage({ id: 'reset.password.update.token.invalid' })}
                </FormErrorMessage>
              }
            />
            <CardText>
              <FormattedMessage id="reset.password.update.request.message" />
              <Field
                name="newPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={<FormattedMessage id="reset.password.update.new.password" />}
              />
              <Field
                name="confirmPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={<FormattedMessage id="reset.password.update.confirm.password" />}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              { tokenInvalid
                ? (
                  <RaisedButton
                    label={<FormattedMessage id="reset.password.update.new.reset.request" />}
                    primary
                    onClick={onNewResetPasswordRequest}
                  />
                )
                : (
                  <RaisedButton
                    disabled={submitting || invalid || pristine}
                    label={<FormattedMessage id="reset.password.update.send" />}
                    primary
                    type="submit"
                  />
                )
              }
            </CardActions>
          </Card>
        </ReduxConnectedForm>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.newPassword) {
    errors.newPassword = ErrorTypes.REQUIRED
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = ErrorTypes.REQUIRED
  }
  if (values.confirmPassword && values.newPassword && values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'reset.password.update',
  validate,
})(TerminateResetPasswordFormComponent)

