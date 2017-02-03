/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field } from '@regardsoss/form-utils'

/**
 * Renders a form field in view or edit mode for a plugin parameter of types
 * java.lang.String
 * java.lang.Character
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterString extends React.Component {

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

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {value.toString()}</ListItem>
      case 'edit':
        return (
          <Field
            name={name}
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
