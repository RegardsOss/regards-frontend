import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, FormErrorMessage, ErrorTypes, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class ProjectCreateComponent extends React.Component {

  static propTypes = {
    handleCreate: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.handleCreate)}>
        <Card>
          <CardTitle
            title={<FormattedMessage id='project.create.title'/>}
          />
          <CardText>
            <Field
              name="name"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id='projects.table.name.label'/>}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="projects.table.description.label"/>}
            />
            <Field
              name="icon"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id='projects.table.icon.label'/>}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="projects.submit.button"/>}
              mainButtonType='submit'
              secondaryButtonLabel={<FormattedMessage id="projects.cancel.button"/>}
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
  if (!values.username) {
    errors.username = ErrorTypes.REQUIRED
  } else if (!ValidationHelpers.isValidEmail(values.username)) {
    errors.username = ErrorTypes.EMAIL
  }
  if (!values.password) {
    errors.password = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'create-project',
  validate,
})(ProjectCreateComponent)

