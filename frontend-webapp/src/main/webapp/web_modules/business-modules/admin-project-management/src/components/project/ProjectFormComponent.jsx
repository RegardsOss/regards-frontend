/*
 * LICENSE_PLACEHOLDER
 */
import isEmpty from 'lodash/isEmpty'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, RenderCheckbox, ValidationHelpers, ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display edit and create project form
 *
 * @author Sébastien Binda
 */
export class ProjectFormComponent extends React.Component {

  static propTypes = {
    currentProject: AdminShapes.Project,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
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
      isCreating: props.currentProject === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentProject } = this.props
      this.props.initialize({
        description: currentProject.content.description,
        icon: currentProject.content.icon,
        licenceLink: currentProject.content.licenceLink,
        isPublic: currentProject.content.isPublic,
        isAccessible: currentProject.content.isAccessible,
        host: currentProject.content.host,
        label: currentProject.content.label,
        name: currentProject.content.name,
      })
    } else {
      this.props.initialize({
        isPublic: false,
      })
    }
  }

  render() {
    const { currentProject, pristine, submitting, invalid } = this.props
    const title = this.state.isCreating ?
      this.context.intl.formatMessage({ id: 'project.create.title' }) :
      this.context.intl.formatMessage({ id: 'project.edit.title' }, { name: currentProject.content.name })
    const hostFieldStyle = { marginBottom: 15 }
    const validRequiredValidators = [ValidationHelpers.string, ValidationHelpers.required]
    return (
      <form
        className="selenium-projectForm"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={this.state.isCreating}>
              <Field
                name="name"
                validate={validRequiredValidators}
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'project.form.name' })}
              />
            </ShowableAtRender>
            <Field
              name="label"
              validate={validRequiredValidators}
              fullWidth
              component={RenderTextField}
              type="text"
              floatingLabelText={this.context.intl.formatMessage({ id: 'project.form.label' })}
              hintText={this.context.intl.formatMessage({ id: 'project.form.hint.label' })}
            />
            <Field
              name="description"
              fullWidth
              multiLine
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'project.form.description' })}
            />
            <Field
              name="icon"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'project.form.icon' })}
            />
            <Field
              name="licenceLink"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'project.form.license' })}
            />
            <Field
              name="host"
              validate={validRequiredValidators}
              fullWidth
              className="selenium-host"
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'project.form.host' })}
              style={hostFieldStyle}
            />
            <Field
              name="isPublic"
              className="selenium-isPublicCheckbox"
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'project.form.isPublic' })}
            />
            <Field
              name="isAccessible"
              className="selenium-isAccessibleCheckbox"
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'project.form.isAccessible' })}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'project.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'project.form.action.cancel' })}
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
  if (isEmpty(values)) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (!ValidationHelpers.isValidAlphaNumericUnderscore(values.name)) {
    errors.name = ErrorTypes.ALPHA_NUMERIC
  }

  if (!ValidationHelpers.isValidUrl(values.host)) {
    errors.host = ErrorTypes.INVALID_URL
  }
  const urlToValidate = ['icon', 'licenceLink']
  urlToValidate.forEach((field) => {
    // validate only when specified, those fields are optional
    if (values[field] && !ValidationHelpers.isValidUrl(values[field])) {
      errors[field] = ErrorTypes.INVALID_URL
    }
  })
  return errors
}

export default reduxForm({
  form: 'project-form',
  validate,
})(ProjectFormComponent)

