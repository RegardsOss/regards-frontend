import { map } from 'lodash'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, FormErrorMessage, ErrorTypes, Field, ValidationHelpers, RenderSelectField } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

/**
 * Display edit and create project form
 */
export class ProjectUserCreateComponent extends React.Component {

  static propTypes = {
    roleList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
        }),
      }),
    ),
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
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
  return errors
}

export default reduxForm({
  form: 'user-form',
  validate,
})(ProjectUserCreateComponent)

