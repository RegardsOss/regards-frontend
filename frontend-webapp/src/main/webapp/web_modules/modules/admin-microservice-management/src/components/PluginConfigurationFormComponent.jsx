import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, ValidationHelpers, ErrorTypes } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { reduxForm } from 'redux-form'
import { PluginMetaData, PluginConfiguration } from '@regardsoss/model'
import { Toggle } from 'redux-form-material-ui'

/**
 * Display edit and create fragment form
 */
export class PluginConfigurationFormCoponent extends React.Component {

  static propTypes = {
    pluginConfiguration: PluginConfiguration,
    pluginMetaData: PluginMetaData, // optional for additionnal information on form initialization
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.validateProps(props)
    this.state = {
      isCreating: props.pluginConfiguration === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * Perform custom validation on props
   *
   * @param props
   */
  validateProps = (props) => {
    /**
     * If both pluginConfiguration & pluginMetaData props are passed, check that pluginMetaData's pluginId attribute matches
     * pluginConfiguration's pluginId attribute.
     * In other words, we passed the correct PluginMetaData of the PluginConfiguation.
     */
    if (props.pluginConfiguration && props.pluginMetaData) {
      const pluginConfigurationsPluginId = props.pluginConfiguration
      const pluginMetaDatasPluginId = props.pluginMetaData.pluginId
      if (pluginConfigurationsPluginId !== pluginMetaDatasPluginId) {
        throw new Error('pluginConfiguration\'s pluginId attribute should match passed pluginMetaData\'s pluginId attribute in PluginConfigurationFormComponent')
      }
    }
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    const { pluginConfiguration, pluginMetaData } = this.props
    const id = pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.id
    const pluginConfigurationPluginId = pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.pluginId
    const pluginMetaDataPluginId = pluginMetaData && pluginMetaData.content && pluginMetaData.content.pluginId
    const pluginConfigurationPluginClassName = pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.pluginClassName
    const pluginMetaDataPluginClassName = pluginMetaData && pluginMetaData.content && pluginMetaData.content.pluginClassName
    const initialValues = {
      id,
      pluginId: pluginConfigurationPluginId || pluginMetaDataPluginId, // TODO: useless, remove that
      label: pluginConfiguration && pluginConfiguration && pluginConfiguration.label,
      version: pluginConfiguration && pluginConfiguration && pluginConfiguration.version,
      priorityOrder: pluginConfiguration && pluginConfiguration && pluginConfiguration.priorityOrder,
      active: pluginConfiguration && pluginConfiguration && pluginConfiguration.active,
      pluginClassName: pluginConfigurationPluginClassName || pluginMetaDataPluginClassName,
    }

    this.props.initialize(initialValues)
  }

  /**
   * Returns React component
   *
   * @returns {XML}
   */
  render() {
    const { pristine, submitting, invalid } = this.props
    const title = this.state.isCreating ?
      <FormattedMessage id="microservice-management.plugin.configuration.form.create.title"/> :
      (<FormattedMessage
        id="microservice-management.plugin.configuration.form.edit.title"
        values={{
          name: this.props.pluginConfiguration.content.name,
        }}
      />)
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <Field
              disabled
              name="pluginClassName"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="microservice-management.plugin.configuration.form.pluginClassName"/>}
            />
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="microservice-management.plugin.configuration.form.label"/>}
            />
            <Field
              name="version"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="microservice-management.plugin.configuration.form.version"/>}
            />
            <Field
              name="priorityOrder"
              fullWidth
              component={RenderTextField}
              type="number"
              label={<FormattedMessage id="microservice-management.plugin.configuration.form.priorityOrder"/>}
            />
            <Field
              name="active"
              component={Toggle}
              type="boolean"
              label={<FormattedMessage id="microservice-management.plugin.configuration.form.active"/>}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="microservice-management.plugin.configuration.form.action.submit"/>}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={<FormattedMessage
                id="microservice-management.plugin.configuration.form.action.cancel"/>}
              secondaryButtonUrl={this.props.backUrl}
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
function validate(values) { // TODO: validation
  const errors = {}
  if (values.name) {
    if (!ValidationHelpers.isValidAlphaNumericUnderscore(values.name)) {
      errors.name = ErrorTypes.ALPHA_NUMERIC
    }
    if (values.name.length < 3) {
      errors.name = 'invalid.min_3_carac'
    }
    if (values.name.length > 32) {
      errors.name = 'invalid.max_32_carac'
    }
  }
  return errors
}

export default reduxForm({
  form: 'plugin-configuration-form',
  validate,
})(PluginConfigurationFormCoponent)

