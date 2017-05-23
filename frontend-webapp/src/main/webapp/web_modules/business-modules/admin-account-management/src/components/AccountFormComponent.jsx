import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { reduxForm, RenderTextField, Field } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { Account } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display edit and create project form
 */
export class AccountFormComponent extends React.Component {

  static propTypes = {
    currentAccount: Account.isRequired,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { currentAccount } = this.props
    this.props.initialize({
      email: currentAccount.content.email,
      firstName: currentAccount.content.firstName,
      lastName: currentAccount.content.lastName,
    })
  }


  render() {
    const { pristine, submitting } = this.props
    return (
      <form
        className="selenium-accountForm"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={<FormattedMessage
              id="account.form.edit.title"
              values={{
                firstName: this.props.currentAccount.content.firstName,
                lastName: this.props.currentAccount.content.lastName,
              }}
            />}
          />
          <CardText>

            <Field
              name="email"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'account.form.input.email' })}
            />
            <Field
              name="firstName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'account.form.input.firstName' })}
            />
            <Field
              name="lastName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'account.form.input.lastName' })}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'account.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'account.form.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}


function validate(values) {
  const errors = {}
  return errors
}

export default reduxForm({
  form: 'account-form',
  validate,
})(AccountFormComponent)

