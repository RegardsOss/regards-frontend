/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage, intlShape } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { reduxForm } from 'redux-form'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, FormErrorMessage, ErrorTypes, Field, ValidationHelpers } from '@regardsoss/form-utils'

/**
 * React components for login form in administration applicationstat
 */
class LoginComponent extends React.Component {

  static propTypes = {
    onLogin: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const style = {
      layout: this.context.moduleTheme.layout,
      action: this.context.moduleTheme.action,
    }
    const { errorMessage } = this.props
    const { intl } = this.context
    return (
      <div style={style.layout}>
        <form onSubmit={this.props.handleSubmit(this.props.onLogin)}>
          <Card>
            <CardTitle
              title={<FormattedMessage id="login.title" />}
              subtitle={
                <FormErrorMessage>
                  {errorMessage && intl.formatMessage({ id: errorMessage })}
                </FormErrorMessage>
              }
            />
            <CardText>
              <Field
                name="username"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="login.username" />}
              />
              <Field
                name="password"
                fullWidth
                component={RenderTextField}
                type="password"
                label={<FormattedMessage id="login.password" />}
              />
            </CardText>
            <CardActions style={style.action}>
              <RaisedButton
                disabled={this.props.pristine || this.props.submitting}
                label={<FormattedMessage id="login.button" />}
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
  if (!values.username) {
    errors.username = ErrorTypes.REQUIRED
  } else if (!ValidationHelpers.isValidEmail(values.username)) {
    errors.username = ErrorTypes.EMAIL
  }
  if (!values.password) {
    errors.password = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'login',
  validate,
})(LoginComponent)
