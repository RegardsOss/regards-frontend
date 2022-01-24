/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonShapes } from '@regardsoss/shape'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { RenderMapField } from '@regardsoss/form-utils'
import { getPrimitiveJavaTypeRenderParameters } from './JavaPrimitiveTypesTool'
import RenderObjectParameterField from './RenderObjectParameterField'
import PluginFormUtils from '../tools/PluginFormUtils'
import styles from '../styles'
import messages from '../i18n'

/**
* Render a plugin parameter form for a MAP parameter.
* @author Sébastien Binda
*/
export class RenderMapParameterField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired, // microservice name of the plugin
    pluginParameterType: CommonShapes.PluginParameterType.isRequired, // Parameter definition to configure
    disabled: PropTypes.bool, // Disable all fields
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    component: null,
    fieldProps: {},
  }

  componentDidMount() {
    try {
      this.initialize()
    } catch (e) {
      console.error(e.message)
    }
  }

  /**
   * Initialize the map renderer by calculating the map value renderer and its props.
   */
  initialize = () => {
    const {
      pluginParameterType, microserviceName, disabled,
    } = this.props
    const { intl: { formatMessage } } = this.context

    // There should be two parameterized subtypes
    if (!pluginParameterType.parameterizedSubTypes || pluginParameterType.parameterizedSubTypes.length !== 2) {
      throw new Error('Invalid map parameter', pluginParameterType)
    }
    if ((pluginParameterType.parameterizedSubTypes[0] !== 'java.lang.String')
     && (pluginParameterType.parameterizedSubTypes[0] !== 'STRING')) {
      throw new Error('Invalid map key parameter. Only String is allowed.')
    }

    // Calculate value renderer type. Primitive or object
    const primitiveParameters = getPrimitiveJavaTypeRenderParameters(pluginParameterType.parameterizedSubTypes[1])
    if (primitiveParameters) {
      this.setState({
        fieldProps: {
          // Props of the component renderer
          type: primitiveParameters.type,
          floatingLabelText: formatMessage({ id: 'plugin.parameter.map.new.value.label' }, { value: pluginParameterType.label }),
          disabled,
        },
        // Component renderer (exemple : RenderTextField)
        component: primitiveParameters.component,
        defaultValue: null,
      })
    } else {
      this.setState({
        fieldProps: {
          // Props for the RenderObjectParameterField
          microserviceName,
          pluginParameterType,
          complexParameter: false,
          disabled,
        },
        component: RenderObjectParameterField,
        defaultValue: {},
      })
    }
  }

  render() {
    const {
      fieldProps, component, defaultValue,
    } = this.state
    const { moduleTheme: { renderer: { fullWidthStyle } }, intl: { formatMessage } } = this.context
    const {
      input, meta, disabled, pluginParameterType,
    } = this.props
    if (component === null) {
      return null
    }

    const newValueDialogLabel = pluginParameterType.keyLabel
      ? formatMessage({ id: 'plugin.parameter.map.new.key.dialog.title' }, { key: pluginParameterType.keyLabel })
      : null
    return (
      <div style={fullWidthStyle}>
        <RenderMapField
          mapValueFieldComponent={component}
          mapValueFieldProps={fieldProps}
          charsToReplaceDotsInKeys={PluginFormUtils.DOT_CHAR_REPLACEMENT}
          defaultValue={defaultValue}
          newValueDialogLabel={newValueDialogLabel}
          mapKeyLabel={pluginParameterType.keyLabel}
          mapLabel={pluginParameterType.label}
          disabled={disabled}
          input={input}
          meta={meta}
        />
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderMapParameterField))
