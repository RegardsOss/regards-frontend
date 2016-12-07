import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, RenderCheckbox } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'

/**
 * Display edit and create project form
 */
export class ProjectFormComponent extends React.Component {

  static propTypes = {
    currentProject: React.PropTypes.shape({
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
    const { currentProject, pristine, submitting } = this.props
    const title = this.state.isCreating ? <FormattedMessage id="project.create.title" /> :
      (<FormattedMessage
        id="project.edit.title"
        values={{
          name: currentProject.content.name,
        }}
      />)
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>

            {this.state.isCreating ? (
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="project.form.name" />}
              />
            ) : (
              null
            )}
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="project.form.description" />}
            />
            <Field
              name="icon"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="project.form.icon" />}
            />
            <Field
              name="isPublic"
              component={RenderCheckbox}
              label={<FormattedMessage id="project.form.isPublic" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="project.form.action.submit" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={<FormattedMessage id="project.form.action.cancel" />}
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
  form: 'project-form',
  validate,
})(ProjectFormComponent)

