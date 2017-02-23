/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { RenderTextField, Field, FormErrorMessage, reduxForm } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'

/**
*Session management component : if session is locked, shows unlock screen, renders children otherwise
*/
export class SessionLockedFormComponent extends React.Component {

  static propTypes = {
    // on submit unlock
    onUnlock: React.PropTypes.func.isRequired,
    // Form general error
    errorMessage: React.PropTypes.string,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  static contextTypes = { ...themeContextType }

  /**
   * Render function
   * @returns {React.Component} components
   */
  render() {
    const { errorMessage, handleSubmit, onUnlock } = this.props
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.layout}>
        <form onSubmit={handleSubmit(onUnlock)}>
          <Card>
            <CardTitle
              title={<FormattedMessage id="session.locked.title" />}
              subtitle={<FormattedMessage id="session.locked.subtitle" />}
            />
            <CardText>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <Field
                name="password"
                fullWidth
                component={RenderTextField}
                type="password"
                label={<FormattedMessage id="session.locked.password" />}
              />
            </CardText>
            <CardActions style={moduleTheme.action}>
              <RaisedButton
                disabled={this.props.pristine || this.props.submitting || this.props.invalid}
                label={<FormattedMessage id="session.locked.button" />}
                primary
                type="submit"
              />
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}
// prepare redux form
export default reduxForm({ form: 'session-locked-form' })(SessionLockedFormComponent)
