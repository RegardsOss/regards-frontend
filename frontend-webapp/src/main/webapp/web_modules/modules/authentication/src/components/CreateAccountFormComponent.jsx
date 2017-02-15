/**
 * LICENSE_PLACEHOLDER
 */

import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { reduxForm, formValueSelector } from 'redux-form'
import { ReduxConnectedForm, connect } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, FormErrorMessage, ErrorTypes, ValidationHelpers } from '@regardsoss/form-utils'

const mailFieldId = 'mail'

/**
 * Form to create a REGARDS account (new internal authentication accounts only)
 */
export class CreateAccountFormComponent extends React.Component {

  static propTypes = {
    // Form initial value
    initialMail: React.PropTypes.string,
    // Last submit error message
    errorMessage: React.PropTypes.string,
    // on ask access send (form sumitting)
    onRequestAction: React.PropTypes.func.isRequired,
    // back
    onBack: React.PropTypes.func.isRequired,
    // project name
    project: React.PropTypes.string.isRequired,
    // from reduxFormSelector
    currentMailValue: React.PropTypes.string,
    // from redux form
    pristine: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType }

  componentWillMount = () => {
    const initialValues = {}
    initialValues[mailFieldId] = this.props.initialMail
    this.props.initialize(initialValues)
  }

  render() {
    const {
      project, currentMailValue, errorMessage,
      onBack, onRequestAction,
      pristine, submitting, invalid, handleSubmit,
    } = this.props
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <ReduxConnectedForm
          onSubmit={handleSubmit(onRequestAction)}
          i18nMessagesDir="modules/authentication/src/i18n"
        >
          <Card>
            <CardTitle
              title={<FormattedMessage id="create.account.request.title" />}
              subtitle={<FormattedMessage id="create.account.request.message" />}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <Field
                key="firstName"
                name="firstName"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="create.account.first.name" />}
              />
              <Field
                key="lastName"
                name="lastName"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="create.account.last.name" />}
              />
              <Field
                name={mailFieldId}
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="create.account.mail" />}
              />
              <Field
                key="newPassword"
                name="newPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={<FormattedMessage id="create.account.new.password" />}
              />
              <Field
                key="confirmPassword"
                name="confirmPassword"
                fullWidth
                component={RenderTextField}
                type="password"
                label={<FormattedMessage id="create.account.confirm.password" />}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={<FormattedMessage id="create.account.send" />}
                primary
                type="submit"
              />
              <RaisedButton
                disabled={submitting}
                label={<FormattedMessage id="create.account.form.back" />}
                primary
                onClick={() => onBack(currentMailValue)}
              />
            </CardActions>
          </Card>
        </ReduxConnectedForm>
      </div>
    )
  }
}

function validate(fieldValues) {
  const errors = {}
  // mail
  const mailValue = fieldValues[mailFieldId]
  if (!mailValue) {
    errors[mailFieldId] = ErrorTypes.REQUIRED
  } else if (!ValidationHelpers.isValidEmail(mailValue)) {
    errors[mailFieldId] = ErrorTypes.EMAIL
  }
  // first name
  if (!fieldValues.firstName) {
    errors.firstName = ErrorTypes.REQUIRED
  }
    // last name
  if (!fieldValues.lastName) {
    errors.lastName = ErrorTypes.REQUIRED
  }
    // password and password confirmation
  if (!fieldValues.newPassword) {
    errors.newPassword = ErrorTypes.REQUIRED
  }
  if (!fieldValues.confirmPassword) {
    errors.confirmPassword = ErrorTypes.REQUIRED
  }
  if (!ValidationHelpers.isValidPassword(fieldValues.newPassword)) {
    errors.newPassword = ErrorTypes.INVALID_PASSWORD
  }
  if (fieldValues.confirmPassword && fieldValues.newPassword && fieldValues.newPassword !== fieldValues.confirmPassword) {
    errors.confirmPassword = ErrorTypes.DIFFERENT_PASSWORDS
  }

  return errors
}

// prepare redux form
const formId = 'ask-project-access-form'
const connectedReduxForm = reduxForm({
  form: formId,
  validate,
})(CreateAccountFormComponent)


// connect with selector to select the last mail value
const selector = formValueSelector(formId)
export default connect(
  state => ({
    currentMailValue: selector(state, mailFieldId),
  }),
)(connectedReduxForm)
