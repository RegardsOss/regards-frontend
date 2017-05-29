/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, RenderToggle, Field, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { PluginMetaData, PluginConfiguration } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import PluginParameterListComponent from './parameter/PluginParameterListComponent'
import { buildEmptyParameterList } from '../../model/plugin/utils'
import moduleStyles from '../../styles/styles'

const { validRequiredString, validRequiredNumber } = ValidationHelpers

/**
 * Display edit and create fragment form
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormComponent extends React.Component {

  static propTypes = {
    currentPluginConfiguration: PluginConfiguration,
    currentPluginMetaData: PluginMetaData,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  static defaultProps = {
    formMode: 'create',
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
    const { formMode, currentPluginMetaData, currentPluginConfiguration } = this.props
    let initialValues

    switch (formMode) {
      case 'edit':
        initialValues = Object.assign({}, currentPluginConfiguration.content)
        break
      case 'create':
        initialValues = {
          pluginId: currentPluginMetaData && currentPluginMetaData.content.pluginId,
          pluginClassName: currentPluginMetaData && currentPluginMetaData.content.pluginClassName,
          parameters: currentPluginMetaData && buildEmptyParameterList(currentPluginMetaData.content.parameters),
        }
        break
      case 'copy':
        initialValues = Object.assign({}, currentPluginConfiguration && currentPluginConfiguration.content)
        initialValues.id = undefined
        break
      default:
        break
    }

    this.props.initialize(initialValues)
  }

  /**
   * Returns React component
   *
   * @returns {XML}
   */
  render() {
    const { currentPluginMetaData, currentPluginConfiguration, handleSubmit, submitting, invalid, backUrl, formMode, change } = this.props

    const styles = moduleStyles(this.context.muiTheme)

    const title = this.state.isEditing ?
      (<FormattedMessage
        id="microservice-management.plugin.configuration.form.edit.title"
        values={{
          name: currentPluginConfiguration.content.name,
        }}
      />) :
      <FormattedMessage id="microservice-management.plugin.configuration.form.create.title" />

    return (
      <form
        onSubmit={handleSubmit(this.props.onSubmit)}
      >
        <div>
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
                validate={validRequiredString}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.pluginClassName' })}
              />
              <Field
                name="label"
                fullWidth
                component={RenderTextField}
                type="text"
                validate={validRequiredString}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.label' })}
              />
              <Field
                name="version"
                fullWidth
                component={RenderTextField}
                type="text"
                validate={validRequiredString}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.version' })}
              />
              <Field
                name="priorityOrder"
                fullWidth
                component={RenderTextField}
                type="number"
                parse={val => parseFloat(val)}
                validate={validRequiredNumber}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.priorityOrder' })}
              />
              <Field
                name="active"
                component={RenderToggle}
                type="boolean"
                style={styles.pluginConfiguration.form.toggle}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.active' })}
              />
            </CardText>
          </Card>

          <PluginParameterListComponent
            formMode={formMode}
            pluginConfiguration={currentPluginConfiguration}
            pluginMetaData={currentPluginMetaData}
            change={change}
          />

          <Card style={styles.pluginConfiguration.form.section}>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={this.state.isEditing ?
                  <FormattedMessage id="microservice-management.plugin.configuration.form.action.submit.save" /> :
                  <FormattedMessage id="microservice-management.plugin.configuration.form.action.submit.add" />}
                mainButtonType="submit"
                isMainButtonDisabled={submitting || invalid}
                secondaryButtonLabel={<FormattedMessage
                  id="microservice-management.plugin.configuration.form.action.cancel"
                />}
                secondaryButtonUrl={backUrl}
              />
            </CardActions>
          </Card>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'plugin-configuration-form',
})(PluginConfigurationFormComponent)

