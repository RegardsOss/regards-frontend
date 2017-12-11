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
import { fieldInputPropTypes } from 'redux-form'
import { CommonShapes } from '@regardsoss/shape'
import { FieldArray, RenderArrayTextField, RenderArrayObjectField } from '@regardsoss/form-utils'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { getPrimitiveJavaTypeRenderParameters } from './JavaPrimitiveTypesTool'
import RenderObjectParameterField from './RenderObjectParameterField'
import styles from '../styles'
import messages from '../i18n'

/**
* Render a plugin parameter form for a COLLECTION parameter.
* @author Sébastien Binda
*/
export class RenderCollectionParameterField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginParameterType: CommonShapes.PluginParameterType.isRequired,
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { input, pluginParameterType, microserviceName } = this.props
    const parameterizedType = get(pluginParameterType, 'parameterizedSubTypes', [undefined])[0]

    // Is a collection of primitive type ?
    const primitiveParameters = getPrimitiveJavaTypeRenderParameters(parameterizedType)
    if (parameterizedType && primitiveParameters) {
      return (
        <FieldArray
          name={`${input.name}`}
          fullWidth
          component={RenderArrayTextField}
          fieldsListLabel={pluginParameterType.label}
          type={primitiveParameters.type}
        />
      )
    } else if (pluginParameterType.parameters && pluginParameterType.parameters.length > 0) {
      // List of object.
      const fieldProps = {
        microserviceName,
        pluginParameterType,
        complexParameter: false,
        input,
      }
      return (
        <div style={{ width: '100%' }}>
          <FieldArray
            name={`${input.name}`}
            fullWidth
            component={RenderArrayObjectField}
            label={pluginParameterType.label || pluginParameterType.name}
            fieldComponent={RenderObjectParameterField}
            fieldProps={fieldProps}
          />
        </div>
      )
    }
    console.error('Invalid type for collection plugin parameter', pluginParameterType)
    return (
      <div />
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderCollectionParameterField))
