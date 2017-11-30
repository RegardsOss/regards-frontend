/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import cloneDeep from 'lodash/cloneDeep'
import forEach from 'lodash/forEach'
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
    // eslint-disable-next-line react/no-unused-prop-types
    reduxFormInitialize: PropTypes.func.isRequired, // Redux change function to dynamically change values
    reduxFormGetField: PropTypes.func.isRequired, // Redux form selector to get edit value of a given field
    pluginConfiguration: CommonShapes.PluginConfigurationContent, // Default plugin configuration to edit
    displayTitle: PropTypes.bool, // Use this parameter to show/hide the card title of plugin configuration form
    hideGlobalParameterConf: PropTypes.bool, // Use this parameter to hide the global configuration of plugins
    // eslint-disable-next-line react/no-unused-prop-types
    newPluginConfLabel: PropTypes.string, // use this parameter to force automatic generation of plugin configuration label
    reduxFormfieldNamePrefix: PropTypes.string, // Use this parameter to define the redux form fields predix for pluginConfiguration field names
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
    if (!props.pluginMetaData) {
      throw new Error('Undefined plugin to configure!')
    }
    if ((this.isEditing() || this.isCopying()) && (!props.pluginConfiguration)) {
      throw new Error('No pluginConfiguration to edit or copy !')
    }
    this.state = {
      loadedIcon: null,
    }
  }

  componentDidMount() {
    this.handleInitialize(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const nextPlugin = get(nextProps, 'pluginMetaData.pluginId', null)
    const currentPlugin = get(this.props, 'pluginMetaData.pluginId', null)
    if (!nextPlugin) {
      this.props.reduxFormChange(this.props.reduxFormfieldNamePrefix, null)
    } else if (nextPlugin !== currentPlugin) {
      this.handleInitialize(nextProps)
    }
  }


  getFormFieldName = (name) => {
    if (this.props.reduxFormfieldNamePrefix) {
      return `${this.props.reduxFormfieldNamePrefix}.${name}`
    }
    return name
  }

  isCreating = () => this.props.formMode === 'create'

  isEditing = () => this.props.formMode === 'edit'

  isCopying = () => this.props.formMode === 'copy'

  /**
   * Initialize form fields
   */
  handleInitialize = (props) => {
    const { formMode, pluginMetaData, pluginConfiguration } = props
    let initialValues

    let label = null
    if (props.newPluginConfLabel) {
      label = `${props.newPluginConfLabel}-${new Date().getTime()}`
    }

    switch (formMode) {
      case 'edit':
        initialValues = Object.assign({}, pluginConfiguration)
        initialValues.parameters = PluginUtils.buildParameterList(initialValues.parameters, pluginMetaData.parameters)
        break
      case 'create':
        initialValues = {
          active: true,
          pluginId: pluginMetaData.pluginId,
          pluginClassName: pluginMetaData.pluginClassName,
          version: pluginMetaData.version,
          priorityOrder: 1,
          parameters: PluginUtils.buildDefaultParameterList(pluginMetaData.parameters),
          label,
        }
        break
      case 'copy':
        // Deep copy pluginConfiguration
        initialValues = cloneDeep(pluginConfiguration)
        // In copy mode remove id of the duplicated pluginConfiguration
        delete initialValues.id
        // In copy mode remove id of each pluginParameters
        if (initialValues.parameters && initialValues.parameters.length > 0) {
          forEach(initialValues.parameters, (parameter, key) => {
            delete initialValues.parameters[key].id
          })
        }
        break
      default:
        break
    }

    // Load icon if any
    this.loadIcon(get(pluginConfiguration, 'iconUrl'), null)

    if (props.reduxFormfieldNamePrefix && props.reduxFormfieldNamePrefix !== '') {
      props.reduxFormChange(props.reduxFormfieldNamePrefix, initialValues)
    } else {
      props.reduxFormInitialize(initialValues)
    }
  }

  /**
   * Load icon from the form field iconUrl.
   * @param path
   */
  loadIcon = (path) => {
    const iconField = this.props.reduxFormGetField('iconUrl')
    if (iconField) {
      this.setState({
        loadedIcon: iconField,
      })
    } else if (path) {
      this.setState({
        loadedIcon: path,
      })
    }
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
    const { hideGlobalParameterConf, pluginConfiguration } = this.props

    if (hideGlobalParameterConf) {
      return null
    }

    const title = this.isEditing() ?
      this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.edit.title' }, { name: pluginConfiguration.name }) :
      this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.create.title' })
    return (
      <Card>
        <CardTitle title={title} />
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

  renderParameters = () => {
    const {
      pluginMetaData, pluginConfiguration, reduxFormChange, formMode,
    } = this.props
    const parameters = get(pluginMetaData, 'parameters', [])
    if (parameters.length === 0) {
      return null
    }
    return (<CardText>
      {parameters.map((pluginParameterType, index) => (
        <GenericPluginParameter
          key={pluginParameterType.name}
          fieldKey={this.getFormFieldName(`parameters.${index}`)}
          microserviceName={this.props.microserviceName}
          reduxFormfieldNamePrefix={this.props.reduxFormfieldNamePrefix}
          pluginParameterType={pluginParameterType}
          pluginParameter={!this.isCreating() ?
            PluginUtils.mapPluginParameterTypeToPluginParameter(pluginParameterType, pluginConfiguration)
            : PluginUtils.mapPluginParameterTypeToPluginParameter(pluginParameterType, null)
          }
          pluginMetaData={pluginMetaData}
          change={reduxFormChange}
          mode={formMode}
        />))}
    </CardText>
    )
  }

  renderTitle = () => {
    if (!this.props.displayTitle) {
      return null
    }
    return (
      <CardTitle
        title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.parameter.list.title' })}
      />
    )
  }

  render() {
    const styles = moduleStyles(this.context.muiTheme)

    return (
      <div>
        {this.renderGlobalConf(styles)}
        <Card style={styles.pluginConfiguration.form.section}>
          {this.renderTitle()}
          {this.renderParameters()}
        </Card>
      </div>
    )
  }
}

export default withI18n(messages)(PluginConfigurationComponent)
