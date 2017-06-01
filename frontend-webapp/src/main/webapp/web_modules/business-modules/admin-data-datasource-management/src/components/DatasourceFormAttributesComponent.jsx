/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import keys from 'lodash/keys'
import isNil from 'lodash/isNil'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { reduxForm } from 'redux-form'
import { Datasource, Model, Connection, PluginMetaData } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import DatasourceStepperComponent from './DatasourceStepperComponent'

/**
 * React component to edit datasources attributes.
 */
export class DatasourceFormAttributesComponent extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    currentConnection: Connection,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    modelList: PropTypes.objectOf(Model),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
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

  constructor(props) {
    super(props)
    const isCreating = isNil(props.currentDatasource)
    this.state = {
      isCreating,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    if (this.state.isCreating) {
      return this.context.intl.formatMessage({ id: 'datasource.create.title' })
    }
    return this.context.intl.formatMessage({ id: 'datasource.edit.title' }, { name: this.props.currentDatasource.content.label })
  }


  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentDatasource } = this.props
      const initialValues = {
        label: currentDatasource.content.label,
        model: currentDatasource.content.mapping.model,
        pluginClassName: currentDatasource.content.pluginClassName,
      }
      this.props.initialize(initialValues)
    }
  }

  render() {
    const { currentConnection, modelList, pluginMetaDataList, submitting, invalid, backUrl } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'datasource.form.subtitle' })}
          />
          <DatasourceStepperComponent stepIndex={1} />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'datasource.form.label' })}
            />
            <SelectField
              floatingLabelText={this.context.intl.formatMessage({ id: 'datasource.form.connection' })}
              fullWidth
              value={currentConnection.content.id}
              disabled
            >
              <MenuItem
                value={currentConnection.content.id}
                primaryText={currentConnection.content.label}
              />
            </SelectField>
            <Field
              name="model"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'datasource.form.model' })}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  value={model.content.id}
                  key={id}
                  primaryText={model.content.name}
                />
              ))}
            </Field>
            <Field
              name="pluginClassName"
              fullWidth
              component={RenderSelectField}
              label={this.context.intl.formatMessage({ id: 'datasource.form.pluginConfiguration' })}
            >
              {map(pluginMetaDataList, (pluginMetaData, id) => (
                <MenuItem
                  value={pluginMetaData.content.pluginClassName}
                  key={id}
                  primaryText={`${pluginMetaData.content.pluginId}: ${pluginMetaData.content.version}`}
                />
              ))}
            </Field>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.action.cancel' })}
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
  if (values.label) {
    if (values.label.length > 128) {
      errors.label = 'invalid.max_128_carac'
    }
  } else {
    errors.label = ErrorTypes.REQUIRED
  }
  if (!values.model) {
    errors.model = ErrorTypes.REQUIRED
  }
  if (!values.pluginClassName) {
    errors.pluginClassName = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'datasource-form',
  validate,
})(DatasourceFormAttributesComponent)

