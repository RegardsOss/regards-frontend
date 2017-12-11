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
import { fieldInputPropTypes, Field } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { FieldArray, RenderArrayTextField, RenderArrayObjectField, RenderMapField } from '@regardsoss/form-utils'
import { getPrimitiveJavaTypeRenderParameters } from './JavaPrimitiveTypesTool'
import RenderObjectParameterField from './RenderObjectParameterField'
import styles from '../styles'
import messages from '../i18n'

/**
* Render a plugin parameter form for a MAP parameter.
* @author Sébastien Binda
*/
export class RenderMapParameterField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginParameterType: CommonShapes.PluginParameterType.isRequired,
    fullWidth: PropTypes.bool,
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      input, pluginParameterType, microserviceName, fullWidth, name,
    } = this.props

    // There should be two parameterized subtypes
    if (!pluginParameterType.parameterizedSubTypes || pluginParameterType.parameterizedSubTypes.length !== 2) {
      console.error('Invalid map parameter', pluginParameterType)
      return null
    }
    if (pluginParameterType.parameterizedSubTypes[0] !== 'java.lang.String') {
      console.error('Invalid map key parameter. Only String is allowed.')
      return null
    }

    // Check if second parameter is primitive
    let renderComponent = null
    const primitiveParameters = getPrimitiveJavaTypeRenderParameters(pluginParameterType.parameterizedSubTypes[1])
    if (primitiveParameters) {
      const mapValueFieldProps = {
        type: primitiveParameters.type,
      }
      renderComponent = (<Field
        name={input.name}
        component={RenderMapField}
        mapValueFieldComponent={primitiveParameters.component}
        mapValueFieldProps={mapValueFieldProps}
        getNewMapValue={() => ''}
      />)
    } else {
      const fieldProps = {
        microserviceName,
        pluginParameterType,
        complexParameter: false,
      }
      renderComponent = (<Field
        name={input.name}
        component={RenderMapField}
        mapValueFieldComponent={RenderObjectParameterField}
        mapValueFieldProps={fieldProps}
        getNewMapValue={() => ({})}
      />)
    }
    return (<div style={{ width: '100%' }}>{renderComponent}</div>)
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderMapParameterField))
