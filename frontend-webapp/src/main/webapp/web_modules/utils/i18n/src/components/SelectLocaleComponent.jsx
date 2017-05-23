import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { FormattedHTMLMessage } from 'react-intl'
import '../FR.png'
import '../GB.png'

/**
 * React component to display the language selector widget
 * @author Sébastien Binda
 */
class SelectLocaleComponent extends React.Component {
  static propTypes = {
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentLocale: PropTypes.string,
    handleLocaleChange: PropTypes.func,
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
