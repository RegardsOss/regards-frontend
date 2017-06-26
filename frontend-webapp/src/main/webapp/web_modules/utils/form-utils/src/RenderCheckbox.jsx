/**
 * LICENSE_PLACEHOLDER
 **/
import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'

export default class RenderCheckbox extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    className: PropTypes.string,
    meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    alwaysShowError: PropTypes.bool, // bypass touched to show some automatic errors
  }

  onChange = () => {
    const { input } = this.props
    // switch the value
    input.onChange(!input.value)
  }

  render() {
    const { alwaysShowError, input, className, label, meta: { touched, error }, intl } = this.props
    const { muiTheme } = this.context
    const checked = !!input.value
    return (
      <div>
        <Checkbox
          className={className}
          label={label}
          checked={checked}
          onCheck={this.onChange}
        />
        {(alwaysShowError || touched) && error && (<span style={{ color: muiTheme.textField.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
      </div>
    )
  }
}

