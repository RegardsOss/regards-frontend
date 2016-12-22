import Checkbox from 'material-ui/Checkbox'

const RenderCheckbox = ({ input, label }) => {
  const checked = input.value === true
  return (
    <Checkbox
      label={label}
      checked={checked}
      onCheck={input.onChange}
    />
  )
}
RenderCheckbox.propTypes = {
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  input: React.PropTypes.shape({
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }),
}
export default RenderCheckbox
