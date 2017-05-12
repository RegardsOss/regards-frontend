/**
 * LICENSE_PLACEHOLDER
 **/
import TextField from 'material-ui/TextField'

/**
 * Redux-form component to display a text-area
 */
class TextareaInput extends React.Component {

  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
  }

  render() {
    const { input, meta: { touched, error }, intl } = this.props
    return (
      <TextField
        multiLine
        fullWidth
        errorText={touched && error && intl.formatMessage({ id: error })}
        {...input}
      />
    )
  }
}

export default TextareaInput
