/*
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import trim from 'lodash/trim'
import root from 'window-or-global'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, RenderCheckbox, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

const {
  string, url, validStringSize, required, validAlphaNumericUnderscore,
} = ValidationHelpers
const requiredStringValidator = [required, string]
const requiredUrlValidator = [required, url, validStringSize(1, 255)]
const nameValidator = [validAlphaNumericUnderscore, ...requiredStringValidator]
const validUrlSize255 = [url, validStringSize(0, 255)]


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
      const currentURL = `${root.location.protocol}//${root.location.host}`
      this.props.initialize({
        isPublic: false,
        host: currentURL,
      })
    }
  }

  render() {
    const {
      currentProject, pristine, submitting, invalid,
    } = this.props
    const title = this.state.isCreating ?
      this.context.intl.formatMessage({ id: 'project.create.title' }) :
      this.context.intl.formatMessage({ id: 'project.edit.title' }, { name: currentProject.content.name })
    const hostFieldStyle = { marginBottom: 15 }

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
                validate={nameValidator}
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'project.form.name' })}
                normalize={trim}
              />
            </ShowableAtRender>
            <Field
              name="label"
              validate={requiredStringValidator}
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
              validate={validUrlSize255}
              normalize={trim}
            />
            <Field
              name="licenceLink"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'project.form.license' })}
              validate={validUrlSize255}
              normalize={trim}
            />
            <Field
              name="host"
              validate={requiredUrlValidator}
              fullWidth
              className="selenium-host"
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'project.form.host' })}
              style={hostFieldStyle}
              normalize={trim}
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

export default reduxForm({
  form: 'project-form',
})(ProjectFormComponent)

