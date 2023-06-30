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
import {
  Field, RenderMapField, FieldsGroup,
} from '@regardsoss/form-utils'
import styles from './styles'

const { getSetting, isDefaultValue } = CommonDomain.SettingsUtils

/**
 * @author Théo Lasserre
 */
export class SettingsMapField extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    settingKey: PropTypes.string.isRequired,
    settings: CommonShapes.SettingsList.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    editedSetting: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    fieldProps: PropTypes.object,
    change: PropTypes.func.isRequired,
    addAlternateStyle: PropTypes.bool,
    allowDuplicate: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    fieldComponent: PropTypes.any.isRequired,
  }

  static defaultProps = {
    addAlternateStyle: false,
    allowDuplicate: false,
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
    const { moduleTheme: { settingArrayDiv } } = this.context
    const {
      settingKey, settings, addAlternateStyle, editedSetting, allowDuplicate, fieldProps,
      fieldComponent, label,
    } = this.props
    return (
      <div style={settingArrayDiv}>
        <ClearSettingFieldButton
          onClick={() => this.onClearInput(settingKey)}
          isDefaultValue={isDefaultValue(settings, settingKey, editedSetting)}
          addAlternateStyle={addAlternateStyle}
        />
        <FieldsGroup
          title={label}
          spanFullWidth
        >
          <Field
            key={settingKey}
            name={settingKey}
            component={RenderMapField}
            allowDuplicate={allowDuplicate}
            listHeight="250px"
            mapValueFieldComponent={fieldComponent}
            mapValueFieldProps={fieldProps}
          />
        </FieldsGroup>
      </div>
    )
  }
}
export default withModuleStyle(styles, true)(SettingsMapField)
