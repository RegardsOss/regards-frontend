/*
 * LICENSE_PLACEHOLDER
 */
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, RenderCheckbox, ValidationHelpers, ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { Project } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display edit and create project form
 *
 * @author Sébastien Binda
 */
export class ProjectFormComponent extends React.Component {

  static propTypes = {
    currentProject: Project,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
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
        license: currentProject.content.license,
        isPublic: currentProject.content.isPublic,
        isAccessible: currentProject.content.isAccessible,
      })
    } else {
      this.props.initialize({
        isPublic: false,
      })
    }
  }

  render() {
    const { currentProject, pristine, submitting } = this.props
    const title = this.state.isCreating ? <FormattedMessage id="project.create.title" /> :
      (<FormattedMessage
        id="project.edit.title"
        values={{
          name: currentProject.content.name,
        }}
      />)
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
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'project.form.name' })}
              />
            </ShowableAtRender>
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
              name="license"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'project.form.license' })}
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
              isMainButtonDisabled={pristine || submitting}
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
  if (values.name) {
    if (!ValidationHelpers.isValidAlphaNumericUnderscore(values.name)) {
      errors.name = ErrorTypes.ALPHA_NUMERIC
    }
  }
  const urlToValidate = ['icon', 'license']
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

