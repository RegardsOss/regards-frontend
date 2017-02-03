/**
 * LICENSE_PLACEHOLDER
 **/
import { ListItem } from 'material-ui/List'
import { RenderTextField, Field } from '@regardsoss/form-utils'

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
            type={'number'}
            label={name}
          />
        )
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}

export default PluginParameterNumber
