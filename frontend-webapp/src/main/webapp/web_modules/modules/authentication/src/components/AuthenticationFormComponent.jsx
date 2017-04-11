/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { isEmpty } from 'lodash'
import { formValueSelector } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import UnlockAccountIcon from 'material-ui/svg-icons/action/lock'
import ResetPasswordIcon from 'material-ui/svg-icons/action/restore-page'
import ProjectAccessIcon from 'material-ui/svg-icons/action/assignment-ind'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { PictureLinkComponent } from '@regardsoss/components'
import { RenderTextField, Field, FormErrorMessage, ErrorTypes, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'

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
    showAskProjectAccess: React.PropTypes.bool.isRequired,
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
    errorMessage: React.PropTypes.string,
    // from reduxFormSelector
    currentMailValue: React.PropTypes.string,
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType }

  componentWillMount() {
    const initialValues = {}
    initialValues[mailFieldId] = this.props.initialMail
    this.props.initialize(initialValues)
  }

  render() {
    const {
      errorMessage, currentMailValue, initialMail,
      showAskProjectAccess, showCancel, onCancelAction, handleSubmit,
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
        <form
          className="selenium-authenticationForm"
          onSubmit={handleSubmit(onLogin)}
        >
          <Card>
            <CardTitle
              title={this.props.title}
              subtitle={<FormattedMessage id="authentication.message" />}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
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
                disabled={this.props.submitting || this.props.invalid}
                label={<FormattedMessage id="authentication.button" />}
                primary
                type="submit"
              />
              {cancelButtonElt}
            </CardActions>
            <div style={moduleTheme.linksBar}>
              <PictureLinkComponent
                className="selenium-projectAccessButton"
                disabled={!showAskProjectAccess}
                IconComponent={ProjectAccessIcon}
                text={<FormattedMessage id="authentication.goto.ask.access" />}
                onAction={() => onGotoCreateAccount(currentMailValue)}
              />
              <PictureLinkComponent
                className="selenium-resetPasswordButton"
                IconComponent={ResetPasswordIcon}
                text={<FormattedMessage id="authentication.goto.reset.password" />}
                onAction={() => onGotoResetPassword(currentMailValue)}
              />
              <PictureLinkComponent
                className="selenium-unlockAccountButton"
                IconComponent={UnlockAccountIcon}
                text={<FormattedMessage id="authentication.goto.unlock.account" />}
                onAction={() => onGotoUnlockAccount(currentMailValue)}
              />
            </div>
          </Card>
        </form>
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

