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
import omit from 'lodash/omit'
import { CommonShapes } from '@regardsoss/shape'
import { Field, RenderTextField, RenderCheckbox, ValidationHelpers } from '@regardsoss/form-utils'
import RenderPluginPluginParameterField from './RenderPluginPluginParameterField'
/**
* Comment Here
* @author Sébastien Binda
*/
class RenderPluginParameterField extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginParameterType: CommonShapes.PluginParameterType,
    hideDynamicParameterConf: PropTypes.bool,
    // From redux field
    input: PropTypes.shape({
      value: CommonShapes.PluginParameterContent,
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    hideDynamicParameterConf: false,
  }

  componentDidMount() {
    const { input, pluginParameterType } = this.props
    if (!input.value && pluginParameterType.defaultValue) {
      input.onChange({
        ...omit(input.value, 'value'),
        value: pluginParameterType.defaultValue,
      })
    }
  }

  // TODO : handle dynamic values to configure for parameters confiured as dynamic
  renderDynamicConfiguration = name => this.props.hideDynamicParameterConf ? [] : [
    <Field
      key="isDynamic"
      name={`${name}.dynamic`}
      component={RenderCheckbox}
      label="Is dynamic ?"
    />,
  ]

  render() {
    const {
      input: { name }, pluginParameterType, microserviceName,
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
        return (
          <div>
            <Field
              name={`${name}.value`}
              fullWidth
              component={component}
              label={label}
              type={type}
              validate={validators}
            />
            {this.renderDynamicConfiguration(name)}
          </div>
        )
      case 'PLUGIN':
        return (<Field
          name={`${name}.value`}
          fullWidth
          component={RenderPluginPluginParameterField}
          label={label}
          microserviceName={microserviceName}
          pluginParameterType={pluginParameterType}
        />)
      default:
        return null
    }
  }
}
export default RenderPluginParameterField
