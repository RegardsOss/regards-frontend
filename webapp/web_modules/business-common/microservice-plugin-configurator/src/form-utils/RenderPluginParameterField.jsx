/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import isEqual from 'lodash/isEqual'
import includes from 'lodash/includes'
import { CommonShapes } from '@regardsoss/shape'
import { fieldInputPropTypes } from 'redux-form'
import HelpCircle from 'mdi-material-ui/HelpCircle'
import { RadioButton } from 'material-ui/RadioButton'
import SubHeader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import { Tabs, Tab } from 'material-ui/Tabs'
import { ScrollArea } from '@regardsoss/adapters'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { MarkdownFileContentDisplayer } from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  Field, FieldArray, RenderArrayTextField, RenderRadio, ValidationHelpers,
} from '@regardsoss/form-utils'
import { CommonDomain } from '@regardsoss/domain'
import { RenderPluginField } from './RenderPluginPluginParameterField'
import { RenderObjectParameterField } from './RenderObjectParameterField'
import { RenderCollectionParameterField } from './RenderCollectionParameterField'
import { RenderMapParameterField } from './RenderMapParameterField'
import { getPrimitiveJavaTypeRenderParameters, getPrimitiveJavaTypeValidators as getPrimitiveJavaTypeValidator } from './JavaPrimitiveTypesTool'
import PluginFormUtils from '../tools/PluginFormUtils'
import styles from '../styles'
import messages from '../i18n'
/**
* Redux-form compatible field component to display a PluginParameter configurator form.
* @author Sébastien Binda
*/
export class RenderPluginParameterField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired, // microservice name of the plugin
    pluginParameterType: CommonShapes.PluginParameterType.isRequired, // Parameter definition to configure
    hideDynamicParameterConf: PropTypes.bool, // Hide the dynamic configuration of parameter
    disabled: PropTypes.bool, // Disable all fields
    complexParameter: PropTypes.bool, // Set to true to disable the complex structur of pluginParameter. Default true. Used for Object recursivity of parameters.
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    complexParameter: true,
    disabled: false,
    hideDynamicParameterConf: false,
  }

  static wrapperPreserveWhitespace = {
    whiteSpace: 'pre-wrap',
  }

  static FULLWIDTH = {
    width: '100%',
  }

  static getFieldValidators(pluginParameterType) {
    const validators = []
    // 1 - By type validator
    if (pluginParameterType.type === CommonDomain.PluginParameterTypes.STRING) {
      const typeValidator = getPrimitiveJavaTypeValidator(pluginParameterType.type)
      if (typeValidator) {
        validators.push(typeValidator)
      }
    }
    // 2 - Required value validator
    const isRequired = !pluginParameterType.optional && !pluginParameterType.defaultValue
    if (isRequired) {
      switch (pluginParameterType.type) {
        case CommonDomain.PluginParameterTypes.STRING:
        case CommonDomain.PluginParameterTypes.BYTE:
        case CommonDomain.PluginParameterTypes.SHORT:
        case CommonDomain.PluginParameterTypes.INTEGER:
        case CommonDomain.PluginParameterTypes.LONG:
        case CommonDomain.PluginParameterTypes.FLOAT:
        case CommonDomain.PluginParameterTypes.DOUBLE:
        case CommonDomain.PluginParameterTypes.BOOLEAN:
        case CommonDomain.PluginParameterTypes.POJO:
        case CommonDomain.PluginParameterTypes.PLUGIN:
          validators.push(ValidationHelpers.required)
          break
        case CommonDomain.PluginParameterTypes.COLLECTION:
          validators.push(ValidationHelpers.arrayRequired)
          break
        case CommonDomain.PluginParameterTypes.MAP:
          validators.push(ValidationHelpers.mapRequired)
          break
        default: // No validator
      }
    }
    return validators
  }

  state = {
    descriptionOpened: false,
  }

  UNSAFE_componentWillMount() {
    // Format plugin parameter conf for initialization with the given metadatas
    const { pluginParameterType, complexParameter, input: { value, onChange } } = this.props
    const formatedParam = complexParameter ? PluginFormUtils.formatPluginParameterConf(value, pluginParameterType, true) : value
    if (!isEqual(formatedParam, value)) {
      onChange(formatedParam)
    }
  }

  handleCloseDescription = () => {
    this.setState({ descriptionOpened: false })
  }

  handleOpenDescription = () => {
    this.setState({ descriptionOpened: true })
  }

  /**
   * Render a radio button to select the configuration mode of the parameter : static / dynamic.
   * A static parameter is configured with a fixed value.
   * A dynmaic parameter is configured to set the list of possible values for the parameter.
   * @param {*} name: parameter name
   */
  renderDynamicRadioButton = (name) => {
    const { hideDynamicParameterConf, complexParameter } = this.props
    if (hideDynamicParameterConf || !complexParameter) {
      return null
    }
    const { moduleTheme: { dynamicParameter }, intl: { formatMessage } } = this.context
    return (
      <div key={`dynamic-field-${name}`} style={dynamicParameter.toggle.style}>
        <Field
          name={`${name}.dynamic`}
          component={RenderRadio}
          disabled={this.props.disabled}
          defaultSelected={false}
          fullWidth
        >
          <RadioButton value={false} label={formatMessage({ id: 'plugin.parameter.static.field' })} labelStyle={dynamicParameter.toggle.labelStyle} />
          <RadioButton value label={formatMessage({ id: 'plugin.parameter.dynamic.field' })} labelStyle={dynamicParameter.toggle.labelStyle} />
        </Field>
      </div>
    )
  }

  /**
   * Render the global configuration of the typed parameter
   * @param {string} name: parameter name
   * @param {bool} dynamic: is the field configured as dynamic ?
   * @param {bool} forceHideDynamicConf: display dynamic configurator ?
   * @param {element} component: React component to render field
   * @param {string} label: label of parameter
   * @param {bool} disabled: disable the configurator field ?
   * @param {[func]} validators: List of validator functions
   * @param {bool} displayDynamicValues: Display or hide the dynamic values conf
   * @param {*} fieldParams: additional field parameters
   */
  renderParamConfiguration = (name, dynamic, forceHideDynamicConf, component, label, disabled, validators, displayDynamicValues, fieldParams = {}) => {
    const { moduleTheme: { dynamicParameter, pluginParameter: { headerStyle } }, intl: { formatMessage } } = this.context
    const { hideDynamicParameterConf, pluginParameterType: { description, markdown, defaultValue } } = this.props
    const parameterElements = []
    if (!forceHideDynamicConf) {
      parameterElements.push(this.renderDynamicRadioButton(name))
    }
    parameterElements.push(this.renderParamValueConf(name, dynamic, component, label, disabled, validators, displayDynamicValues, fieldParams))
    // Display parameter header with his own label if dynamic configuration is enabled
    let header
    if ((!hideDynamicParameterConf && !forceHideDynamicConf) || includes([RenderObjectParameterField, RenderMapParameterField, RenderCollectionParameterField], component)) {
      const devaultValueLabel = defaultValue ? formatMessage({ id: 'plugin.parameter.default.value.label' }, { defaultValue }) : null
      header = (
        <div style={headerStyle}>
          <SubHeader key="label">
            {label}
            {' '}
            {devaultValueLabel}
          </SubHeader>
          {(description || markdown) && <IconButton key="desc-info-button" onClick={this.handleOpenDescription}><HelpCircle /></IconButton>}
          {(description || markdown) && this.renderDescriptionDialog()}
        </div>
      )
    } else if (description || markdown) {
      parameterElements.push(<IconButton key="desc-info-button" onClick={this.handleOpenDescription}><HelpCircle /></IconButton>)
      parameterElements.push(this.renderDescriptionDialog())
    }
    return (
      <div style={RenderPluginParameterField.FULLWIDTH}>
        {header}
        <div style={dynamicParameter.layout}>
          {parameterElements}
        </div>
      </div>
    )
  }

  /**
  * Render the value configuration of the typed parameter
  * @param {string} name: parameter name
  * @param {bool} dynamic: display dynamic configurator ?
  * @param {element} component: React component to render field
  * @param {string} label: label of parameter
  * @param {bool} disabled: disable the configurator field ?
  * @param {[func]} validators: List of validator functions
  * @param {bool} displayDynamicValues: Display or hide the dynamic values conf
  * @param {*} fieldParams: additional field parameters
  */
  renderParamValueConf = (name, dynamic, component, label, disabled, validators, displayDynamicValues, fieldParams) => {
    const { hideDynamicParameterConf, complexParameter } = this.props
    if (hideDynamicParameterConf && dynamic) {
      return null
    }
    if (dynamic && complexParameter && displayDynamicValues) {
      const { intl: { formatMessage } } = this.context
      return (
        <FieldArray
          key={`${name}.dynamicsValues`}
          name={`${name}.dynamicsValues`}
          component={RenderArrayTextField}
          fieldsListLabel={formatMessage({ id: 'plugin.parameter.dynamicvalues.title' })}
          disabled={disabled}
          label={label}
          {...fieldParams}
        />
      )
    }
    if (dynamic && !displayDynamicValues) {
      return null
    }
    const fieldName = complexParameter ? `${name}.value` : name
    return (
      <Field
        key={fieldName}
        name={fieldName}
        fullWidth
        component={component}
        disabled={disabled}
        validate={validators}
        {...fieldParams}
      />
    )
  }

  renderPrimitiveParameter = (label, validators) => {
    const {
      input: { name, value }, pluginParameterType, disabled,
    } = this.props
    const primitiveParameters = getPrimitiveJavaTypeRenderParameters(pluginParameterType.type)
    const parameters = {
      type: pluginParameterType.sensitive ? 'password' : primitiveParameters.type,
      normalize: primitiveParameters.type === 'number' ? (val) => val ? parseInt(val, 10) : '' : null,
      format: primitiveParameters.type === 'number' ? (val) => val ? parseInt(val, 10) : '' : null,
      floatingLabelText: this.props.hideDynamicParameterConf ? label : null,
      hintText: label,
      label: this.props.hideDynamicParameterConf ? label : null,
    }
    // Disable dynamic values configuration for boolean type
    const displayDynamicValues = primitiveParameters.type !== 'boolean'
    return this.renderParamConfiguration(name, value.dynamic, false, primitiveParameters.component, label, disabled, validators, displayDynamicValues, parameters)
  }

  renderPluginParameter = (label, validators) => {
    const {
      input: { name }, pluginParameterType, microserviceName, disabled,
    } = this.props
    const parameters = {
      label,
      microserviceName,
      pluginParameterType,
    }
    return this.renderParamConfiguration(name, false, true, RenderPluginField, label, disabled, validators, false, parameters)
  }

  renderObjectParameter = (label, validators) => {
    const {
      input: { name }, disabled, pluginParameterType, microserviceName,
    } = this.props
    const parameters = {
      label,
      microserviceName,
      pluginParameterType,
    }
    return this.renderParamConfiguration(name, false, true, RenderObjectParameterField, label, disabled, validators, false, parameters)
  }

  renderCollectionParameter = (label, validators) => {
    const {
      input: { name }, disabled, pluginParameterType, microserviceName,
    } = this.props
    const parameters = {
      label,
      microserviceName,
      pluginParameterType,
    }
    return this.renderParamConfiguration(name, false, true, RenderCollectionParameterField, label, disabled, validators, false, parameters)
  }

  renderMapParameter = (label, validators) => {
    const {
      input: { name }, disabled, pluginParameterType, microserviceName,
    } = this.props
    const parameters = {
      label,
      microserviceName,
      pluginParameterType,
    }
    return this.renderParamConfiguration(name, false, true, RenderMapParameterField, label, disabled, validators, false, parameters)
  }

  renderTabs = () => {
    const {
      intl: { formatMessage },
      moduleTheme: { markdownDialog },
    } = this.context
    const { pluginParameterType } = this.props
    return (
      <Tabs>
        <Tab
          label={
            formatMessage({ id: 'plugin.parameter.description.dialog.tab.text' })
          }
        >
          <ScrollArea
            style={markdownDialog.scrollStyle}
            horizontal={false}
            vertical
          >
            <div style={markdownDialog.textDescriptionStyle}>
              {pluginParameterType.markdown}
            </div>
          </ScrollArea>
        </Tab>
        <Tab
          label={
            formatMessage({ id: 'plugin.parameter.description.dialog.tab.markdown' })
          }
        >
          <div>
            <MarkdownFileContentDisplayer
              heightToFit={400}
              source={pluginParameterType.markdown}
            />
          </div>
        </Tab>
      </Tabs>
    )
  }

  renderDescriptionDialog = () => {
    const { moduleTheme: { markdownDialog } } = this.context
    const { intl: { formatMessage } } = this.context
    const { pluginParameterType } = this.props
    const bodyStyle = pluginParameterType.markdown ? markdownDialog.bodyStyle : {}
    return (
      <Dialog
        key="desc-dialog"
        title={formatMessage({ id: 'plugin.parameter.description.dialog.title' }, { parameter: pluginParameterType.label })}
        actions={<>
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'plugin.parameter.description.dialog.close' })}
            primary
            onClick={this.handleCloseDescription}
          />
        </>}
        modal
        open={this.state.descriptionOpened}
        bodyStyle={bodyStyle}
        contentStyle={markdownDialog.dialogContent}
        style={markdownDialog.dialogRoot}
        repositionOnUpdate={false}
      >
        {/* Show only markdown description */}
        {!pluginParameterType.description && pluginParameterType.markdown && <MarkdownFileContentDisplayer
          style={markdownDialog.markdownView}
          source={pluginParameterType.markdown}
        />}
        {/* Show only regular description */}
        {!pluginParameterType.markdown && pluginParameterType.description}
        {/* Show both regular and markdown description */}
        {pluginParameterType.markdown && pluginParameterType.description && this.renderTabs()}
      </Dialog>
    )
  }

  render() {
    const { pluginParameterType } = this.props
    let label = pluginParameterType.label || pluginParameterType.name
    if (!isNil(pluginParameterType.defaultValue)) {
      label += ` (default: ${pluginParameterType.defaultValue})`
    }

    if (pluginParameterType && !pluginParameterType.optional && !pluginParameterType.defaultValue) {
      label += ' (*)'
    }

    const validators = RenderPluginParameterField.getFieldValidators(pluginParameterType)
    switch (pluginParameterType.type) {
      case CommonDomain.PluginParameterTypes.STRING:
      case CommonDomain.PluginParameterTypes.BYTE:
      case CommonDomain.PluginParameterTypes.SHORT:
      case CommonDomain.PluginParameterTypes.INTEGER:
      case CommonDomain.PluginParameterTypes.LONG:
      case CommonDomain.PluginParameterTypes.FLOAT:
      case CommonDomain.PluginParameterTypes.DOUBLE:
      case CommonDomain.PluginParameterTypes.BOOLEAN:
        return this.renderPrimitiveParameter(label, validators)
      case CommonDomain.PluginParameterTypes.PLUGIN:
        return this.renderPluginParameter(label, validators)
      case CommonDomain.PluginParameterTypes.POJO:
        return this.renderObjectParameter(label, validators)
      case CommonDomain.PluginParameterTypes.COLLECTION:
        return this.renderCollectionParameter(label, validators)
      case CommonDomain.PluginParameterTypes.MAP:
        return this.renderMapParameter(label, validators)
      default:
        return null
    }
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderPluginParameterField))
