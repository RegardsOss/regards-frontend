/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { isEmpty } from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'
import { reduxForm, formValueSelector } from 'redux-form'
import { ReduxConnectedForm, connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import LockOutline from 'material-ui/svg-icons/action/lock-outline'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Portrait from 'material-ui/svg-icons/image/portrait'
import { PictureLinkComponent } from '@regardsoss/components'
import { RenderTextField, FormErrorMessage, ErrorTypes, Field, ValidationHelpers } from '@regardsoss/form-utils'

const mailFieldId = 'username'

/**
 * React components for login form
 */
export class AuthenticationFormComponent extends React.Component {

  static propTypes = {

    // initial mail value
    initialMail: React.PropTypes.string,
    // form title
    title: React.PropTypes.string.isRequired,
    // show create account link?
    showCreateAccount: React.PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: React.PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: React.PropTypes.func,
    // other authentication forms links
    onGotoCreateAccount: React.PropTypes.func.isRequired,
    onGotoResetPassword: React.PropTypes.func.isRequired,
    onGotoUnlockAccount: React.PropTypes.func.isRequired,
    // on login submit
    onLogin: React.PropTypes.func.isRequired,
    // Form general error
    error: React.PropTypes.string,
    // from reduxFormSelector
    currentMailValue: React.PropTypes.string,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType }


  /**
   * On component mount
   */
  componentWillMount() {
    if (process.env.NODE_ENV === 'development') {
      /* console.log('DEV', 'Auto connection')*/
      // this.props.onLogin({ username: 'admin@cnes.fr', password: 'admin' })
    }
    const initialValues = {}
    initialValues[mailFieldId] = this.props.initialMail
    this.props.initialize(initialValues)
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const {
      error, currentMailValue, initialMail,
      showCreateAccount, showCancel, onCancelAction, handleSubmit,
      onLogin, onGotoUnlockAccount, onGotoResetPassword, onGotoCreateAccount,
    } = this.props
    const { moduleTheme } = this.context
    let cancelButtonElt
    if (showCancel) {
      cancelButtonElt = (
        <RaisedButton
          label={<FormattedMessage id="authentication.cancel" />}
          primary
          onClick={onCancelAction}
        />
      )
    }
    return (
      <div style={moduleTheme.layout}>
        <ReduxConnectedForm
          onSubmit={handleSubmit(onLogin)}
          i18nMessagesDir="modules/authentication/src/i18n"
        >
          <Card>
            <CardTitle
              title={this.props.title}
              subtitle={
                <FormErrorMessage>{error || ''}</FormErrorMessage>
              }
            />
            <CardText>
              <FormattedMessage id="authentication.message" />
              <Field
                name={mailFieldId}
                value={initialMail}

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
              {cancelButtonElt}
            </CardActions>
            <div style={moduleTheme.linksBar}>
              <PictureLinkComponent
                disabled={!showCreateAccount}
                IconComponent={Portrait}
                text={<FormattedMessage id="authentication.goto.create.account" />}
                onAction={() => onGotoCreateAccount(currentMailValue)}
              />
              <PictureLinkComponent
                IconComponent={Refresh}
                text={<FormattedMessage id="authentication.goto.reset.password" />}
                onAction={() => onGotoResetPassword(currentMailValue)}
              />
              <PictureLinkComponent
                IconComponent={LockOutline}
                text={<FormattedMessage id="authentication.goto.unlock.account" />}
                onAction={() => onGotoUnlockAccount(currentMailValue)}
              />
            </div>
          </Card>
        </ReduxConnectedForm>
      </div>
    )
  }
}

function validate(fieldValues) {
  const errors = {}
  if (isEmpty(fieldValues)) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  const mailValue = fieldValues[mailFieldId]
  if (!mailValue) {
    errors[mailFieldId] = ErrorTypes.REQUIRED
  } else if (!ValidationHelpers.isValidEmail(mailValue)) {
    errors[mailFieldId] = ErrorTypes.EMAIL
  }
  if (!fieldValues.password) {
    errors.password = ErrorTypes.REQUIRED
  }
  return errors
}

// prepare redux form
const formId = 'authentication-form'
const connectedReduxForm = reduxForm({
  form: formId,
  validate,
})(AuthenticationFormComponent)

// connect with selector to select the last mail value
const selector = formValueSelector(formId)
export default connect(
  state => ({
    currentMailValue: selector(state, mailFieldId),
  }),
)(connectedReduxForm)

