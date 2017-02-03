/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { reduxForm, formValueSelector } from 'redux-form'
import { values, isEmpty } from 'lodash'
import { ReduxConnectedForm, connect } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, FormErrorMessage, Field, ValidationHelpers, ErrorTypes } from '@regardsoss/form-utils'

/** Possible form Ids, matching with corresponding request */
export const requestFormIds = {
  unlockAccountRequest: 'unlock.account.request',
  resetPasswordRequest: 'reset.password.request',
}

const mailFieldId = 'mail'

/**
 * Account request form component (the user enters his mail address and emits the request to admin here)
 */
export class AccountRequestFormComponent extends React.Component {

  static propTypes = {
    // Did send failed
    sendFailed: React.PropTypes.bool,
    // calls reset password action
    onRequestAction: React.PropTypes.func.isRequired,
    // action form text id: prefixes all keys
    requestFormId: React.PropTypes.oneOf(values(requestFormIds)).isRequired,
    // back
    onBack: React.PropTypes.func.isRequired,
    // Form initial value
    initialMail: React.PropTypes.string,
    // from reduxFormSelector
    currentMailValue: React.PropTypes.string,
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  componentWillMount = () => {
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
      currentMailValue, requestFormId,
      sendFailed, onBack, submitting, invalid,
      onRequestAction, handleSubmit,
    } = this.props
    const { intl, moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <ReduxConnectedForm
          onSubmit={handleSubmit(onRequestAction)}
          i18nMessagesDir="modules/authentication/src/i18n"
        >
          <Card>
            <CardTitle
              title={<FormattedMessage id={`${requestFormId}.title`} />}
              subtitle={
                <FormErrorMessage>
                  {sendFailed && intl.formatMessage({ id: 'account.request.form.send.failed' })}
                </FormErrorMessage>
              }
            />
            <CardText>
              <FormattedMessage id={`${requestFormId}.message`} />
              <Field
                name={mailFieldId}
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="account.request.form.mail" />}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={submitting || invalid}
                label={<FormattedMessage id="account.request.form.send" />}
                primary
                type="submit"
              />
              <RaisedButton
                label={<FormattedMessage id="account.request.form.back" />}
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
  return errors
}


// prepare redux form
const formId = 'account-request-form'
const connectedReduxForm = reduxForm({
  form: formId,
  validate,
})(AccountRequestFormComponent)


// connect with selector to select the last mail value
const selector = formValueSelector(formId)
export default connect(
  state => ({
    currentMailValue: selector(state, mailFieldId),
  }),
)(connectedReduxForm)
