/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { PluginParameter } from '@regardsoss/model'

const { validRequiredString } = ValidationHelpers

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

  static propTypes = {
    fieldKey: React.PropTypes.string,
    pluginParameter: PluginParameter,
    mode: React.PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
  }

  static defaultProps = {
    mode: 'view',
  }

  render() {
    const { fieldKey, pluginParameter: { name, value }, mode } = this.props

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value}</ListItem>
      case 'edit':
      case 'create':
      case 'copy':
        return (
          <Field
            name={fieldKey}
            format={val => parseFloat(val)}
            fullWidth
            component={RenderTextField}
            type={'number'}
            label={name}
            validate={validRequiredString} // Yes a String, because we store the number in string in the model.
          />
        )
      default:
        return <ListItem>{name}: {value}</ListItem>
    }
  }
}

export default PluginParameterNumber
