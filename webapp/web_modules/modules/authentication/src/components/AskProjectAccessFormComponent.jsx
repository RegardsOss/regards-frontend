/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import get from 'lodash/get'
import trim from 'lodash/trim'
import { formValueSelector } from 'redux-form'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FormErrorMessage, HelpMessageComponent } from '@regardsoss/components'
import {
  reduxForm, RenderTextField, RenderCheckbox, Field, ValidationHelpers, ErrorTypes,
} from '@regardsoss/form-utils'
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
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // should use existing account
    useExistingAccount: PropTypes.bool,
    // Last submit error message
    errorMessage: PropTypes.string,
    // on ask access send (form sumitting)
    onRequestAction: PropTypes.func.isRequired,
    // back
    onBack: PropTypes.func.isRequired,
    // project metadata
    projectMetadata: MetadataList.isRequired,
    // from reduxFormSelector
    currentMailValue: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchPasswordValidity: PropTypes.func.isRequired,
    // from redux form
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  UNSAFE_componentWillMount = () => {
    const initialValues = {}
    initialValues[mailFieldId] = this.props.initialMail
    initialValues[useExistingAccountFieldId] = false
    this.props.initialize(initialValues)
  }

  /** User callback: back operation */
  onBack = () => {
    const { onBack, currentMailValue } = this.props
    onBack(currentMailValue)
  }

  render() {
    const {
      projectMetadata, passwordRules, useExistingAccount, errorMessage,
      onRequestAction, pristine, submitting, invalid, handleSubmit,
    } = this.props
    const { moduleTheme, intl: { formatMessage } } = this.context
    return (
      <div style={moduleTheme.layout}>
        <form onSubmit={handleSubmit(onRequestAction)}>
          <Card>
            <CardTitle
              title={formatMessage({ id: 'ask.project.access.request.title' })}
              subtitle={formatMessage({ id: 'ask.project.access.request.message' })}
            />
            <CardText>
              <HelpMessageComponent
                message={passwordRules}
              />
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <ScrollArea
                vertical
                horizontal={false}
                style={moduleTheme.dialog.scrollStyle}
              >
                <Field
                  name={useExistingAccountFieldId}
                  component={RenderCheckbox}
                  label={formatMessage({ id: 'ask.project.access.using.existing.account' })}
                />
                <Field
                  name={mailFieldId}
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  floatingLabelText={formatMessage({ id: 'ask.project.access.mail' })}
                  normalize={trim}
                />
                {useExistingAccount ? null : (
                  <div>
                    <Field
                      key="newPassword"
                      name="newPassword"
                      fullWidth
                      component={RenderTextField}
                      type="password"
                      floatingLabelText={formatMessage({ id: 'ask.project.access.new.password' })}
                      normalize={trim}
                    />
                    <Field
                      key="confirmPassword"
                      name="confirmPassword"
                      fullWidth
                      component={RenderTextField}
                      type="password"
                      floatingLabelText={formatMessage({ id: 'ask.project.access.confirm.password' })}
                      normalize={trim}
                    />
                    <Field
                      key="firstName"
                      name="firstName"
                      fullWidth
                      component={RenderTextField}
                      type="text"
                      floatingLabelText={formatMessage({ id: 'ask.project.access.first.name' })}
                    />
                    <Field
                      key="lastName"
                      name="lastName"
                      fullWidth
                      component={RenderTextField}
                      type="text"
                      floatingLabelText={formatMessage({ id: 'ask.project.access.last.name' })}
                    />
                  </div>
                )}
                {
                  // whatever the case: show project metadata
                  projectMetadata.map((metadata) => <MetadataField key={metadata.key} metadata={metadata} fullWidth />)
                }
                <br />
                <br />
              </ScrollArea>
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={submitting || invalid || pristine}
                label={formatMessage({ id: 'ask.project.access.send' })}
                primary
                type="submit"
              />
              <RaisedButton
                disabled={submitting}
                label={formatMessage({ id: 'ask.project.access.form.back' })}
                primary
                onClick={this.onBack}
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
    if (fieldValues.confirmPassword && fieldValues.newPassword && fieldValues.newPassword !== fieldValues.confirmPassword) {
      errors.confirmPassword = ErrorTypes.DIFFERENT_PASSWORDS
    }
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
  const { fetchPasswordValidity, useExistingAccount } = props
  if (useExistingAccount) {
    // no validation required, the user will not enter a password
    return Promise.resolve({})
  }

  // ugly async connection should be done by the container bu we can't
  return fetchPasswordValidity(newPassword).then((result) => {
    const validity = get(result, 'payload.validity', false)
    if (!validity) { // invalid password
      // Redux form api
      // eslint-disable-next-line no-throw-literal
      throw { newPassword: ErrorTypes.INVALID_PASSWORD }
    }
  })
}

// prepare redux form
const formId = 'ask-project-access-form'
const connectedReduxForm = reduxForm({
  form: formId,
  validate,
  asyncValidate,
  asyncBlurFields: ['newPassword'],
})(AskProjectAccessFormComponent)

// connect with selector to select the last mail value
const selector = formValueSelector(formId)
export default connect((state) => ({
  currentMailValue: selector(state, mailFieldId),
  useExistingAccount: selector(state, useExistingAccountFieldId),
}))(connectedReduxForm)
