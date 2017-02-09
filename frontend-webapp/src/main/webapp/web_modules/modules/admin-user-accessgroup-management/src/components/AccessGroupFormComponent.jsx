/**
 * LICENSE_PLACEHOLDER
 **/
import { keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { AccessGroup } from '@regardsoss/model'
import { RenderTextField, RenderCheckbox, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'


/**
 * React component to edit/create/duplicate an accessgroup.
 */
export class AccessGroupFormComponent extends React.Component {

  static propTypes = {
    currentAccessGroup: AccessGroup,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    isDuplicating: React.PropTypes.bool,
    isCreating: React.PropTypes.bool,
    isEditing: React.PropTypes.bool,
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
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
      title = <FormattedMessage id="group.create.title" />
    } else if (this.props.isDuplicating) {
      title = (<FormattedMessage
        id="group.duplicate.title"
        values={{
          name: this.props.currentAccessGroup.content.name,
        }}
      />)
    } else {
      title = (<FormattedMessage
        id="group.edit.title"
        values={{
          name: this.props.currentAccessGroup.content.name,
        }}
      />)
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
    return (
      <ReduxConnectedForm
        i18nMessagesDir="modules/admin-user-accessgroup-management/src/i18n"
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
              validate={[ValidationHelpers.validRequiredString, ValidationHelpers.validAlphaNumericUnderscore]}
              label={<FormattedMessage id="group.form.name" />}
            />
            <br />
            <br />
            <Field
              name="isPrivate"
              fullWidth
              component={RenderCheckbox}
              label={<FormattedMessage id="group.form.private" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="group.form.action.save" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="group.form.action.cancel" />}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </ReduxConnectedForm>
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

