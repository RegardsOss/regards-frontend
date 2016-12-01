import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, FormErrorMessage, ErrorTypes, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'

/**
 * Display edit and create project form
 */
export class ProjectUserCreateComponent extends React.Component {

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }


  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={<FormattedMessage id="projectUser.create.title" />}
          />
          <CardText>

            <Field
              name="email"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="projectUser.create.input.email" />}
            />
            <Field
              name="role_id"
              fullWidth
              component={RenderTextField}
              label={<FormattedMessage id="projectUser.create.input.role" />}
            />
            <Field
              name="status"
              fullWidth
              component={RenderTextField}
              label={<FormattedMessage id="projectUser.create.input.status" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="projectUser.create.action.create" />}
              mainButtonType="submit"
              secondaryButtonLabel={<FormattedMessage id="projectUser.create.action.cancel" />}
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
  form: 'user-form',
  validate,
})(ProjectUserCreateComponent)

