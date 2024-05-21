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
import get from 'lodash/get'
import { fieldInputPropTypes } from 'redux-form'
import { CommonShapes } from '@regardsoss/shape'
import {
  FieldArray, RenderArrayTextField, RenderArrayObjectField, ValidationHelpers,
} from '@regardsoss/form-utils'
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
    microserviceName: PropTypes.string.isRequired, // microservice name of the plugin
    pluginParameterType: CommonShapes.PluginParameterType.isRequired, // Parameter definition to configure
    disabled: PropTypes.bool, // Disable all fields
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    // class RenderPluginParameterField - to avoid circular dependency
    classRenderPluginParameterField: PropTypes.elementType.isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isPrimitive: false,
    component: null,
    type: null,
    fieldProps: {},
  }

  UNSAFE_componentWillMount() {
    this.initialize()
  }

  initialize = () => {
    const {
      input, pluginParameterType, microserviceName, disabled, classRenderPluginParameterField,
    } = this.props
    const parameterizedType = get(pluginParameterType, 'parameterizedSubTypes', [undefined])[0]
    const primitiveParameters = getPrimitiveJavaTypeRenderParameters(parameterizedType)
    if (parameterizedType && primitiveParameters) {
      this.setState({
        isPrimitive: true,
        component: RenderArrayTextField,
        type: primitiveParameters.type,
      })
    } else {
      if (!pluginParameterType.parameters || pluginParameterType.parameters.length === 0) {
        // No parameters for the list of objects.
        throw new Error('Invalid COLLECTION plugin parameter. Parameterized type is an object without any parameters.')
      }

      this.setState({
        isPrimitive: false,
        component: RenderObjectParameterField,
        fieldProps: {
          microserviceName,
          pluginParameterType,
          complexParameter: false,
          disabled,
          input,
          classRenderPluginParameterField,
        },
      })
    }
  }

  render() {
    const { input: { name }, pluginParameterType, disabled } = this.props
    const { moduleTheme: { renderer: { fullWidthStyle } } } = this.context
    const {
      isPrimitive, component, type, fieldProps,
    } = this.state

    if (component == null) {
      return null
    }

    const validators = []
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(ValidationHelpers.arrayRequired)
    }

    let collectionParameter
    if (isPrimitive) {
      collectionParameter = (
        <FieldArray
          name={name}
          component={component}
          fieldsListLabel={pluginParameterType.label}
          displayFieldsListLabel={false}
          type={type}
          validate={validators}
          disabled={disabled}
        />
      )
    } else {
      collectionParameter = (
        <FieldArray
          name={name}
          component={RenderArrayObjectField}
          label={pluginParameterType.label || pluginParameterType.name}
          displayLabel={false}
          fieldComponent={component}
          fieldProps={fieldProps}
          validate={validators}
          disabled={disabled}
        />
      )
    }
    return (
      <div style={fullWidthStyle}>
        {collectionParameter}
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(RenderCollectionParameterField))
