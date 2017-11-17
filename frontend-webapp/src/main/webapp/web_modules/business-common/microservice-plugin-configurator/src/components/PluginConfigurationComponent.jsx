import get from 'lodash/get'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { RenderTextField, RenderDoubleLabelToggle, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { CommonShapes } from '@regardsoss/shape'
import GenericPluginParameter from './parameters/GenericPluginParameter'
import moduleStyles from '../styles/styles'
import messages from '../i18n'
import PluginUtils from './utils'

const { string, number, required } = ValidationHelpers
const requiredStringValidator = [string, required]
const requiredNumberValidator = [number, required]

export class PluginConfigurationComponent extends React.Component {

  static propTypes = {
    microserviceName: PropTypes.string.isRequired, // Name of the microservice of the plugin
    pluginMetaData: CommonShapes.PluginMetaDataContent.isRequired, // PluginMetadata used to configure new plugin configuration
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']), // Form mode
    reduxFormChange: PropTypes.func.isRequired, // Redux change function to dynamically change values
    pluginConfiguration: CommonShapes.PluginConfigurationContent, // Default plugin configuration to edit
    displayTitle: PropTypes.bool, // Use this parameter to show/hide the card title of plugin configuration form
    hideGlobalParameterConf: PropTypes.bool, // Use this parameter to hide the global configuration of plugins
    newPluginConfLabel: PropTypes.string, // use this parameter to force automatic generation of plugin configuration label
    fieldNamePrefix: PropTypes.string, // Use this parameter to define the redux form fields predix for pluginConfiguration field names
  }

  static defaultProps = {
    hideGlobalParameterConf: false,
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
    if (!props.pluginMetaData) {
      throw new Error('Undefined plugin to configure!')
    }
    if ((this.state.isEditing || this.state.isCopying) && (!props.pluginConfiguration)) {
      throw new Error('No pluginConfiguration to edit or copy !')
    }
  }

  componentDidMount() {
    if (!this.props.pluginConfiguration) {
      // Init new conf
      this.props.reduxFormChange(this.getFormFieldName('pluginClassName'), this.props.pluginMetaData.pluginClassName)
      this.props.reduxFormChange(this.getFormFieldName('pluginId'), this.props.pluginMetaData.pluginId)
      this.props.reduxFormChange(this.getFormFieldName('version'), this.props.pluginMetaData.version)
      this.props.reduxFormChange(this.getFormFieldName('priorityOrder'), 0)
      this.props.reduxFormChange(this.getFormFieldName('active'), true)
      if (this.props.newPluginConfLabel) {
        const date = new Date().getTime()
        this.props.reduxFormChange(this.getFormFieldName('label'), `${this.props.newPluginConfLabel}-${date}`)
      }
    }
  }

  getFormFieldName = (name) => {
    if (this.props.fieldNamePrefix) {
      return `${this.props.fieldNamePrefix}.${name}`
    }
    return name
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
     * In other words, we passed the correct PluginMetaData of the PluginConfiguration.
     */
    if (props.pluginConfiguration && props.pluginMetaData) {
      const pluginConfigurationsPluginId = props.pluginConfiguration.pluginId
      const pluginMetaDatasPluginId = props.pluginMetaData.pluginId
      if (pluginConfigurationsPluginId !== pluginMetaDatasPluginId) {
        throw new Error('pluginConfiguration\'s pluginId attribute should match passed pluginMetaData\'s pluginId attribute in PluginConfigurationFormComponent')
      }
    }
  }

  /**
   * Render loaded icon see loadIcon method
   * @returns {*}
   */
  renderIcon = () => {
    const { pluginConfiguration } = this.props
    const { loadedIcon } = this.state
    if (loadedIcon) {
      return <img src={loadedIcon} alt="" width="75" height="75" />
    } else if (get(pluginConfiguration, 'iconUrl', null)) {
      return <img src={pluginConfiguration.iconUrl} alt="" width="75" height="75" />
    }
    return null
  }

  renderGlobalConf = (styles) => {
    const { hideGlobalParameterConf, pluginConfiguration, displayTitle } = this.props

    if (hideGlobalParameterConf) {
      return null
    }

    const title = this.state.isEditing ?
      this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.edit.title' }, { name: pluginConfiguration.name }) :
      this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.create.title' })
    return (
      <Card>
        {displayTitle ?
          <CardTitle title={title} /> : null
        }
        <CardText>
          <div>
            {this.renderIcon()}
          </div>
          <Field
            disabled
            name={this.getFormFieldName('pluginClassName')}
            fullWidth
            component={RenderTextField}
            type="text"
            validate={requiredStringValidator}
            label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.pluginClassName' })}
          />
          <Field
            name={this.getFormFieldName('label')}
            fullWidth
            component={RenderTextField}
            type="text"
            validate={requiredStringValidator}
            label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.label' })}
          />
          <Field
            name={this.getFormFieldName('version')}
            fullWidth
            component={RenderTextField}
            type="text"
            validate={requiredStringValidator}
            label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.version' })}
          />
          <Field
            name={this.getFormFieldName('priorityOrder')}
            fullWidth
            component={RenderTextField}
            type="number"
            parse={parseFloat}
            validate={requiredNumberValidator}
            label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.priorityOrder' })}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Field
              name={this.getFormFieldName('iconUrl')}
              component={RenderTextField}
              fullWidth
              type="text"
              label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.icon' })}
            />
            <IconButton
              tooltip="Display icon"
              onTouchTap={this.loadIcon}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <Field
            name={this.getFormFieldName('active')}
            component={RenderDoubleLabelToggle}
            type="boolean"
            leftLabel={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.inactive' })}
            rightLabel={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.active' })}
            style={styles.pluginConfiguration.form.toggle}
            defaultToggled={pluginConfiguration ? pluginConfiguration.active : true}
          />
        </CardText>
      </Card>
    )
  }

  render() {
    const { pluginMetaData, pluginConfiguration, reduxFormChange, formMode } = this.props

    const styles = moduleStyles(this.context.muiTheme)

    return (
      <div>
        {this.renderGlobalConf(styles)}
        <Card style={styles.pluginConfiguration.form.section}>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.parameter.list.title' })}
          />
          <CardText>
            {pluginMetaData && pluginMetaData.parameters ? pluginMetaData.parameters.map((pluginParameterType, index) => (
              <GenericPluginParameter
                key={pluginParameterType.name}
                microserviceName={this.props.microserviceName}
                fieldKey={`parameters.${index}`}
                pluginParameterType={pluginParameterType}
                pluginParameter={PluginUtils.mapPluginParameterTypeToPluginParameter(pluginParameterType, pluginConfiguration)}
                pluginMetaData={pluginMetaData}
                change={reduxFormChange}
                mode={formMode}
              />)) : []}
          </CardText>
        </Card>
      </div>
    )
  }
}

export default withI18n(messages)(PluginConfigurationComponent)
