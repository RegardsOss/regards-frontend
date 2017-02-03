/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { Field } from '@regardsoss/form-utils'
import { Toggle } from 'redux-form-material-ui'
import moduleStyles from '../../../styles/styles'

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.Boolean
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterBoolean extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    mode: React.PropTypes.oneOf(['view', 'edit']),
  }

  static defaultProps = {
    mode: 'view',
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'view',
    }
  }

  render() {
    const { name, value, mode } = this.props
    const styles = moduleStyles()

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value.toString()}</ListItem>
      case 'edit':
        return (
          <Field
            name={name}
            component={Toggle}
            type={'boolean'}
            style={styles.pluginConfiguration.form.toggle}
            label={name}
          />
        )
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}

export default PluginParameterBoolean
