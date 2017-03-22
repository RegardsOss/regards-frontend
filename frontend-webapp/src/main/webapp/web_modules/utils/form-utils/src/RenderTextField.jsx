/**
 * LICENSE_PLACEHOLDER
 **/
import TextField from 'material-ui/TextField'

class renderTextField extends React.Component {
  static propTypes = {
    input: React.PropTypes.shape({
      value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
      name: React.PropTypes.string,
    }),
    label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    meta: React.PropTypes.shape({
      touched: React.PropTypes.bool,
      error: React.PropTypes.string,
    }),
    // fullWidth: React.PropTypes.bool,
    type: React.PropTypes.string,
    intl: React.PropTypes.shape({
      formatMessage: React.PropTypes.func,
    }),
  }
  render() {
    const { input, label, type, meta: { touched, error }, intl, ...rest } = this.props
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error && intl.formatMessage({ id: error })}
        {...input}
        type={type}
        {...rest}
      />
    )
  }
}

export default renderTextField
