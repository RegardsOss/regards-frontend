/*
 * LICENSE_PLACEHOLDER
 */
import keys from 'lodash/keys'
import { FormattedMessage } from 'react-intl'
import Checkbox from 'material-ui/Checkbox'
import { Project } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MainActionButtonComponent from '@regardsoss/components/src/cards/MainActionButtonComponent'
import SecondaryActionButtonComponent from '@regardsoss/components/src/cards/SecondaryActionButtonComponent'
import { RenderTextField, Field, ErrorTypes, reduxForm, FormErrorMessage } from '@regardsoss/form-utils'
import ProjectConnection from '@regardsoss/model/src/admin/ProjectConnection'

/**
 * Reusable {@link ProjectConnection} form for reading, editing, creating.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class ProjectConnectionFormComponent extends React.Component {

  static propTypes = {
    project: Project,
    microservice: PropTypes.string.isRequired,
    projectConnection: ProjectConnection,
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
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
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
    if (projectConnection) {
      this.props.initialize(projectConnection.content)
    } else {
      this.props.initialize({
        microservice: this.props.microservice,
        project: this.props.project.content,
        driverClassName: STATIC_CONFIGURATION.projectConnectionDriver,
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
      const cancelLabel = this.props.isStep ? <FormattedMessage id="database.form.action.previous" /> :
      <FormattedMessage id="database.form.action.cancel" />
      return (<SecondaryActionButtonComponent
        label={cancelLabel}
        onTouchTap={this.props.onCancel}
      />)
    }
    return null
  }

  render() {
    const label = this.props.isStep ? <FormattedMessage id="database.form.action.next" /> :
    <FormattedMessage id="database.form.action.save" />
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
          name="url"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'database.form.input.url' })}
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
    // TODO : <DatabaseConnectionTester projectConnection={this.props.projectConnection}/>
  }
}

function validate(values) {
  const errors = {}
  if (!keys(values).length) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (!values.driverClassName) {
    errors.driverClassName = ErrorTypes.REQUIRED
  }
  if (!values.url) {
    errors.url = ErrorTypes.REQUIRED
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
