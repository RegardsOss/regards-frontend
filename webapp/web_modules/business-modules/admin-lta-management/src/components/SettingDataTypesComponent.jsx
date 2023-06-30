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
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  RenderTextField, Field, RenderSelectField, ValidationHelpers,
} from '@regardsoss/form-utils'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { DATA_TYPES_SETTINGS } from '../domain/settings'
import messages from '../i18n'
import styles from '../styles'

/**
 * @author Théo Lasserre
 */
export class SettingDataTypesComponent extends React.Component {
  static propTypes = {
    formNamespace: PropTypes.string.isRequired,
    modelList: DataManagementShapes.ModelList,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { formNamespace, modelList } = this.props
    const { intl: { formatMessage }, moduleTheme: { settingDatatypesStyle } } = this.context
    return (
      <div style={settingDatatypesStyle}>
        <Field
          key={`${formNamespace}.${DATA_TYPES_SETTINGS.MODEL}`}
          name={`${formNamespace}.${DATA_TYPES_SETTINGS.MODEL}`}
          label={formatMessage({ id: 'lta.settings.field.datatypes.model' })}
          component={RenderSelectField}
          validate={ValidationHelpers.required}
          fullWidth
        >
          {map(modelList, (model) => (
            <MenuItem
              key={model.content.id}
              value={model.content.name}
              primaryText={model.content.name}
            />
          ))}
        </Field>
        <Field
          key={`${formNamespace}.${DATA_TYPES_SETTINGS.STORE_PATH}`}
          name={`${formNamespace}.${DATA_TYPES_SETTINGS.STORE_PATH}`}
          label={formatMessage({ id: 'lta.settings.field.datatypes.storePath' })}
          component={RenderTextField}
          validate={ValidationHelpers.required}
          fullWidth
        />
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages, true)(SettingDataTypesComponent))
