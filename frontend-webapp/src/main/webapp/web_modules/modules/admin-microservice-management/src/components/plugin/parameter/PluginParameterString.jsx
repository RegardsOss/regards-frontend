/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { PluginParameter, PluginParameterType } from '@regardsoss/model'

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterString extends React.Component {

  static propTypes = {
    fieldKey: React.PropTypes.string,
    pluginParameter: PluginParameter,
    mode: React.PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
    change: React.PropTypes.func, // Callback provided by redux-form in order to manually change a field value
  }

  static defaultProps = {
    mode: 'view',
  }

  render() {
    const { fieldKey, pluginParameter: { name, value }, mode, change } = this.props

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
          />
        )
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}

export default PluginParameterString
