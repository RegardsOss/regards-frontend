/**
 * LICENSE_PLACEHOLDER
 */

import { FormattedMessage } from 'react-intl'
import { formValueSelector } from 'redux-form'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { reduxForm, RenderTextField, RenderCheckbox, Field, FormErrorMessage, ErrorTypes, ValidationHelpers } from '@regardsoss/form-utils'
import { ScrollArea } from '@regardsoss/adapters'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'

export const mailFieldId = 'mail'
export const useExistingAccountFieldId = 'hasAlreadyAccount'

/**
 * Form to request access to a project. Handles new account (internal or external) and existing account
 */
export class AskProjectAccessFormComponent extends React.Component {

  static propTypes = {
    // Form initial value
    initialMail: PropTypes.string,
    // should use existing account
    useExistingAccount: PropTypes.bool,
    // Last submit error message
    errorMessage: PropTypes.string,
    // on ask access send (form sumitting)
    onRequestAction: PropTypes.func.isRequired,
    // back
    onBack: PropTypes.func.isRequired,
    // project name
    project: PropTypes.string.isRequired,
    // project metadata
    projectMetadata: MetadataList.isRequired,
    // from reduxFormSelector
    currentMailValue: PropTypes.string,
    // from redux form
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
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
      project, projectMetadata,
      currentMailValue, useExistingAccount, errorMessage,
      onBack, onRequestAction,
      pristine, submitting, invalid, handleSubmit,
    } = this.props
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <form onSubmit={handleSubmit(onRequestAction)}>
          <Card>
            <CardTitle
              title={<FormattedMessage id="ask.project.access.request.title" values={{ project }} />}
              subtitle={<FormattedMessage id="ask.project.access.request.message" values={{ project }} />}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <ScrollArea
                vertical
                horizontal={false}
                style={{
                  height: moduleTheme.dialog.maxFormHeight,
                }}
              >
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
                {useExistingAccount ? null : (
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
                {
                  // whatever the case: show project metadata
                  projectMetadata.map(metadata =>
                    <MetadataField key={metadata.key} metadata={metadata} fullWidth />)
                }
                <br />
                <br />
              </ScrollArea>
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
        </form>
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
