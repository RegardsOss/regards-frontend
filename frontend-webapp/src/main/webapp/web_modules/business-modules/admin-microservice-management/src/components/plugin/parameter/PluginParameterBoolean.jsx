/**
 * LICENSE_PLACEHOLDER
 **/
import { Toggle } from 'redux-form-material-ui'
import { ListItem } from 'material-ui/List'
import { Field } from '@regardsoss/form-utils'
import { PluginParameter } from '@regardsoss/model'
import moduleStyles from '../../../styles/styles'

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.Boolean
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterBoolean extends React.Component {

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
    const styles = moduleStyles()

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value}</ListItem>
      case 'edit':
      case 'create':
      case 'copy':
        return (
          <Field
            name={fieldKey}
            format={val => val === 'true'} // Parse value to boolean
            parse={val => val.toString()}
            component={Toggle}
            type={'boolean'}
            style={styles.pluginConfiguration.form.toggle}
            label={name}
          />
        )
      default:
        return <ListItem>{name}: {value}</ListItem>
    }
  }
}

export default PluginParameterBoolean
