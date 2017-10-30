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
 *
 */
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import fr from '../fr_flag.png'
import en from '../gb_flag.png'

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

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Maps locale to icon */
  static localToIcon = {
    fr,
    en,
  }

  render() {
    const { locales, currentLocale, handleLocaleChange } = this.props
    const { intl: { formatMessage }, muiTheme: { spacing: { iconSize } } } = this.context

    const localeIcon = SelectLocaleComponent.localToIcon[currentLocale]
    const iconStyle = { width: iconSize, height: iconSize }

    return (
      <div title={formatMessage({ id: 'language.selector.tooltip' })} >
        <IconMenu
          iconButtonElement={
            <IconButton iconStyle={iconStyle} >
              <img src={localeIcon} alt={formatMessage({ id: `language.selector.option.${currentLocale}` })} />
            </IconButton>}

          value={currentLocale}
          onChange={handleLocaleChange}
        >
          {map(locales, locale => (
            <MenuItem
              value={locale}
              key={locale}
              primaryText={formatMessage({ id: `language.selector.option.${locale}` })}
              leftIcon={
                <img
                  style={iconStyle}
                  src={SelectLocaleComponent.localToIcon[locale]}
                  alt={formatMessage({ id: `language.selector.option.${locale}` })}
                />}
            />))}
        </IconMenu>
      </div>
    )
  }
}
export default SelectLocaleComponent
