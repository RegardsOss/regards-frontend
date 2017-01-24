import { map } from 'lodash'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, ErrorTypes, Field, ValidationHelpers, RenderSelectField } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { Role } from '@regardsoss/model'
import MenuItem from 'material-ui/MenuItem'

/**
 * Display edit and create project form
 */
export class ProjectUserCreateComponent extends React.Component {

  static propTypes = {
    roleList: React.PropTypes.objectOf(Role),
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
  }


  render() {
    const { pristine, submitting, roleList } = this.props
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
              name="firstName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="projectUser.create.input.firstName" />}
            />
            <Field
              name="lastName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="projectUser.create.input.lastName" />}
            />
            <Field
              name="password"
              fullWidth
              component={RenderTextField}
              type="password"
              label={<FormattedMessage id="projectUser.create.input.password" />}
            />
            <Field
              name="roleName"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="projectUser.create.input.role" />}
            >
              {map(roleList, (role, id) => (
                <MenuItem
                  value={role.content.name}
                  key={id}
                  primaryText={role.content.name}
                />
              ))}
            </Field>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="projectUser.create.action.create" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
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
  if (values.email) {
    if (!ValidationHelpers.isValidEmail(values.email)) {
      errors.email = ErrorTypes.EMAIL
    }
  } else {
    errors.email = ErrorTypes.REQUIRED
  }
  if (!values.firstName) {
    errors.firstName = ErrorTypes.REQUIRED
  }
  if (!values.lastName) {
    errors.lastName = ErrorTypes.REQUIRED
  }
  if (!values.password) {
    errors.password = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'user-form',
  validate,
})(ProjectUserCreateComponent)

