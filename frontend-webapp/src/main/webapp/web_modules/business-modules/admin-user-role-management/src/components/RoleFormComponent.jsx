import map from 'lodash/map'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, RenderSelectField, ErrorTypes, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { AdminShapes } from '@regardsoss/shape'

/**
 * Display edit and create project form
 */
export class RoleFormComponent extends React.Component {

  static propTypes = {
    currentRole: AdminShapes.Role,
    roleList: AdminShapes.RoleList,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.currentRole === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentRole } = this.props
      const formValues = {
        name: currentRole.content.name,
      }

      // Not all roles have a parent role
      if (currentRole.content.parentRole) {
        formValues.parentRole = currentRole.content.parentRole.name
      }
      this.props.initialize(formValues)
    } else {
      this.props.initialize({
        parentRole: 'PUBLIC',
      })
    }
  }


  render() {
    const { pristine, submitting, invalid, roleList } = this.props
    const title = this.state.isCreating ?
      this.context.intl.formatMessage({ id: 'role.create.title' }) :
      this.context.intl.formatMessage({ id: 'role.edit.title' }, { name: this.props.currentRole.content.name })
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
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
              disabled={!this.state.isCreating}
              label={this.context.intl.formatMessage({ id: 'role.form.name' })}
            />
            <Field
              name="parentRole"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'role.form.parentRole' })}
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
              mainButtonLabel={this.context.intl.formatMessage({ id: 'role.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'role.form.action.cancel' })}
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
    if (!ValidationHelpers.isValidAlphaNumericUnderscore(values.name)) {
      errors.name = ErrorTypes.ALPHA_NUMERIC
    }
  } else {
    errors.name = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'role-form',
  validate,
})(RoleFormComponent)

