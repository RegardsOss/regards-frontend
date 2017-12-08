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
import get from 'lodash/get'
import omit from 'lodash/omit'
import { CommonShapes } from '@regardsoss/shape'
import { fieldInputPropTypes } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import SubHeader from 'material-ui/Subheader'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { Field, FieldArray, RenderArrayTextField, RenderTextField, RenderCheckbox, RenderRadio, ValidationHelpers } from '@regardsoss/form-utils'
import RenderPluginPluginParameterField from './RenderPluginPluginParameterField'
import styles from '../styles'
import messages from '../i18n'

/**
* Redux-form compatible field component to display a PluginParameter configurator form.
* @author Sébastien Binda
*/
class RenderPluginParameterField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired, // microservice name of the plugin
    pluginParameterType: CommonShapes.PluginParameterType, // Type of the parameter to configure
    hideDynamicParameterConf: PropTypes.bool, // Hide the dynamic configuration of parameter
    disabled: PropTypes.bool, // Disable all fields
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    disabled: false,
    hideDynamicParameterConf: false,
  }

  componentDidMount() {
    const { input, pluginParameterType } = this.props
    if (!input.value) {
      input.onChange({
        value: pluginParameterType.defaultValue,
        type: pluginParameterType.type,
        name: pluginParameterType.name,
      })
    }
  }

  /**
   * Render a radio button to select the configuration mode of the parameter : static / dynamic.
   * A static parameter is configured with a fixed value.
   * A dynmaic parameter is configured to set the list of possible values for the parameter.
   * @param {*} name: parameter name
   */
  renderDynamicRadioButton = (name) => {
    if (this.props.hideDynamicParameterConf) {
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
   * @param {bool} dynamic: display dynamic configurator ?
   * @param {element} component: React component to render field
   * @param {string} type: type of parameter
   * @param {string} label: label of parameter
   * @param {bool} disabled: disable the configurator field ?
   * @param {[func]} validators: List of validator functions
   */
  renderParamConfiguration = (name, dynamic, component, type, label, disabled, validators) => {
    const { moduleTheme: { dynamicParameter } } = this.context
    const parameters = (
      <div style={dynamicParameter.layout}>
        {this.renderDynamicRadioButton(name)}
        {this.renderParamValueConf(name, dynamic, component, type, label, disabled, validators)}
      </div >
    )
    let header
    if (!this.props.hideDynamicParameterConf) {
      header = <SubHeader>{label}</SubHeader>
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
  * @param {string} type: type of parameter
  * @param {string} label: label of parameter
  * @param {bool} disabled: disable the configurator field ?
  * @param {[func]} validators: List of validator functions
  */
  renderParamValueConf = (name, dynamic, component, type, label, disabled, validators) => {
    if (this.props.hideDynamicParameterConf && dynamic) {
      return null
    }
    if (dynamic) {
      const { intl: { formatMessage } } = this.context
      return (
        <FieldArray
          name={`${name}.dynamicsValues`}
          fullWidth
          component={RenderArrayTextField}
          fieldsListLabel={formatMessage({ id: 'plugin.parameter.dynamicvalues.title' })}
          disabled={disabled}
          valueField="value"
          label={label}
          type={type}
          validate={validators}
        />
      )
    }
    return (
      <Field
        name={`${name}.value`}
        fullWidth
        component={component}
        disabled={disabled}
        floatingLabelText={this.props.hideDynamicParameterConf ? label : null}
        hintText={label}
        label={this.props.hideDynamicParameterConf ? label : null}
        type={type}
        validate={validators}
      />
    )
  }

  render() {
    const {
      input: { name, value }, pluginParameterType, microserviceName, disabled,
    } = this.props

    let label = pluginParameterType.label || pluginParameterType.name
    const validators = []
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(ValidationHelpers.required)
      label += ' (*)'
    }

    let component
    let type
    switch (pluginParameterType && pluginParameterType.paramType) {
      case 'PRIMITIVE':
        switch (pluginParameterType.type) {
          case 'java.lang.String':
          case 'java.lang.Character':
            component = RenderTextField
            type = 'text'
            break
          case 'java.lang.Byte':
          case 'java.lang.Integer':
          case 'java.lang.Long':
          case 'java.lang.Float':
          case 'java.lang.Double':
          case 'java.lang.Short':
            component = RenderTextField
            type = 'number'
            break
          case 'java.lang.Boolean':
            component = RenderCheckbox
            type = 'boolean'
            break
          default:
            return null
        }
        return this.renderParamConfiguration(name, value.dynamic, component, type, label, disabled, validators)
      case 'PLUGIN':
        return (<Field
          name={`${name}.value`}
          fullWidth
          component={RenderPluginPluginParameterField}
          disabled={disabled}
          label={label}
          microserviceName={microserviceName}
          pluginParameterType={pluginParameterType}
        />)
      default:
        return null
    }
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderPluginParameterField))
