/**
 * LICENSE_PLACEHOLDER
 */
import { SubmissionError } from 'redux-form'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, ErrorTypes, reduxForm } from '@regardsoss/form-utils'

/**
 * Reset password request form component
 */
export class ChangePasswordFormComponent extends React.Component {

  static propTypes = {
    // password rules, to show as error on invalid password
    // eslint-disable-next-line react/no-unused-prop-types
    passwordRules: PropTypes.arrayOf(PropTypes.string).isRequired,
    // calls update password action or shows token expired message
    onChangePassword: PropTypes.func.isRequired,
    // from reduxForm
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType, ...i18nContextType }


  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const { passwordRules, onChangePassword, pristine, submitting, invalid, handleSubmit } = this.props
    const { moduleTheme, intl: { formatMessage } } = this.context

    const passwordFormat = passwordRules.length ? passwordRules.join(formatMessage({ id: 'password.rules.joiner' })) :
      formatMessage({ id: 'default.password.format' })

    return (
      <div style={moduleTheme.layout}>
        <form
          onSubmit={handleSubmit(onChangePassword)}
        >
          <Card>
            <CardTitle
              title={formatMessage({ id: 'reset.password.update.request.title' })}
              subtitle={formatMessage({ id: 'reset.password.update.request.message' }, { passwordFormat })}
            />
            <CardText>
              <Field
                name="newPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={formatMessage({ id: 'reset.password.update.new.password' })}
              />
              <Field
                name="confirmPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={formatMessage({ id: 'reset.password.update.confirm.password' })}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={formatMessage({ id: 'reset.password.update.send' })}
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
  if (values.confirmPassword && values.newPassword && values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = ErrorTypes.DIFFERENT_PASSWORDS
  }
  return errors
}

function asyncValidate({ newPassword }, dispatch, props) {
  // ugly async connection should be done by the container bu we can't
  const { fetchPasswordValidity } = props
  return fetchPasswordValidity(newPassword).then((payload) => {
    if (!payload || !payload.validity) { // invalid password
      // eslint-disable-next-line
      throw { newPassword: ErrorTypes.INVALID_PASSWORD }
    } else {
      return payload.validity
    }
  })
}

export const formId = 'reset-password-update'
export default reduxForm({
  form: formId,
  validate,
  asyncValidate,
  asyncBlurFields: ['newPassword', 'confirmPassword'],
})(ChangePasswordFormComponent)

