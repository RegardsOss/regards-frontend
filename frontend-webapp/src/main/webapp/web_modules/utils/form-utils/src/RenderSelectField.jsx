import SelectField from 'material-ui/SelectField'

const renderSelectField = ({ input, label, meta: { touched, error }, fullWidth, children, disabled, onSelect }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    fullWidth={fullWidth}
    onChange={(event, index, value) => {
      if (onSelect) {
        return onSelect(event, index, value, input)
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
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    name: React.PropTypes.string,
  }),
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.string,
  }),
  children: React.PropTypes.arrayOf(React.PropTypes.element),
  fullWidth: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
}
export default renderSelectField
