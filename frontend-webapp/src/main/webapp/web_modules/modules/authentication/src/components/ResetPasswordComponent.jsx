/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText, CardMedia } from 'material-ui/Card'
import { reduxForm } from 'redux-form'
import { ReduxConnectedForm } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { RenderTextField, FormErrorMessage, Field } from '@regardsoss/form-utils'
// ErrorTypes, , ValidationHelpers
/**
 * Reset password request form component
 */
class ResetPasswordComponent extends React.Component
{

  static propTypes = {
    submitting: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string.isRequired,
    invalid: React.PropTypes.bool.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    onResetPassword: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    console.error(this.context.moduleTheme)
    const { layout, action } = this.context.moduleTheme

    const { errorMessage } = this.props
    const { intl } = this.context

    const onBack = this.props.onBack
    const submitting = this.props.submitting
    const invalid = this.props.invalid
    return (
      <div style={layout}>
        <ReduxConnectedForm
          onSubmit={this.props.handleSubmit(this.props.onResetPassword)}
          i18nMessagesDir="modules/authentication/src/i18n"
        >
          <Card>
            <CardTitle
              title={<FormattedMessage id="reset.password.request.title" />}
              subtitle={
                <FormErrorMessage>
                  {errorMessage && intl.formatMessage({ id: errorMessage })}
                </FormErrorMessage>
              }
            />
            <CardMedia>
              <FormattedMessage id="reset.password.request.message" />
            </CardMedia>
            <CardText>
              <Field
                name="mail"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="reset.password.username" />}
              />
            </CardText>
            <CardActions style={action}>
              <RaisedButton
                disabled={submitting || invalid}
                label={<FormattedMessage id="reset.password.send" />}
                primary
                type="submit"
              />

              <RaisedButton
                label={<FormattedMessage id="reset.password.back" />}
                primary
                onClick={onBack}
              />
            </CardActions>
          </Card>
        </ReduxConnectedForm>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  /* if (!values.username) {
    errors.username = ErrorTypes.REQUIRED
  } else if (!ValidationHelpers.isValidEmail(values.username)) {
    errors.username = ErrorTypes.EMAIL
  }
  if (!values.password) {
    errors.password = ErrorTypes.REQUIRED
  }*/
  return errors
}

export default reduxForm({
  form: 'reset.password.request',
  validate,
})(ResetPasswordComponent)

