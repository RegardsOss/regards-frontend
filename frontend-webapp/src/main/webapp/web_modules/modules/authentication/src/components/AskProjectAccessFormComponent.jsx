/**
 * LICENSE_PLACEHOLDER
 */

import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { reduxForm, formValueSelector } from 'redux-form'
import { ReduxConnectedForm, connect } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, RenderCheckbox, Field, FormErrorMessage, ErrorTypes, ValidationHelpers } from '@regardsoss/form-utils'

const mailFieldId = 'mail'
const useExistingAccountFieldId = 'hasAlreadyAccount'

/**
 * Form to request access to a project. Handles new account (internal or external) and existing account
 */
export class AskProjectAccessFormComponent extends React.Component {

  static propTypes = {
    // Form initial value
    initialMail: React.PropTypes.string,
    // should use existing account
    useExistingAccount: React.PropTypes.bool,
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
    initialValues[useExistingAccountFieldId] = false
    this.props.initialize(initialValues)
  }

  render() {
    const {
      project,
      currentMailValue, useExistingAccount, errorMessage,
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
              title={<FormattedMessage id="ask.project.access.request.title" values={{ project }} />}
              subtitle={<FormattedMessage id="ask.project.access.request.message" values={{ project }} />}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <Field
                name={useExistingAccountFieldId}
                component={RenderCheckbox}
                label={<FormattedMessage id="ask.project.access.using.existing.account" />}
              />
              <Field
                name={mailFieldId}
                fullWidth
                component={RenderTextField}
                type="text"
                floatingLabelText={<FormattedMessage id="ask.project.access.mail" />}
              />
              {useExistingAccount || (
                <div>
                  <Field
                    key="firstName"
                    name="firstName"
                    fullWidth
                    component={RenderTextField}
                    type="text"
                    floatingLabelText={<FormattedMessage id="ask.project.access.first.name" />}
                  />
                  <Field
                    key="lastName"
                    name="lastName"
                    fullWidth
                    component={RenderTextField}
                    type="text"
                    floatingLabelText={<FormattedMessage id="ask.project.access.last.name" />}
                  />
                  <Field
                    key="newPassword"
                    name="newPassword"
                    fullWidth
                    component={RenderTextField}
                    type="password"
                    floatingLabelText={<FormattedMessage id="ask.project.access.new.password" />}
                  />
                  <Field
                    key="confirmPassword"
                    name="confirmPassword"
                    fullWidth
                    component={RenderTextField}
                    type="password"
                    floatingLabelText={<FormattedMessage id="ask.project.access.confirm.password" />}
                  />
                </div>
              )}
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={<FormattedMessage id="ask.project.access.send" />}
                primary
                type="submit"
              />
              <RaisedButton
                disabled={submitting}
                label={<FormattedMessage id="ask.project.access.form.back" />}
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
  // common validation
  const mailValue = fieldValues[mailFieldId]
  if (!mailValue) {
    errors[mailFieldId] = ErrorTypes.REQUIRED
  } else if (!ValidationHelpers.isValidEmail(mailValue)) {
    errors[mailFieldId] = ErrorTypes.EMAIL
  }
  // specific validation for new accounts
  if (!fieldValues[useExistingAccountFieldId]) {
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
  }

  return errors
}

// prepare redux form
const formId = 'ask-project-access-form'
const connectedReduxForm = reduxForm({
  form: formId,
  validate,
})(AskProjectAccessFormComponent)


// connect with selector to select the last mail value
const selector = formValueSelector(formId)
export default connect(
  state => ({
    currentMailValue: selector(state, mailFieldId),
    useExistingAccount: selector(state, useExistingAccountFieldId),
  }),
)(connectedReduxForm)
