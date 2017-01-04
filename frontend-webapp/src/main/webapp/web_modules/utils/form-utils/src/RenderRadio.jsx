import { RadioButtonGroup } from 'material-ui/RadioButton'
import { themeContextType } from '@regardsoss/theme'

const RenderRadio = ({ input, onChange, defaultSelected, children, meta: { error }, intl }, { muiTheme }) => (
  <div>
    <RadioButtonGroup
      {...input}
      defaultSelected={defaultSelected}
      onChange={(event, value) => {
        if (onChange) {
          onChange(event, value)
        }
        return input.onChange(value)
      }}
    >
      {children}
    </RadioButtonGroup>
    {error && (<span style={{ color: muiTheme.palette.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
  </div>
  )
RenderRadio.contextTypes = {
  ...themeContextType,
}
RenderRadio.propTypes = {
  input: React.PropTypes.shape({
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }),
  meta: React.PropTypes.shape({
    error: React.PropTypes.string,
  }),
  intl: React.PropTypes.shape({
    formatMessage: React.PropTypes.func,
  }),
  defaultSelected: React.PropTypes.string,
  onChange: React.PropTypes.func,
  children: React.PropTypes.arrayOf(React.PropTypes.element),
}
export default RenderRadio
