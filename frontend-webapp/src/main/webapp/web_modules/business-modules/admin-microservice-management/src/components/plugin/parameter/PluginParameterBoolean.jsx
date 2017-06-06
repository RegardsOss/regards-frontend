/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { Field, RenderToggle } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { pluginParameterComponentPropTypes } from './utils'
import moduleStyles from '../../../styles/styles'

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.Boolean
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterBoolean extends React.Component {

  static propTypes = pluginParameterComponentPropTypes

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    mode: 'view',
  }

  format = val => val === 'true'

  parse = val => val.toString()

  render() {
    const { fieldKey, pluginParameter: { name, value }, pluginParameterType, mode } = this.props
    const styles = moduleStyles(this.context.muiTheme)

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value}</ListItem>
      case 'edit':
      case 'create':
      case 'copy':
        return (
          <Field
            name={fieldKey}
            format={this.format} // Parse value to boolean
            parse={this.parse}
            component={RenderToggle}
            type={'boolean'}
            style={styles.pluginConfiguration.form.toggle}
            label={name}
            defaultToggled={pluginParameterType && pluginParameterType.defaultValue}
          />
        )
      default:
        return <ListItem>{name}: {value}</ListItem>
    }
  }
}

export default PluginParameterBoolean
