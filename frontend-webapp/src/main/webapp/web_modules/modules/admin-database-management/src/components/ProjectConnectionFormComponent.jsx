/*
 * LICENSE_PLACEHOLDER
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { ReduxConnectedForm } from '@regardsoss/redux'
import TextField from 'material-ui/TextField'
import MainActionButtonComponent from '@regardsoss/components/src/cards/MainActionButtonComponent'
import SecondaryActionButtonComponent from '@regardsoss/components/src/cards/SecondaryActionButtonComponent'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import ProjectConnection from '@regardsoss/model/src/admin/ProjectConnection'
import DatabaseConnectionTester from './DatabaseConnectionTester'

/**
 * Reusable {@link ProjectConnection} form for reading, editing, creating.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ProjectConnectionFormComponent extends React.Component {

  static propTypes = {
    projectConnection: ProjectConnection.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    invalid: React.PropTypes.bool,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { projectConnection } = this.props
    projectConnection.content.driverClassName = 'PostgreSQL'
    this.props.initialize({
      userName: projectConnection.content.userName,
      password: projectConnection.content.password,
      driverClassName: projectConnection.content.driverClassName,
      url: projectConnection.content.url,
    })
  }

  render() {
    return (
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="modules/admin-database-management/src/i18n"
      >
        <TextField
          hintText={this.props.projectConnection.content.driverClassName}
          floatingLabelText={<FormattedMessage id="database.form.input.driverClassName" />}
          floatingLabelFixed
          value={this.props.projectConnection.content.driverClassName}
          disabled
          fullWidth
        />
        <Field
          name="url"
          fullWidth
          component={RenderTextField}
          type="text"
          label={<FormattedMessage id="database.form.input.url" />}
        />
        <Field
          name="userName"
          fullWidth
          component={RenderTextField}
          type="text"
          label={<FormattedMessage id="database.form.input.userName" />}
        />
        <Field
          name="password"
          fullWidth
          component={RenderTextField}
          type="password"
          label={<FormattedMessage id="database.form.input.password" />}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <DatabaseConnectionTester projectConnection={this.props.projectConnection} />
          <SecondaryActionButtonComponent
            label={<FormattedMessage id="database.form.action.cancel" />}
            onTouchTap={this.props.onCancel}
          />
          <MainActionButtonComponent
            label={<FormattedMessage id="database.form.action.save" />}
            disabled={this.props.invalid || this.props.submitting}
            type="submit"
          />
        </div>
      </ReduxConnectedForm>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.driverClassName) {
    errors.driverClassName = 'invalid.required'
  }
  if (!ValidationHelpers.isValidUrl(values.url)) {
    errors.url = 'invalid.url'
  }
  if (!values.userName) {
    errors.userName = 'invalid.required'
  }
  if (!values.password) {
    errors.password = 'invalid.required'
  }
  return errors
}

export default reduxForm({
  form: 'project-connection-form',
  destroyOnUnmount: false,
  validate,
})(ProjectConnectionFormComponent)
