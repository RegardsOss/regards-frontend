/**
 * LICENSE_PLACEHOLDER
 **/
import Toggle from 'material-ui/Toggle'

class renderToggle extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    defaultToggled: PropTypes.bool,
    // fullWidth: PropTypes.bool,
    type: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
  }

  onChange = () => {
    const { input } = this.props
    // switch the value
    input.onChange(!input.value)
  }

  render() {
    // eslint-disable-next-line
    const { input, label, type, meta, intl, ...rest } = this.props
    return (
      <Toggle
        type={type}
        label={label}
        onToggle={this.onChange}
        {...rest}
      />
    )
  }
}

export default renderToggle
