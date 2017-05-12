/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { PluginParameter } from '@regardsoss/model'

const { validRequiredString } = ValidationHelpers

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterString extends React.Component {

  static propTypes = {
    fieldKey: PropTypes.string,
    pluginParameter: PluginParameter,
    mode: PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
  }

  static defaultProps = {
    mode: 'view',
  }

  render() {
    const { fieldKey, pluginParameter: { name, value }, mode } = this.props

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
            label={name}
            validate={validRequiredString}
          />
        )
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}

export default PluginParameterString
