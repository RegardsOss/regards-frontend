import { map } from 'lodash'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { FormattedMessage } from 'react-intl'


/**
 * React component to display the language selector widget
 */
class SelectLocaleComponent extends React.Component {
  static propTypes = {
    locales: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    currentLocale: React.PropTypes.string,
    handleLocaleChange: React.PropTypes.func,
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  render() {
    const { muiTheme } = this.context
    const { locales, currentLocale, handleLocaleChange } = this.props
    const items = map(locales, locale => (
      <MenuItem
        value={locale}
        key={locale}
        label={<FormattedMessage id="label" />}
        primaryText={<FormattedMessage id={locale} />}
      />
  ))
    return (
      <DropDownMenu
        value={currentLocale}
        onChange={handleLocaleChange}
        labelStyle={muiTheme.header.localeDropdown}
      >
        {items}
      </DropDownMenu>
    )
  }
}
export default SelectLocaleComponent
