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
import { FieldsGroup } from '@regardsoss/form-utils'
import styles from './styles'

const { getSetting, isDefaultValue } = CommonDomain.SettingsUtils

/**
 * @author Théo Lasserre
 */
class SettingsFieldsGroup extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    settingKey: PropTypes.string.isRequired,
    settings: CommonShapes.SettingsList.isRequired,
    editedSetting: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    change: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
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
      settingKey, editedSetting, settings, label, children,
    } = this.props
    const { moduleTheme: { settingDivAlt, settingsGroup } } = this.context
    return (
      <div style={settingDivAlt}>
        <ClearSettingFieldButton
          onClick={() => this.onClearInput(settingKey)}
          isDefaultValue={isDefaultValue(settings, settingKey, editedSetting)}
        />
        <FieldsGroup
          title={label}
          clearSpaceToChildren
          spanFullWidth
        >
          <div div={settingsGroup}>
            {children}
          </div>
        </FieldsGroup>
      </div>
    )
  }
}
export default withModuleStyle(styles, true)(SettingsFieldsGroup)
