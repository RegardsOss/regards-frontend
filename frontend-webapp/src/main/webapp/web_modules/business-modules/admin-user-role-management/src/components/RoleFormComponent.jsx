import map from 'lodash/map'
import forEach from 'lodash/forEach'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, RenderSelectField, EnumInputsComponent, EnumInputsHelper, ErrorTypes, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { Role } from '@regardsoss/model'

/**
 * Display edit and create project form
 */
export class RoleFormComponent extends React.Component {

  static propTypes = {
    currentRole: Role,
    roleList: PropTypes.objectOf(Role),
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
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
      let formValues = {
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
    const { pristine, submitting, invalid, change, roleList } = this.props
    const title = this.state.isCreating ? <FormattedMessage id="role.create.title" /> :
      (<FormattedMessage
        id="role.edit.title"
        values={{
          name: this.props.currentRole.content.name,
        }}
      />)
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
              label={<FormattedMessage id="role.form.name" />}
              disabled={!this.state.isCreating}
            />
            <Field
              name="parentRole"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="role.form.parentRole" />}
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
              mainButtonLabel={<FormattedMessage id="role.form.action.submit" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="role.form.action.cancel" />}
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

