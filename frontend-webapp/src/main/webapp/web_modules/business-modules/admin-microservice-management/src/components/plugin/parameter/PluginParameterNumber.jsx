/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { pluginParameterComponentPropTypes } from './utils'

const { required, string } = ValidationHelpers

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * 'java.lang.Byte'
 * 'java.lang.Integer'
 * 'java.lang.Long'
 * 'java.lang.Float'
 * 'java.lang.Double'
 * 'java.lang.Short'
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterNumber extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static defaultProps = {
    mode: 'view',
  }

  format = val => parseFloat(val)

  render() {
    const { fieldKey, pluginParameter: { name, value }, pluginParameterType, mode } = this.props
    const validators = [string] // Yes a String, because we store the number in string in the model.
    let label = name
    if (pluginParameterType && !pluginParameterType.optional) {
      validators.push(required)
      label += '*'
    }

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value}</ListItem>
      case 'edit':
      case 'create':
      case 'copy':
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
      default:
        return <ListItem>{name}: {value}</ListItem>
    }
  }
}

export default PluginParameterNumber
