/**
 * LICENSE_PLACEHOLDER
 **/
import { RadioButtonGroup } from 'material-ui/RadioButton'
import { themeContextType } from '@regardsoss/theme'

const RenderRadio = ({ input, onSelect, defaultSelected, children, meta: { touched, error }, intl }, { muiTheme }) => (
  <div>
    <RadioButtonGroup
      {...input}
      defaultSelected={defaultSelected}
      onChange={(event, value) => {
        if (onSelect) {
          onSelect(event, value, input)
        }
        return input.onChange(value)
      }}
    >
      {children}
    </RadioButtonGroup>
    {touched && error && (<span style={{ color: muiTheme.palette.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
  </div>
  )
RenderRadio.contextTypes = {
  ...themeContextType,
}
RenderRadio.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  defaultSelected: PropTypes.string,
  onSelect: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element),
}
export default RenderRadio
