import SelectField from 'material-ui/SelectField'

const renderSelectField = ({ input, label, meta: { touched, error }, fullWidth, children, disabled, onChange }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    fullWidth={fullWidth}
    onChange={(event, index, value) => {
      if (onChange) {
        return onChange(event, index, value, input)
      }
      return input.onChange(value)
    }}
    disabled={disabled}
  >
    {children}
  </SelectField>
)
renderSelectField.propTypes = {
  input: React.PropTypes.shape({
    value: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.string,
  }),
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  fullWidth: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
}
export default renderSelectField
