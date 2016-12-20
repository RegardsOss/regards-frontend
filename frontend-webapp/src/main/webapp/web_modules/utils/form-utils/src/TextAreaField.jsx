/**
 * LICENSE_PLACEHOLDER
 **/
import TextField from 'material-ui/TextField'

/**
 * Redux-form component to display a text-area
 */
class TextareaInput extends React.Component {

  static propTypes = {
    input: React.PropTypes.shape({
      value: React.PropTypes.string,
      name: React.PropTypes.string,
    }),
    meta: React.PropTypes.shape({
      touched: React.PropTypes.bool,
      error: React.PropTypes.string,
    }),
    intl: React.PropTypes.shape({
      formatMessage: React.PropTypes.func,
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
