/**
 * LICENSE_PLACEHOLDER
 **/
import TextField from 'material-ui/TextField'

class renderTextField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    // fullWidth: PropTypes.bool,
    type: PropTypes.string,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
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
