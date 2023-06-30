/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonShapes } from '@regardsoss/shape'
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { ClearSettingFieldButton } from '@regardsoss/components'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import styles from './styles'

const { getSetting, isDisabled, isDefaultValue } = CommonDomain.SettingsUtils

/**
 * @author Théo Lasserre
 */
class SettingsTextField extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    settingKey: PropTypes.string.isRequired,
    settings: CommonShapes.SettingsList.isRequired,
    editedSetting: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    change: PropTypes.func.isRequired,
    addAlternateStyle: PropTypes.bool,
  }

  static defaultProps = {
    addAlternateStyle: false,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Reset field to default value
   * @param {string} settingKey
   */
  onClearInput = (settingKey) => {
    const { settings, change } = this.props
    const settingFound = getSetting(settings, settingKey)
    if (settingFound) {
      change(settingKey, settingFound.content.defaultValue)
    }
  }

  render() {
    const {
      settingKey, editedSetting, settings, label, addAlternateStyle,
    } = this.props
    const { moduleTheme: { settingDiv } } = this.context
    return (
      <div style={settingDiv}>
        <ClearSettingFieldButton
          onClick={() => this.onClearInput(settingKey)}
          isDefaultValue={isDefaultValue(settings, settingKey, editedSetting)}
          addAlternateStyle={addAlternateStyle}
        />
        <Field
          name={settingKey}
          label={label}
          component={RenderTextField}
          fullWidth
          disabled={isDisabled(settings, settingKey)}
        />
      </div>
    )
  }
}
export default withModuleStyle(styles, true)(SettingsTextField)
