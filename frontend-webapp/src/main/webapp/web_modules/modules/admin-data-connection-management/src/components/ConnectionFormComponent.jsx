/**
 * LICENSE_PLACEHOLDER
 **/
import { map, forEach, keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Connection, Model, ModelAttribute, PluginMetaData } from '@regardsoss/model'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field, ErrorTypes, ValidationHelpers } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'

/**
 * React component to list connections.
 */
export class ConnectionFormComponent extends React.Component {

  static propTypes = {
    currentConnection: Connection,
    pluginMetaDataList: React.PropTypes.objectOf(PluginMetaData),
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    isCreating: React.PropTypes.bool.isRequired,
    isEditing: React.PropTypes.bool.isRequired,
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
      title = <FormattedMessage id="connection.create.title" />
    } else {
      title = (<FormattedMessage
        id="connection.edit.title"
        values={{
          name: this.props.currentConnection.content.label,
        }}
      />)
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    let initialValues = {}
    if (this.props.isEditing) {
      const { currentConnection } = this.props
      initialValues = {
        label: currentConnection.content.label,
        version: currentConnection.content.version,
        priorityOrder: currentConnection.content.priorityOrder,
        isActive: currentConnection.content.active,
        pluginClassName: currentConnection.content.pluginClassName,
      }
      forEach(currentConnection.content.parameters, (parameter) => {
        switch (parameter.name) {
          case 'user':
            initialValues.user = parameter.value
            break
          case 'password':
            initialValues.password = parameter.value
            break
          case 'dbHost':
            initialValues.dbHost = parameter.value
            break
          case 'dbPort':
            initialValues.dbPort = parameter.value
            break
          case 'dbName':
            initialValues.dbName = parameter.value
            break
          case 'maxPoolSize':
            initialValues.maxPoolSize = parameter.value
            break
          case 'minPoolSize':
            initialValues.minPoolSize = parameter.value
            break
        }
      })
    } else {
      initialValues = {
        minPoolSize: 1,
        maxPoolSize: 10,
        isActive: true,
        priorityOrder: 0,
        driver: 'org.postgresql.Driver',
      }
    }
    this.props.initialize(initialValues)
  }


  render() {
    const { pluginMetaDataList, submitting, invalid, backUrl } = this.props
    const title = this.getTitle()
    return (
      <ReduxConnectedForm
        i18nMessagesDir="modules/admin-data-connection-management/src/i18n"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={<FormattedMessage id="connection.form.subtitle" />}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="connection.form.label" />}
              validate={[ValidationHelpers.validRequiredString]}
            />
            <Field
              name="pluginClassName"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="connection.form.pluginClassName" />}
              validate={[ValidationHelpers.validRequiredString]}
            >
              {map(pluginMetaDataList, (pluginMetaData, id) => (
                <MenuItem
                  value={pluginMetaData.content.pluginClassName}
                  key={id}
                  primaryText={pluginMetaData.content.pluginId}
                />
              ))}
            </Field>
            <Field
              name="user"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="connection.form.user" />}
              validate={[ValidationHelpers.validRequiredString]}
            />
            <Field
              name="password"
              fullWidth
              component={RenderTextField}
              type="password"
              label={<FormattedMessage id="connection.form.password" />}
              validate={[ValidationHelpers.validRequiredString]}
            />
            <Field
              name="dbHost"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="connection.form.dbHost" />}
              validate={[ValidationHelpers.validRequiredString]}
            />
            <Field
              name="dbPort"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="connection.form.dbPort" />}
              validate={[ValidationHelpers.validRequiredNumber]}
            />
            <Field
              name="dbName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="connection.form.dbName" />}
              validate={[ValidationHelpers.validRequiredString]}
            />
            <Field
              name="minPoolSize"
              fullWidth
              component={RenderTextField}
              type="number"
              label={<FormattedMessage id="connection.form.minPoolSize" />}
              validate={[ValidationHelpers.validRequiredNumber]}
            />
            <Field
              name="maxPoolSize"
              fullWidth
              component={RenderTextField}
              type="number"
              label={<FormattedMessage id="connection.form.maxPoolSize" />}
              validate={[ValidationHelpers.validRequiredNumber]}
            />
            <Field
              name="version"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="connection.form.version" />}
              validate={[ValidationHelpers.validRequiredString]}
            />
            <Field
              name="priorityOrder"
              fullWidth
              component={RenderTextField}
              type="number"
              label={<FormattedMessage id="connection.form.priorityOrder" />}
              validate={[ValidationHelpers.validRequiredNumber]}
            />
            <br />
            <br />
            <Field
              name="isActive"
              fullWidth
              component={RenderCheckbox}
              label={<FormattedMessage id="connection.form.isActive" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="connection.form.action.save" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="connection.form.action.cancel" />}
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
  return errors
}

export default reduxForm({
  form: 'connection-form',
  validate,
})(ConnectionFormComponent)

