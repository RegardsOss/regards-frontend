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
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import { CommonShapes } from '@regardsoss/shape'
import { fieldInputPropTypes } from 'redux-form'
import HelpCircle from 'mdi-material-ui/HelpCircle'
import { RadioButton } from 'material-ui/RadioButton'
import SubHeader from 'material-ui/Subheader'
import RasiedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { Field, FieldArray, RenderArrayTextField, RenderRadio, ValidationHelpers } from '@regardsoss/form-utils'
import { RenderPluginField } from './RenderPluginPluginParameterField'
import { RenderObjectParameterField } from './RenderObjectParameterField'
import { RenderCollectionParameterField } from './RenderCollectionParameterField'
import { RenderMapParameterField } from './RenderMapParameterField'
import { getPrimitiveJavaTypeRenderParameters } from './JavaPrimitiveTypesTool'
import styles from '../styles'
import messages from '../i18n'

/**
* Redux-form compatible field component to display a PluginParameter configurator form.
* @author Sébastien Binda
*/
export class RenderPluginParameterField extends React.PureComponent {
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

  state = {
    descriptionOpened: false,
  }

  componentWillMount() {
    const { input, pluginParameterType, complexParameter } = this.props
    if (complexParameter && isNil(get(input.value, 'value')) && isNil(get(input.value, 'dynamicValues'))) {
      input.onChange({
        dynamic: false,
        dynamicValues: null,
        value: pluginParameterType.defaultValue,
        name: pluginParameterType.name,
      })
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
      <div style={dynamicParameter.toggle.style}>
        <Field
          name={`${name}.dynamic`}
          component={RenderRadio}
          disabled={this.props.disabled}
          defaultSelected={false}
        >
          <RadioButton value={false} label={formatMessage({ id: 'plugin.parameter.static.field' })} labelStyle={dynamicParameter.toggle.labelStyle} />
          <RadioButton value label={formatMessage({ id: 'plugin.parameter.dynamic.field' })} labelStyle={dynamicParameter.toggle.labelStyle} />
        </Field>
      </div >
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
    const { moduleTheme: { dynamicParameter, pluginParameter: { headerStyle } } } = this.context
    const { hideDynamicParameterConf, pluginParameterType: { description } } = this.props
    const parameters = (
      <div style={dynamicParameter.layout}>
        {!forceHideDynamicConf ? this.renderDynamicRadioButton(name) : null}
        {this.renderParamValueConf(name, dynamic, component, label, disabled, validators, displayDynamicValues, fieldParams)}
      </div>
    )
    // Display parameter header with his own label if dynamic configuration is enabled
    let header
    if ((!hideDynamicParameterConf && !forceHideDynamicConf) || component === RenderObjectParameterField || component === RenderMapParameterField) {
      header = (
        <div style={headerStyle}>
          <SubHeader key="label">{label}</SubHeader>
          {description ? <IconButton onClick={this.handleOpenDescription}><HelpCircle /></IconButton> : null}
          {description ? this.renderDescriptionDialog() : null}
        </div>
      )
    }
    return (
      <div>
        {header}
        {parameters}
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
          name={`${name}.dynamicsValues`}
          component={RenderArrayTextField}
          fieldsListLabel={formatMessage({ id: 'plugin.parameter.dynamicvalues.title' })}
          disabled={disabled}
          valueField="value"
          label={label}
          {...fieldParams}
        />
      )
    } else if (dynamic && !displayDynamicValues) {
      return null
    }
    const fieldName = complexParameter ? `${name}.value` : name
    return (
      <Field
        name={fieldName}
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
      type: primitiveParameters.type,
      normalize: primitiveParameters.type === 'number' ? val => parseInt(val, 10) : null,
      format: primitiveParameters.type === 'number' ? val => parseInt(val, 10) : null,
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

  renderDescriptionDialog = () => {
    const { intl: { formatMessage } } = this.context
    const { pluginParameterType } = this.props
    const actions = [
      <RasiedButton
        key="close"
        label={formatMessage({ id: 'plugin.parameter.description.dialog.close' })}
        primary
        onClick={this.handleCloseDescription}
      />]
    return (
      <Dialog
        title={formatMessage({ id: 'plugin.parameter.description.dialog.title' }, { parameter: pluginParameterType.label })}
        actions={actions}
        modal
        open={this.state.descriptionOpened}
      >
        {pluginParameterType.description}
      </Dialog>
    )
  }

  render() {
    const { pluginParameterType } = this.props

    let label = pluginParameterType.label || pluginParameterType.name
    const validators = []
    if (pluginParameterType && !pluginParameterType.optional) {
      label += ' (*)'
      switch (pluginParameterType.paramType) {
        case 'PRIMITIVE':
        case 'PLUGIN':
        case 'OBJECT':
          validators.push(ValidationHelpers.required)
          break
        case 'COLLECTION':
          validators.push(ValidationHelpers.arrayRequired)
          break
        case 'MAP':
          validators.push(ValidationHelpers.mapRequired)
          break
        default:
          break
      }
    }

    switch (pluginParameterType.paramType) {
      case 'PRIMITIVE':
        return this.renderPrimitiveParameter(label, validators)
      case 'PLUGIN':
        return this.renderPluginParameter(label, validators)
      case 'OBJECT':
        return this.renderObjectParameter(label, validators)
      case 'COLLECTION':
        return this.renderCollectionParameter(label, validators)
      case 'MAP':
        return this.renderMapParameter(label, validators)
      default:
        return null
    }
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderPluginParameterField))
