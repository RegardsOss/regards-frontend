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
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        icon: React.PropTypes.string,
        isPublic: React.PropTypes.bool,
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
      isCreating: props.currentProject === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentProject } = this.props
      this.props.initialize({
        description: currentProject.content.description,
        icon: currentProject.content.icon,
        isPublic: currentProject.content.isPublic,
      })
    } else {
      this.props.initialize({
        isPublic: false,
      })
    }
  }


  render() {
    const title = this.state.isCreating ? <FormattedMessage id="project.create.title" /> :
      (<FormattedMessage
        id="project.edit.title"
        values={{
          name: <i>{this.props.currentProject.content.name}</i>,
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
              label={<FormattedMessage id="projects.table.name.label" />}
            />
            <Field
              name="firstName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="projects.table.description.label" />}
            />
            <Field
              name="lastName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="projects.table.description.label" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="projects.submit.button" />}
              mainButtonType="submit"
              secondaryButtonLabel={<FormattedMessage id="projects.cancel.button" />}
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
  if (values.name) {
    if (!/^[a-zA-Z0-9]+$/i.test(values.name)) {
      errors.name = 'invalid.only_alphanumeric'
    }
  }
  return errors
}

export default reduxForm({
  form: 'account-form',
  validate,
})(AccountFormComponent)

