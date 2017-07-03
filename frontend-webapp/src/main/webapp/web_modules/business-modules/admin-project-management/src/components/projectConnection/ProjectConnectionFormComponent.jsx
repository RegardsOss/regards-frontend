/*
 * LICENSE_PLACEHOLDER
 */
import keys from 'lodash/keys'
import Checkbox from 'material-ui/Checkbox'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MainActionButtonComponent from '@regardsoss/components/src/cards/MainActionButtonComponent'
import SecondaryActionButtonComponent from '@regardsoss/components/src/cards/SecondaryActionButtonComponent'
import { RenderTextField, Field, ErrorTypes, reduxForm, FormErrorMessage } from '@regardsoss/form-utils'

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
    onNext: PropTypes.func,
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
    if (!this.props.pristine) {
      this.props.onUpdate(this.props.projectConnection.content.id, values)
    } else if (this.props.isStep && this.props.onNext) {
      this.props.onNext()
    }
  }

  createProjectConnection = (values) => {
    this.props.onCreate(values)
  }

  renderCancelButton = () => {
    if (this.props.onCancel) {
      const cancelLabel = this.props.isStep && !this.props.configureOneForAll ?
        this.context.intl.formatMessage({ id: 'database.form.action.previous' }) :
        this.context.intl.formatMessage({ id: 'database.form.action.cancel' })
      return (<SecondaryActionButtonComponent
        label={cancelLabel}
        onTouchTap={this.props.onCancel}
      />)
    }
    return null
  }

  render() {
    const label = this.props.isStep && !this.props.configureOneForAll ?
      this.context.intl.formatMessage({ id: 'database.form.action.next' }) :
      this.context.intl.formatMessage({ id: 'database.form.action.save' })

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
        />
        <Field
          name="address"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.address' })}
        />
        <Field
          name="port"
          fullWidth
          component={RenderTextField}
          type="number"
          label={this.context.intl.formatMessage({ id: 'database.form.input.port' })}
        />
        <Field
          name="db_name"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.db_name' })}
        />
        <Field
          name="userName"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.userName' })}
        />
        <Field
          name="password"
          fullWidth
          component={RenderTextField}
          type="password"
          label={this.context.intl.formatMessage({ id: 'database.form.input.password' })}
        />
        <Checkbox
          label={this.context.intl.formatMessage({ id: 'database.form.input.cange.configuration.mode' })}
          checked={this.state.configureOneForAll}
          onCheck={this.onChangeConfigurationMode}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <SecondaryActionButtonComponent
            label={this.context.intl.formatMessage({ id: 'database.form.reset' })}
            onTouchTap={this.handleInitialize}
          />
          {this.renderCancelButton()}
          <MainActionButtonComponent
            label={label}
            disabled={this.props.invalid || (this.props.isStep && this.props.submitting)}
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
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (!values.driverClassName) {
    errors.driverClassName = ErrorTypes.REQUIRED
  }
  if (!values.address) {
    errors.address = ErrorTypes.REQUIRED
  }
  if (!values.port) {
    errors.port = ErrorTypes.REQUIRED
  } else if (isNaN(values.port)) {
    errors.port = ErrorTypes.NUMERIC
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
