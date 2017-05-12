/**
 * LICENSE_PLACEHOLDER
 **/
import Toggle from 'material-ui/Toggle'

class renderToggle extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    // fullWidth: PropTypes.bool,
    type: PropTypes.string,
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
