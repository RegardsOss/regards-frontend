/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'mdi-material-ui/BackupRestore'
import compose from 'lodash/fp/compose'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from './i18n'
import styles from './styles'

/**
* Common button to clear a setting field
* @author Théo Lasserre
*/
export class ClearSettingFieldButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isDefaultValue: PropTypes.bool.isRequired,
    addAlternateStyle: PropTypes.bool, // add a top margin in order to align icon to field
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { onClick, isDefaultValue, addAlternateStyle } = this.props
    const { intl: { formatMessage }, moduleTheme: { clearSettingFieldButtonStyle: { defaultValueStyle, valueStyle, alternateStyle } } } = this.context
    let style = isDefaultValue ? defaultValueStyle : valueStyle
    if (addAlternateStyle) {
      style = {
        ...style,
        ...alternateStyle,
      }
    }
    return (
      <div style={style}>
        <IconButton
          title={formatMessage({ id: 'reset.default.value.button.tooltip' })}
          onClick={onClick}
        >
          <SettingsIcon color="gray" />
        </IconButton>
      </div>
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(ClearSettingFieldButton)
