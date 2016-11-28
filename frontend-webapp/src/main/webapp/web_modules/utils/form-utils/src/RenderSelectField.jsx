import SelectField from 'material-ui/SelectField'

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
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
  children: React.PropTypes.element,
}
export default renderSelectField
