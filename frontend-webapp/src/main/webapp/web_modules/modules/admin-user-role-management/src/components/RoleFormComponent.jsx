import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, RenderCheckbox } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { Role } from '@regardsoss/model'

/**
 * Display edit and create project form
 */
export class RoleFormComponent extends React.Component {

  static propTypes = {
    currentRole: Role,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
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
    const { pristine, submitting, invalid } = this.props
    const title = this.state.isCreating ? <FormattedMessage id="project.create.title" /> :
      (<FormattedMessage
        id="project.edit.title"
        values={{
          name: this.props.currentProject.content.name,
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
              name="name"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="role.form.name" />}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="role.form.description" />}
            />
            <Field
              name="isCorsRequestsAuthorized"
              component={RenderCheckbox}
              label={<FormattedMessage id="role.form.isCorsRequestsAuthorized" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="role.form.action.button" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="role.form.action.button" />}
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
  form: 'role-form',
  validate,
})(RoleFormComponent)

