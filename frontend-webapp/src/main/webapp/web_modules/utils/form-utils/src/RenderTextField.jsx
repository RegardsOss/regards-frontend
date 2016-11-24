import TextField from 'material-ui/TextField'
class renderTextField extends React.Component {
  render() {
    const { input, label, fullWidth, type, meta: { touched, error }, intl } = this.props
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error && intl.formatMessage({ id: error })}
        {...input}
        fullWidth={fullWidth}
        type={type}
      />
    )
  }
}
export default renderTextField
