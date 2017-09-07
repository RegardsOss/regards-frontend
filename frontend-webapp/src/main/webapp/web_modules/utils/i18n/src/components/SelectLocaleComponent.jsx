/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
**/
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import { FormattedHTMLMessage } from 'react-intl'
import i18nContextType from '../contextType'
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
    tooltip: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { locales, currentLocale, tooltip, handleLocaleChange } = this.props
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
        title={tooltip}
      >
        {items}
      </DropDownMenu>
    )
  }
}
export default SelectLocaleComponent
