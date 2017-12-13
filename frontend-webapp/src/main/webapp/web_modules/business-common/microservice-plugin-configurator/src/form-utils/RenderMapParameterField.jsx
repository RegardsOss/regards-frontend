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
import { CommonShapes } from '@regardsoss/shape'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { RenderMapField } from '@regardsoss/form-utils'
import { getPrimitiveJavaTypeRenderParameters } from './JavaPrimitiveTypesTool'
import RenderObjectParameterField from './RenderObjectParameterField'
import styles from '../styles'
import messages from '../i18n'

/**
* Render a plugin parameter form for a MAP parameter.
* @author Sébastien Binda
*/
export class RenderMapParameterField extends React.PureComponent {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginParameterType: CommonShapes.PluginParameterType.isRequired,
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  }

  static defaultProps = {}

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
      pluginParameterType, microserviceName,
    } = this.props

    // There should be two parameterized subtypes
    if (!pluginParameterType.parameterizedSubTypes || pluginParameterType.parameterizedSubTypes.length !== 2) {
      throw new Error('Invalid map parameter', pluginParameterType)
    }
    if (pluginParameterType.parameterizedSubTypes[0] !== 'java.lang.String') {
      throw new Error('Invalid map key parameter. Only String is allowed.')
    }

    // Calculate value renderer type. Primitive or object
    const primitiveParameters = getPrimitiveJavaTypeRenderParameters(pluginParameterType.parameterizedSubTypes[1])
    if (primitiveParameters) {
      this.setState({
        fieldProps: {
          // Props of the component renderer
          type: primitiveParameters.type,
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
        },
        component: RenderObjectParameterField,
        defaultValue: {},
      })
    }
  }

  render() {
    const { fieldProps, component, defaultValue } = this.state
    const { moduleTheme: { renderer: { fullWidthStyle } } } = this.context
    const { input, meta } = this.props
    if (component === null) {
      return null
    }
    return (
      <div style={fullWidthStyle}>
        <RenderMapField
          component={RenderMapField}
          mapValueFieldComponent={component}
          mapValueFieldProps={fieldProps}
          defaultValue={defaultValue}
          input={input}
          meta={meta}
        />
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderMapParameterField))
