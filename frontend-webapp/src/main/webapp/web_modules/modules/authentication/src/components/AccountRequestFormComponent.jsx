/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { formValueSelector } from 'redux-form'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { Field, RenderTextField, FormErrorMessage, ValidationHelpers, ErrorTypes, reduxForm } from '@regardsoss/form-utils'

/** Possible form Ids, matching with corresponding request */
export const requestFormIds = {
  unlockAccountRequest: 'ask.unlock.account.form',
  resetPasswordRequest: 'ask.reset.password.form',
}

export const mailFieldId = 'mail'

/**
 * Account request form component (the user enters his mail address and emits the request to admin here)
 */
export class AccountRequestFormComponent extends React.Component {

  static propTypes = {
    // Submit error
    errorMessage: PropTypes.string,
    // calls reset password action
    onRequestAction: PropTypes.func.isRequired,
    // action form text id: prefixes all keys
    requestFormId: PropTypes.oneOf(values(requestFormIds)).isRequired,
    // back
    onBack: PropTypes.func.isRequired,
    // Form initial value
    initialMail: PropTypes.string,
    // from reduxFormSelector
    currentMailValue: PropTypes.string,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType }

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
      errorMessage, onBack, submitting, invalid,
      onRequestAction, handleSubmit,
    } = this.props
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <form
          className={requestFormId === requestFormIds.unlockAccountRequest ? 'selenium-unlockAccountForm' : 'selenium-resetPasswordForm'}
          onSubmit={handleSubmit(onRequestAction)}
        >
          <Card>
            <CardTitle
              title={<FormattedMessage id={`${requestFormId}.title`} />}
              subtitle={<FormattedMessage id={`${requestFormId}.message`} />}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
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
                className="selenium-backButton"
                disabled={submitting}
                label={<FormattedMessage id="account.request.form.back" />}
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
