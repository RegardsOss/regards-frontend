/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * @author Xavier-Alexaandre Brochard
 */
const ShowHideAdvancedOptions = ({ advanced = false, onClick = () => {} }, { muiTheme, intl: { formatMessage } }) => {
  const iconToggleAdvanced = advanced
    ? <KeyboardArrowUp color={muiTheme.palette.primary1Color} />
    : <KeyboardArrowDown color={muiTheme.palette.primary1Color} />
  const messageAdvanced = advanced
    ? formatMessage({ id: 'container.form.advanced.mode.hide' })
    : formatMessage({ id: 'container.form.advanced.mode.show' })

  return (
    <span
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        fontSize: 'small',
        color: muiTheme.palette.primary1Color,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {iconToggleAdvanced}
      {messageAdvanced}
    </span>

  )
}

ShowHideAdvancedOptions.propTypes = {
  advanced: PropTypes.bool,
  onClick: PropTypes.func,
}

ShowHideAdvancedOptions.contextTypes = {
  ...i18nContextType,
  ...themeContextType,
}


export default ShowHideAdvancedOptions
