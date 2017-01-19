import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { reduxForm } from 'redux-form'
import { PluginMetaData, PluginConfiguration } from '@regardsoss/model'
import { Toggle } from 'redux-form-material-ui'
import moduleStyles from '../styles/styles'

const styles = moduleStyles()

/**
 * Display edit and create fragment form
 */
export class PluginConfigurationFormComponent extends React.Component {

  static propTypes = {
    pluginConfiguration: PluginConfiguration,
    pluginMetaData: PluginMetaData, // optional for additionnal information on form initialization
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    formMode: React.PropTypes.oneOf(['create', 'edit', 'copy']),
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    formMode: 'create',
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.validateProps(props)
    this.state = {
      isCreating: props.formMode === 'create',
      isEditing: props.formMode === 'edit',
      isCopying: props.formMode === 'copy',
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
      const pluginConfigurationsPluginId = props.pluginConfiguration.content.pluginId
      const pluginMetaDatasPluginId = props.pluginMetaData.content.pluginId
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
    const id = this.state.isEditing ? pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.id : undefined
    const pluginConfigurationPluginId = pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.pluginId
    const pluginMetaDataPluginId = pluginMetaData && pluginMetaData.content && pluginMetaData.content.pluginId
    const pluginConfigurationPluginClassName = pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.pluginClassName
    const pluginMetaDataPluginClassName = pluginMetaData && pluginMetaData.content && pluginMetaData.content.pluginClassName
    const initialValues = {
      id,
      pluginId: pluginConfigurationPluginId || pluginMetaDataPluginId,
      label: pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.label,
      version: pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.version,
      priorityOrder: pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.priorityOrder,
      active: pluginConfiguration && pluginConfiguration.content && pluginConfiguration.content.active,
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
    const { pluginConfiguration, handleSubmit, submitting, invalid, backUrl } = this.props
    const title = this.state.isEditing ?
      (<FormattedMessage
        id="microservice-management.plugin.configuration.form.edit.title"
        values={{
          name: pluginConfiguration.content.name,
        }}
      />) :
      <FormattedMessage id="microservice-management.plugin.configuration.form.create.title"/>
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
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
              style={styles.pluginConfiguration.form.toggle}
              label={<FormattedMessage id="microservice-management.plugin.configuration.form.active"/>}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.state.isEditing ?
                <FormattedMessage id="microservice-management.plugin.configuration.form.action.submit.save"/> :
                <FormattedMessage id="microservice-management.plugin.configuration.form.action.submit.add"/>}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage
                id="microservice-management.plugin.configuration.form.action.cancel"/>}
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
 *
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  const errors = {}
  return errors
}

export default reduxForm({
  form: 'plugin-configuration-form',
  validate,
})(PluginConfigurationFormComponent)

