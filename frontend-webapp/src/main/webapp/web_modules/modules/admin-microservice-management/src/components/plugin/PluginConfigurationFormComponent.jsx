/**
 * LICENSE_PLACEHOLDER
 **/
import { reduxForm } from 'redux-form'
import { Toggle } from 'redux-form-material-ui'
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { PluginMetaData, PluginMetaDataList, PluginConfiguration, PluginConfigurationList } from '@regardsoss/model'
import PluginParameterListComponent from './parameter/PluginParameterListComponent'
import { buildEmptyParameterList } from '../../model/plugin/utils'
import moduleStyles from '../../styles/styles'

const { validRequiredString, validRequiredNumber } = ValidationHelpers
const styles = moduleStyles()

/**
 * Display edit and create fragment form
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormComponent extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microserviceName: React.PropTypes.string,
      pluginId: React.PropTypes.string,
      pluginConfigurationId: React.PropTypes.string,
      formMode: React.PropTypes.oneOf(['create', 'edit', 'copy']),
    }),
    currentPluginConfiguration: PluginConfiguration,
    currentPluginMetaData: PluginMetaData,
    pluginMetaDataList: PluginMetaDataList,
    pluginConfigurationList: PluginConfigurationList,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    formMode: React.PropTypes.oneOf(['create', 'edit', 'copy']),
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
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

    const title = this.state.isEditing ?
      (<FormattedMessage
        id="microservice-management.plugin.configuration.form.edit.title"
        values={{
          name: currentPluginConfiguration.content.name,
        }}
      />) :
      <FormattedMessage id="microservice-management.plugin.configuration.form.create.title" />

    return (
      <ReduxConnectedForm
        onSubmit={handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="modules/admin-microservice-management/src/i18n"
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
                label={<FormattedMessage id="microservice-management.plugin.configuration.form.pluginClassName" />}
              />
              <Field
                name="label"
                fullWidth
                component={RenderTextField}
                type="text"
                validate={validRequiredString}
                label={<FormattedMessage id="microservice-management.plugin.configuration.form.label" />}
              />
              <Field
                name="version"
                fullWidth
                component={RenderTextField}
                type="text"
                validate={validRequiredString}
                label={<FormattedMessage id="microservice-management.plugin.configuration.form.version" />}
              />
              <Field
                name="priorityOrder"
                fullWidth
                component={RenderTextField}
                type="number"
                parse={val => parseFloat(val)}
                validate={validRequiredNumber}
                label={<FormattedMessage id="microservice-management.plugin.configuration.form.priorityOrder" />}
              />
              <Field
                name="active"
                component={Toggle}
                type="boolean"
                style={styles.pluginConfiguration.form.toggle}
                label={<FormattedMessage id="microservice-management.plugin.configuration.form.active" />}
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
      </ReduxConnectedForm>
    )
  }
}

export default reduxForm({
  form: 'plugin-configuration-form',
})(PluginConfigurationFormComponent)

