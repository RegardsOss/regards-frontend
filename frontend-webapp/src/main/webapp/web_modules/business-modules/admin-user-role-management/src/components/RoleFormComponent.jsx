import map from 'lodash/map'
import forEach from 'lodash/forEach'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
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
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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

