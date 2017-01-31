/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage, intlShape } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { reduxForm } from 'redux-form'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import LockOutline from 'material-ui/svg-icons/action/lock-outline'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Portrait from 'material-ui/svg-icons/image/portrait'
import { PictureLinkComponent } from '@regardsoss/components'
import { RenderTextField, FormErrorMessage, ErrorTypes, Field, ValidationHelpers } from '@regardsoss/form-utils'

/**
 * React components for login form in administration applicationstat
 */
export class AuthenticationComponent extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
    onCancelAction: React.PropTypes.func,
    cancelButton: React.PropTypes.bool,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }


  /**
   * On component mount
   */
  componentWillMount() {
    if (process.env.NODE_ENV === 'development') {
      /* console.log('DEV', 'Auto connection')*/
      // this.props.onLogin({ username: 'admin@cnes.fr', password: 'admin' })
    }
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const { errorMessage } = this.props
    const { intl, moduleTheme, muiTheme } = this.context
    let cancelButton = null
    if (this.props.cancelButton) {
      cancelButton = (
        <RaisedButton
          label={<FormattedMessage id="authentication.cancel" />}
          primary
          onClick={this.props.onCancelAction}
        />
      )
    }
    return (
      <div style={moduleTheme.layout}>
        <ReduxConnectedForm
          onSubmit={this.props.handleSubmit(this.props.onLogin)}
          i18nMessagesDir="modules/authentication/src/i18n"
        >
          <Card>
            <CardTitle
              title={this.props.title}
              subtitle={
                <FormErrorMessage>
                  {errorMessage && intl.formatMessage({ id: errorMessage })}
                </FormErrorMessage>
              }
            />
            <CardText>
              <FormattedMessage id="authentication.message" />
              <Field
                name="username"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="authentication.username" />}
              />
              <Field
                name="password"
                fullWidth
                component={RenderTextField}
                type="password"
                label={<FormattedMessage id="authentication.password" />}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={this.props.pristine || this.props.submitting || this.props.invalid}
                label={<FormattedMessage id="authentication.button" />}
                primary
                type="submit"
              />
              {cancelButton}
            </CardActions>
            <div style={{ display: 'flex', padding: '10px', margin: '20px 10px 10px 10px', justifyContent: 'space-around', borderWidth: '1px 0 0 0', borderStyle: 'solid', borderColor: muiTheme.palette.borderColor }}>
              <PictureLinkComponent
                IconComponent={Portrait}
                text="Create account"
              />
              <br />
              <PictureLinkComponent
                IconComponent={Refresh}
                text="Reset password"
              />
              <br />
              <PictureLinkComponent
                IconComponent={LockOutline}
                text="Unlock account"
              />
            </div>
          </Card>
        </ReduxConnectedForm>
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
})(AuthenticationComponent)
