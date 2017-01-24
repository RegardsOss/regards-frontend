import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, RenderCheckbox, RenderSelectField, EnumInputsComponent, EnumInputsHelper, ErrorTypes, ValidationHelpers } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { Role } from '@regardsoss/model'
import MenuItem from 'material-ui/MenuItem'
import { map, forEach } from 'lodash'

/**
 * Display edit and create project form
 */
export class RoleFormComponent extends React.Component {

  static propTypes = {
    currentRole: Role,
    roleList: React.PropTypes.objectOf(Role),
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    change: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.currentRole === undefined,
      nbInitialAuthorizedAddressesFields: props.currentRole === undefined ? 0 : props.currentRole.content.authorizedAddresses.length,
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
        isCorsRequestsAuthorized: currentRole.content.isCorsRequestsAuthorized,
      }

      // Not all roles have a parent role
      if (currentRole.content.parentRole) {
        formValues.parentRole = currentRole.content.parentRole.name
      }
      formValues = EnumInputsHelper.apiResultIntoFormValues(formValues, currentRole.content.authorizedAddresses, 'authorizedAddresses')
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
            <Field
              name="isCorsRequestsAuthorized"
              component={RenderCheckbox}
              label={<FormattedMessage id="role.form.isCorsRequestsAuthorized" />}
            />
          </CardText>
          <CardText>
            <FormattedMessage id="role.form.authorizedAdresses" />
            <EnumInputsComponent
              change={change}
              inputName="authorizedAddresses"
              nbIntialFields={this.state.nbInitialAuthorizedAddressesFields}
            />
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
  if (values.enumform && values.enumform.authorizedAddresses && values.enumform.authorizedAddresses.inputs) {
    forEach(values.enumform.authorizedAddresses.inputs, (val, key) => {
      // Ignore empty values
      if (val.length > 0 && !ValidationHelpers.isValidIP(val)) {
        // init the resulting errors if it does not exist yet
        if (!errors.enumform) {
          errors.enumform = {}
          errors.enumform.authorizedAddresses = {}
          errors.enumform.authorizedAddresses.inputs = {}
        }
        errors.enumform.authorizedAddresses.inputs[key] = ErrorTypes.INVALID_IP
      }
    })
  }
  return errors
}

export default reduxForm({
  form: 'role-form',
  validate,
})(RoleFormComponent)

