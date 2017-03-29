import { map } from 'lodash'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import '../FR.png'
import '../GB.png'

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
        label={<FormattedHTMLMessage id="label" />}
        primaryText={<FormattedHTMLMessage id={locale} />}
      />))
    return (
      <DropDownMenu
        value={currentLocale}
        onChange={handleLocaleChange}
      >
        {items}
      </DropDownMenu>
    )
  }
}
export default SelectLocaleComponent
