/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { pluginParameterComponentPropTypes } from './utils'

const { required, string } = ValidationHelpers

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterString extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static defaultProps = {
    mode: 'view',
  }

  render() {
    const { fieldKey, pluginParameter: { name, value }, pluginParameterType: { optional, defaultValue }, mode } = this.props
    const validators = [string]
    if (!optional) {
      validators.push(required)
    }
    const label = name + (optional ? '*' : '')

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value.toString()}</ListItem>
      case 'edit':
      case 'create':
      case 'copy':
        return (
          <Field
            name={fieldKey}
            fullWidth
            component={RenderTextField}
            type={'text'}
            label={label}
            validate={validators}
          />
        )
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}

export default PluginParameterString
