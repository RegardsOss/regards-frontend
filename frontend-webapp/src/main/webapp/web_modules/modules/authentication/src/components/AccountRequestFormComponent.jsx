/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { reduxForm } from 'redux-form'
import { ReduxConnectedForm } from '@regardsoss/redux'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, FormErrorMessage, Field, ValidationHelpers, ErrorTypes } from '@regardsoss/form-utils'

/** Possible form Ids, matching with corresponding request */
export const requestFormIds = ['unlock.account.request', 'reset.password.request']

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
    requestFormId: React.PropTypes.oneOf(requestFormIds).isRequired,
    // back
    onBack: React.PropTypes.func.isRequired,
    // Form initial value
    initialMail: React.PropTypes.string,
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
    this.props.initialize({
      mail: this.props.initialMail,
    })
  }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const { requestFormId, sendFailed, onBack, submitting, invalid, onRequestAction, handleSubmit } = this.props
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
                name="mail"
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
                onClick={onBack}
              />
            </CardActions>
          </Card>
        </ReduxConnectedForm>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.mail) {
    errors.mail = ErrorTypes.REQUIRED
  } else if (!ValidationHelpers.isValidEmail(values.mail)) {
    errors.mail = ErrorTypes.EMAIL
  }
  return errors
}

export default reduxForm({
  form: 'account.request.form',
  validate,
})(AccountRequestFormComponent)

