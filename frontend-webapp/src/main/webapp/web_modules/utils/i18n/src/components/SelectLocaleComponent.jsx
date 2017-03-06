import { map } from 'lodash'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { FormattedMessage } from 'react-intl'

/**
 * React component to display the language selector widget
 * @author Sébastien Binda
 */
class SelectLocaleComponent extends React.Component {
  static propTypes = {
    locales: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    currentLocale: React.PropTypes.string,
    handleLocaleChange: React.PropTypes.func,
  }

  render() {
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
        // labelStyle={muiTheme.menu.localeDropdown} //TODO
      >
        {items}
      </DropDownMenu>
    )
  }
}
export default SelectLocaleComponent
