/**
 * LICENSE_PLACEHOLDER
 **/
import Toggle from 'material-ui/Toggle'

class renderToggle extends React.Component {
  static propTypes = {
    input: React.PropTypes.shape({
      value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
      name: React.PropTypes.string,
    }),
    label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    // fullWidth: React.PropTypes.bool,
    type: React.PropTypes.string,
  }
  render() {
    const { input, label, type, ...rest } = this.props
    return (
      <Toggle
        {...input}
        type={type}
        label={label}
        {...rest}
      />
    )
  }
}

export default renderToggle
