/**
 * LICENSE_PLACEHOLDER
 **/
import isString from 'lodash/isString'
import TextField from 'material-ui/TextField'
import RenderHelper from './RenderHelper'

class renderTextField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
    // Define label when you want a default value for hintText AND floatingLabelText
    // But label will be overridden if you specify hintText or floatingLabelText
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
    // Define one of the following when you want to override the label behaviour
    hintText: PropTypes.string,
    floatingLabelText: PropTypes.string,
  }

  render() {
    const { input, label, hintText, floatingLabelText, type, meta: { touched, error }, intl, ...rest } = this.props
    const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)

    return (
      <TextField
        hintText={hintText || label}
        floatingLabelText={floatingLabelText || label}
        errorText={errorMessage}
        {...input}
        type={type}
        {...rest}
      />
    )
  }
}

export default renderTextField
