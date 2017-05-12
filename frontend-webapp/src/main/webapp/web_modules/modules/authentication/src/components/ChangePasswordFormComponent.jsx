/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, ErrorTypes, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'

/**
 * Reset password request form component
 */
export class ChangePasswordFormComponent extends React.Component {

  static propTypes = {
    // calls update password action or shows token expired message
    onChangePassword: PropTypes.func.isRequired,
    // from reduxForm
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const { onChangePassword, pristine, submitting, invalid, handleSubmit } = this.props
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <form
          onSubmit={handleSubmit(onChangePassword)}
        >
          <Card>
            <CardTitle
              title={<FormattedMessage id="reset.password.update.request.title" />}
              subtitle={<FormattedMessage id="reset.password.update.request.message" />}
            />
            <CardText>
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
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={<FormattedMessage id="reset.password.update.send" />}
                primary
                type="submit"
              />
            </CardActions>
          </Card>
        </form>
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
  if (!ValidationHelpers.isValidPassword(values.newPassword)) {
    errors.newPassword = ErrorTypes.INVALID_PASSWORD
  }
  if (values.confirmPassword && values.newPassword && values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = ErrorTypes.DIFFERENT_PASSWORDS
  }
  return errors
}

export const formId = 'reset-password-update'
export default reduxForm({
  form: formId,
  validate,
})(ChangePasswordFormComponent)

