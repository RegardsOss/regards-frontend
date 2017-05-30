/**
 * LICENSE_PLACEHOLDER
 */
import get from 'lodash/get'
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
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // calls update password action or shows token expired message
    onChangePassword: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchPasswordValidity: PropTypes.func.isRequired,
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

    return (
      <div style={moduleTheme.layout}>
        <form
          onSubmit={handleSubmit(onChangePassword)}
        >
          <Card>
            <CardTitle
              title={formatMessage({ id: 'reset.password.update.request.title' })}
              subtitle={formatMessage({ id: 'reset.password.update.request.message' }, { passwordRules })}
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

/**
 * Asynchronous password validation (the server computes validity)
 * @param {*} values form values
 * @param {*} dispatch  dispatch
 * @param {*} props  properties
 */
function asyncValidate({ newPassword }, dispatch, props) {
  // ugly async connection should be done by the container bu we can't
  const { fetchPasswordValidity } = props
  return fetchPasswordValidity(newPassword).then((result) => {
    const validity = get(result, 'payload.content.validity', false)
    const errors = {}
    if (!validity) { // invalid password
      errors.newPassword = ErrorTypes.INVALID_PASSWORD
    }
    return errors
  })
}

export const formId = 'reset-password-update'
export default reduxForm({
  form: formId,
  validate,
  asyncValidate,
  asyncBlurFields: ['newPassword'],
})(ChangePasswordFormComponent)

