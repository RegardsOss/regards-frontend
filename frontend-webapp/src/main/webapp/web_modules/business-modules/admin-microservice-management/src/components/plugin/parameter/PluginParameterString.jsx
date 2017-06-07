/**
 * LICENSE_PLACEHOLDER
 **/
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { pluginParameterComponentPropTypes } from './utils'

const { required, string } = ValidationHelpers

/**
 * Renders plugin parameter which is
 * - static
 * - in edit/crete/copy mode
 * - of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterString extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  render() {
    const { fieldKey, pluginParameter: { name }, pluginParameterType } = this.props
    const validators = [string]
    let label = name
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(required)
      label += '*'
    }

    return (
      <Field
        name={`${fieldKey}.value`}
        fullWidth
        component={RenderTextField}
        type={'text'}
        label={label}
        validate={validators}
      />
    )
  }
}

export default PluginParameterString
