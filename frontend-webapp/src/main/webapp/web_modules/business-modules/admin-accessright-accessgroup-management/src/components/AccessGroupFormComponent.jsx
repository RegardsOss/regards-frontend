/**
 * LICENSE_PLACEHOLDER
 **/
import keys from 'lodash/keys'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { AccessGroup } from '@regardsoss/model'
import { RenderTextField, RenderCheckbox, Field, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to edit/create/duplicate an accessgroup.
 */
export class AccessGroupFormComponent extends React.Component {

  static propTypes = {
    currentAccessGroup: AccessGroup,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isDuplicating: PropTypes.bool,
    isCreating: PropTypes.bool,
    isEditing: PropTypes.bool,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    let title
    if (this.props.isCreating) {
      title = this.context.intl.formatMessage({ id: 'group.create.title' })
    } else if (this.props.isDuplicating) {
      title = this.context.intl.formatMessage({ id: 'group.duplicate.title' }, { name: this.props.currentAccessGroup.content.name })
    } else {
      title = this.context.intl.formatMessage({ id: 'group.edit.title' }, { name: this.props.currentAccessGroup.content.name })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.props.isCreating) {
      const { currentAccessGroup } = this.props
      const initialValues = {
        isPrivate: currentAccessGroup.content.isPrivate,
        name: currentAccessGroup.content.name,
      }
      this.props.initialize(initialValues)
    }
  }


  render() {
    const { submitting, invalid, backUrl } = this.props
    const title = this.getTitle()
    const nameFieldValidations = [ValidationHelpers.required,ValidationHelpers.string, ValidationHelpers.validAlphaNumericUnderscore]
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
              disabled={this.props.isEditing}
              validate={nameFieldValidations}
              label={this.context.intl.formatMessage({ id: 'group.form.name' })}
            />
            <br />
            <br />
            <Field
              name="isPrivate"
              fullWidth
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'group.form.private' })}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'group.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'group.form.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  const errors = {}
  if (!keys(values).length) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (values.name && values.name.length > 32) {
    errors.name = 'invalid.max_32_carac'
  }
  return errors
}

export default reduxForm({
  form: 'accessgroup-form',
  validate,
})(AccessGroupFormComponent)

