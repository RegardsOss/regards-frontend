/*
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import trim from 'lodash/trim'
import Checkbox from 'material-ui/Checkbox'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { MainActionButtonComponent, SecondaryActionButtonComponent, FormErrorMessage } from '@regardsoss/components'
import {
  RenderTextField, Field, ErrorTypes, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'

const { required, intNumber } = ValidationHelpers
const requiredIntNumber = [required, intNumber]

/**
 * Reusable {@link ProjectConnection} form for reading, editing, creating.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class ProjectConnectionFormComponent extends React.Component {
  static propTypes = {
    project: AdminShapes.Project,
    microservice: PropTypes.string.isRequired,
    projectConnection: AdminShapes.ProjectConnection,
    configureOneForAll: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    onUpdate: PropTypes.func,
    onCreate: PropTypes.func,
    onCancel: PropTypes.func,
    onChangeConfigurationMode: PropTypes.func,
    // This props allow to define if the current form is displayed in a stepper
    // or as a single form
    isStep: PropTypes.bool,
    // from reduxForm
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    configureOneForAll: this.props.configureOneForAll,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  onChangeConfigurationMode = () => {
    this.setState({
      configureOneForAll: !this.state.configureOneForAll,
    })
    this.props.onChangeConfigurationMode()
  }

  /**
   * Initialize form with given connection if any (edition mode).
   * Or initialize with a new one (creating mode).
   */
  handleInitialize = () => {
    const { projectConnection } = this.props
    if (projectConnection && projectConnection.content) {
      if (projectConnection.content.url) {
        const urlParts = projectConnection.content.url.match(/.*:\/\/(.*):([0-9]*)\/(.*)/)
        const address = urlParts && urlParts[1] ? urlParts[1] : ''
        const port = urlParts && urlParts[2] ? urlParts[2] : ''
        const dbName = urlParts && urlParts[3] ? urlParts[3] : ''
        const initializationValues = {
          id: projectConnection.content.id,
          microservice: projectConnection.content.microservice,
          project: projectConnection.content.project,
          driverClassName: projectConnection.content.driverClassName,
          address,
          port,
          db_name: dbName,
          userName: projectConnection.content.userName,
          password: projectConnection.content.password,
        }
        this.props.initialize(initializationValues)
      }
    } else {
      this.props.initialize({
        microservice: this.props.microservice,
        project: this.props.project.content,
        driverClassName: STATIC_CONF.projectConnectionDriver,
      })
    }
  }

  updateProjectConnection = (values) => {
    this.props.onUpdate(this.props.projectConnection.content.id, values)
  }

  createProjectConnection = (values) => {
    this.props.onCreate(values)
  }

  renderCancelButton = () => {
    if (this.props.onCancel) {
      const cancelLabel = this.props.isStep && !this.props.configureOneForAll
        ? this.context.intl.formatMessage({ id: 'database.form.action.previous' })
        : this.context.intl.formatMessage({ id: 'database.form.action.cancel' })
      return (<SecondaryActionButtonComponent
        label={cancelLabel}
        onClick={this.props.onCancel}
      />)
    }
    return null
  }

  render() {
    const label = this.props.isStep && !this.props.configureOneForAll
      ? this.context.intl.formatMessage({ id: 'database.form.action.next' })
      : this.context.intl.formatMessage({ id: 'database.form.action.save' })

    const submitAction = this.props.projectConnection && !this.props.configureOneForAll ? this.updateProjectConnection : this.createProjectConnection
    return (
      <form
        className="selenium-projectConnectionForm"
        onSubmit={this.props.handleSubmit(submitAction)}
      >
        <FormErrorMessage>
          {this.props.errorMessage ? this.context.intl.formatMessage({ id: this.props.errorMessage }) : null}
        </FormErrorMessage>
        <Field
          name="driverClassName"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.driverClassName' })}
          disabled
          validate={required}
        />
        <Field
          name="address"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.address' })}
          validate={required}
          normalize={trim}
        />
        <Field
          name="port"
          fullWidth
          component={RenderTextField}
          type="string"
          label={this.context.intl.formatMessage({ id: 'database.form.input.port' })}
          validate={requiredIntNumber}
          normalize={trim}
        />
        <Field
          name="db_name"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.db_name' })}
          validate={required}
          normalize={trim}
        />
        <Field
          name="userName"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.userName' })}
          validate={required}
          normalize={trim}
        />
        <Field
          name="password"
          fullWidth
          component={RenderTextField}
          type="password"
          label={this.context.intl.formatMessage({ id: 'database.form.input.password' })}
          validate={required}
          normalize={trim}
        />
        <Checkbox
          label={this.context.intl.formatMessage({ id: 'database.form.input.cange.configuration.mode' })}
          checked={this.state.configureOneForAll}
          onCheck={this.onChangeConfigurationMode}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <SecondaryActionButtonComponent
            label={this.context.intl.formatMessage({ id: 'database.form.reset' })}
            onClick={this.handleInitialize}
          />
          {this.renderCancelButton()}
          <MainActionButtonComponent
            label={label}
            disabled={this.props.invalid || this.props.pristine || (this.props.isStep && this.props.submitting)}
            type="submit"
          />
        </div>
      </form>
    )
  }
}

function

validate(values) {
  const errors = {}
  if (!keys(values).length) {
    // Workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (!values.driverClassName) {
    errors.driverClassName = ErrorTypes.REQUIRED
  }
  if (!values.address) {
    errors.address = ErrorTypes.REQUIRED
  }
  if (!values.db_name) {
    errors.db_name = ErrorTypes.REQUIRED
  }
  if (!values.userName) {
    errors.userName = ErrorTypes.REQUIRED
  }
  if (!values.password) {
    errors.password = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'project-connection-form',
  destroyOnUnmount: false,
  validate,
})(ProjectConnectionFormComponent)
