import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, FormErrorMessage, ErrorTypes, Field, ValidationHelpers, RenderCheckbox } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'

/**
 * Display edit and create project form
 */
export class AccountFormComponent extends React.Component {

  static propTypes = {
    currentAccount: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        email: React.PropTypes.string,
        firstName: React.PropTypes.string,
        lastName: React.PropTypes.string,
      }),
    }),
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.currentAccount === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentAccount } = this.props
      this.props.initialize({
        email: currentAccount.content.email,
        firstName: currentAccount.content.firstName,
        lastName: currentAccount.content.lastName,
      })
    }
  }


  render() {
    const title = this.state.isCreating ? <FormattedMessage id="account.form.create.title" /> :
      (<FormattedMessage
        id="account.form.edit.title"
        values={{
          firstName: this.props.currentAccount.content.firstName,
          lastName: this.props.currentAccount.content.lastName,
        }}
      />)
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>

            <Field
              name="email"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="account.form.input.email" />}
            />
            <Field
              name="firstName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="account.form.input.firstName" />}
            />
            <Field
              name="lastName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="account.form.input.lastName" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="account.form.action.save" />}
              mainButtonType="submit"
              secondaryButtonLabel={<FormattedMessage id="account.form.action.cancel" />}
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

