/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field } from '@regardsoss/form-utils'

/**
 * Renders a field in view or edit mode based on a pluginParameter and it's type.
 * For example, a parameter of type java.lang.String will be rendered as a {@link TextField},
 * and a paramater of type java.lang.Boolean will be rendered as a {@link Toggle}.
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
