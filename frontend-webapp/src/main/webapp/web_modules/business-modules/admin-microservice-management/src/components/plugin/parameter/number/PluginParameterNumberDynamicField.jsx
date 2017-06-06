/**
 * LICENSE_PLACEHOLDER
 **/
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { pluginParameterComponentPropTypes } from '../utils'

const { required, string } = ValidationHelpers

/**
 * Renders a plugin parameter which is
 * - dynamic
 * - in edit/create/copy mode
 * - of types
 * 'java.lang.Byte'
 * 'java.lang.Integer'
 * 'java.lang.Long'
 * 'java.lang.Float'
 * 'java.lang.Double'
 * 'java.lang.Short'
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterNumberDynamicField extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  format = val => parseFloat(val)

  render() {
    const { fieldKey, pluginParameter: { name }, pluginParameterType } = this.props
    const validators = [string] // Yes a String, because we store the number in string in the model.
    let label = name
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(required)
      label += '*'
    }

    return (
      <Field
        name={fieldKey}
        format={this.format}
        fullWidth
        component={RenderTextField}
        type={'number'}
        label={label}
        validate={validators}
      />
    )
  }
}

export default PluginParameterNumberDynamicField
